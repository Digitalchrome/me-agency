import 'server-only';

import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';

import { exportBookingsCsv as buildBookingsCsv } from '@/lib/csv/bookings-export';
import { exportJoinCsv as buildJoinCsv } from '@/lib/csv/join-export';

export const SUBMISSION_SCHEMA_VERSION = 1 as const;

export const JOIN_STATUSES = ['new', 'shortlisted', 'rejected', 'contacted', 'signed'] as const;
export const BOOKING_STATUSES = [
  'new',
  'reviewing',
  'quoted',
  'confirmed',
  'completed',
  'cancelled',
  'archived',
] as const;

export type JoinStatus = (typeof JOIN_STATUSES)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];
export type SubmissionSource = 'web' | 'seed';

// On Vercel, process.cwd() is read-only. Use /tmp for writable storage.
// Note: /tmp is ephemeral (cleared between cold starts) — migrate to a database for permanent storage.
const STORAGE_DIR = process.env.VERCEL
  ? '/tmp/me-submissions'
  : path.join(process.cwd(), 'data', 'submissions');
const EXPORT_DIR = process.env.VERCEL
  ? '/tmp/me-exports'
  : path.join(process.cwd(), 'data', 'exports');

const optionalTrimmed = z
  .string()
  .transform((value) => value.trim())
  .optional()
  .or(z.literal(''));

const optionalStringArray = z.array(z.string().trim().min(1)).optional();

const honeypotField = z
  .string()
  .trim()
  .max(0, 'Spam detected')
  .optional()
  .or(z.literal(''));

export const joinApplicationSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name is required'),
  email: z.string().trim().email('Valid email is required'),
  location: z.string().trim().min(2, 'Location is required'),
  instagram: optionalTrimmed,
  about: z.string().trim().min(20, 'Please tell us a bit more about yourself'),
  website: honeypotField,
});

export const bookingRequestSchema = z.object({
  clientName: z.string().trim().min(2, 'Client / Agency name is required'),
  email: z.string().trim().email('Valid email is required'),
  projectType: z.enum(['Editorial', 'Commercial', 'Catwalk', 'Event', 'Other']),
  projectDate: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((value) => !Number.isNaN(Date.parse(value)), 'Valid project date is required'),
  projectDetails: z.string().trim().min(30, 'Please provide more project details'),
  budgetRange: optionalTrimmed,
  preferredModels: optionalStringArray,
  website: honeypotField,
});

export const joinStatusUpdateSchema = z.object({
  status: z.enum(JOIN_STATUSES),
  notes: optionalTrimmed,
  reviewedBy: optionalTrimmed,
});

export const bookingStatusUpdateSchema = z.object({
  status: z.enum(BOOKING_STATUSES),
  notes: optionalTrimmed,
  reviewedBy: optionalTrimmed,
});

export type JoinApplicationInput = z.infer<typeof joinApplicationSchema>;
export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
export type JoinStatusUpdateInput = z.infer<typeof joinStatusUpdateSchema>;
export type BookingStatusUpdateInput = z.infer<typeof bookingStatusUpdateSchema>;

type BaseRecordMeta = {
  id: string;
  createdAt: string;
  schemaVersion: typeof SUBMISSION_SCHEMA_VERSION;
  source: SubmissionSource;
  notes?: string;
  reviewedAt?: string;
  reviewedBy?: string;
};

export type JoinApplicationRecord = Omit<JoinApplicationInput, 'website'> &
  BaseRecordMeta & {
    kind: 'join';
    status: JoinStatus;
  };

export type BookingRequestRecord = Omit<BookingRequestInput, 'website'> &
  BaseRecordMeta & {
    kind: 'booking';
    status: BookingStatus;
  };

export type ActivityLogRecord = {
  id: string;
  entityType: 'join' | 'booking';
  entityId: string;
  action: 'created' | 'status_updated' | 'seeded';
  timestamp: string;
  actor: string;
  diff?: Record<string, unknown>;
};

type SubmissionKind = 'join' | 'bookings';
type SubmissionRecord = JoinApplicationRecord | BookingRequestRecord;
type SortableByDate = { createdAt: string };

export type ListFilters<TStatus extends string> = {
  status?: TStatus;
  q?: string;
  limit?: number;
  offset?: number;
};

export type ListResult<TRecord, TStatus extends string> = {
  items: TRecord[];
  total: number;
  limit: number;
  offset: number;
  countsByStatus: Record<TStatus, number>;
};

function filePathFor(kind: SubmissionKind) {
  return path.join(STORAGE_DIR, `${kind}.json`);
}

function legacyFilePathForBookings() {
  return path.join(STORAGE_DIR, 'booking.json');
}

function activityLogPath() {
  return path.join(STORAGE_DIR, 'activity-log.json');
}

function nowIso() {
  return new Date().toISOString();
}

function sortNewestFirst<T extends SortableByDate>(records: T[]) {
  return [...records].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

async function atomicWriteJson(targetPath: string, data: unknown) {
  await ensureDir(path.dirname(targetPath));
  const tempPath = `${targetPath}.${Date.now()}.tmp`;
  await writeFile(tempPath, JSON.stringify(data, null, 2), 'utf8');
  await rename(tempPath, targetPath);
}

async function readJsonArray<T>(targetPath: string): Promise<T[]> {
  try {
    const file = await readFile(targetPath, 'utf8');
    const parsed = JSON.parse(file) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error(`Invalid JSON array in ${path.basename(targetPath)}`);
    }
    return parsed as T[];
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

async function readRecords<T extends SubmissionRecord>(kind: SubmissionKind): Promise<T[]> {
  const primaryPath = filePathFor(kind);
  const primary = await readJsonArray<T>(primaryPath).catch(async (error) => {
    // Backward compatibility for earlier booking.json naming
    if (kind === 'bookings') {
      const legacy = await readJsonArray<T>(legacyFilePathForBookings());
      if (legacy.length > 0) {
        await atomicWriteJson(primaryPath, legacy);
        await rm(legacyFilePathForBookings(), { force: true });
        return legacy;
      }
    }
    throw error;
  });

  return sortNewestFirst(primary);
}

async function writeRecords(kind: SubmissionKind, records: SubmissionRecord[]) {
  await atomicWriteJson(filePathFor(kind), sortNewestFirst(records));
}

function sanitizeInstagram(value: string | undefined) {
  const clean = (value ?? '').trim();
  if (!clean) return '';
  return clean.startsWith('@') ? clean : `@${clean}`;
}

function stripEmpty<T extends Record<string, unknown>>(value: T): T {
  const entries = Object.entries(value).filter(([, v]) => v !== undefined && v !== '');
  return Object.fromEntries(entries) as T;
}

function matchesQuery(candidate: string, q: string) {
  return candidate.toLowerCase().includes(q.toLowerCase());
}

function paginate<T>(items: T[], limit = 25, offset = 0): { items: T[]; limit: number; offset: number } {
  const safeLimit = Number.isFinite(limit) ? Math.max(1, Math.min(200, Math.floor(limit))) : 25;
  const safeOffset = Number.isFinite(offset) ? Math.max(0, Math.floor(offset)) : 0;
  return {
    items: items.slice(safeOffset, safeOffset + safeLimit),
    limit: safeLimit,
    offset: safeOffset,
  };
}

function initCounts<TStatus extends string>(statuses: readonly TStatus[]): Record<TStatus, number> {
  return Object.fromEntries(statuses.map((status) => [status, 0])) as Record<TStatus, number>;
}

function countByStatus<TRecord extends { status: TStatus }, TStatus extends string>(
  records: TRecord[],
  statuses: readonly TStatus[]
) {
  const counts = initCounts(statuses);
  for (const record of records) {
    counts[record.status] = (counts[record.status] ?? 0) + 1;
  }
  return counts;
}

async function appendActivity(entry: Omit<ActivityLogRecord, 'id' | 'timestamp'>) {
  const records = await readJsonArray<ActivityLogRecord>(activityLogPath());
  records.unshift({
    id: randomUUID(),
    timestamp: nowIso(),
    ...entry,
  });
  await atomicWriteJson(activityLogPath(), records);
}

function isLikelyDuplicateJoin(input: JoinApplicationInput, records: JoinApplicationRecord[]) {
  const existing = records[0];
  if (!existing) return false;
  if (existing.email.toLowerCase() !== input.email.trim().toLowerCase()) return false;
  const ms = Math.abs(Date.now() - Date.parse(existing.createdAt));
  return ms < 2 * 60 * 1000;
}

function isLikelyDuplicateBooking(input: BookingRequestInput, records: BookingRequestRecord[]) {
  const existing = records[0];
  if (!existing) return false;
  if (existing.email.toLowerCase() !== input.email.trim().toLowerCase()) return false;
  if (existing.projectType !== input.projectType) return false;
  const ms = Math.abs(Date.now() - Date.parse(existing.createdAt));
  return ms < 2 * 60 * 1000;
}

export async function saveJoinApplication(
  input: JoinApplicationInput,
  options?: { source?: SubmissionSource; allowDuplicates?: boolean }
): Promise<JoinApplicationRecord> {
  const source = options?.source ?? 'web';
  const existing = await readRecords<JoinApplicationRecord>('join');
  const duplicate = isLikelyDuplicateJoin(input, existing);
  const cleanInput = joinApplicationSchema.parse(input);

  const record: JoinApplicationRecord = stripEmpty({
    fullName: cleanInput.fullName.trim(),
    email: cleanInput.email.trim().toLowerCase(),
    location: cleanInput.location.trim(),
    instagram: sanitizeInstagram(cleanInput.instagram || ''),
    about: cleanInput.about.trim(),
    id: randomUUID(),
    kind: 'join',
    status: 'new',
    source,
    schemaVersion: SUBMISSION_SCHEMA_VERSION,
    createdAt: nowIso(),
    notes: duplicate && !options?.allowDuplicates ? 'Duplicate candidate (same email within 2 min)' : undefined,
  }) as JoinApplicationRecord;

  existing.unshift(record);
  await writeRecords('join', existing);
  await appendActivity({
    entityType: 'join',
    entityId: record.id,
    action: source === 'seed' ? 'seeded' : 'created',
    actor: source,
  });
  return record;
}

export async function saveBookingRequest(
  input: BookingRequestInput,
  options?: { source?: SubmissionSource; allowDuplicates?: boolean }
): Promise<BookingRequestRecord> {
  const source = options?.source ?? 'web';
  const existing = await readRecords<BookingRequestRecord>('bookings');
  const duplicate = isLikelyDuplicateBooking(input, existing);
  const cleanInput = bookingRequestSchema.parse(input);

  const record: BookingRequestRecord = stripEmpty({
    clientName: cleanInput.clientName.trim(),
    email: cleanInput.email.trim().toLowerCase(),
    projectType: cleanInput.projectType,
    projectDate: cleanInput.projectDate,
    projectDetails: cleanInput.projectDetails.trim(),
    budgetRange: cleanInput.budgetRange?.trim() || '',
    preferredModels: (cleanInput.preferredModels ?? []).map((item) => item.trim()).filter(Boolean),
    id: randomUUID(),
    kind: 'booking',
    status: 'new',
    source,
    schemaVersion: SUBMISSION_SCHEMA_VERSION,
    createdAt: nowIso(),
    notes: duplicate && !options?.allowDuplicates ? 'Duplicate candidate (same email within 2 min)' : undefined,
  }) as BookingRequestRecord;

  existing.unshift(record);
  await writeRecords('bookings', existing);
  await appendActivity({
    entityType: 'booking',
    entityId: record.id,
    action: source === 'seed' ? 'seeded' : 'created',
    actor: source,
  });
  return record;
}

export async function listJoinApplications(
  filters: ListFilters<JoinStatus> = {}
): Promise<ListResult<JoinApplicationRecord, JoinStatus>> {
  const all = await readRecords<JoinApplicationRecord>('join');
  const q = (filters.q ?? '').trim();
  const filtered = all.filter((record) => {
    if (filters.status && record.status !== filters.status) return false;
    if (!q) return true;
    return [record.fullName, record.email, record.location, record.instagram ?? '', record.about]
      .some((value) => matchesQuery(value, q));
  });
  const { items, limit, offset } = paginate(filtered, filters.limit, filters.offset);
  return {
    items,
    total: filtered.length,
    limit,
    offset,
    countsByStatus: countByStatus(all, JOIN_STATUSES),
  };
}

export async function listBookingRequests(
  filters: ListFilters<BookingStatus> = {}
): Promise<ListResult<BookingRequestRecord, BookingStatus>> {
  const all = await readRecords<BookingRequestRecord>('bookings');
  const q = (filters.q ?? '').trim();
  const filtered = all.filter((record) => {
    if (filters.status && record.status !== filters.status) return false;
    if (!q) return true;
    return [
      record.clientName,
      record.email,
      record.projectType,
      record.projectDate,
      record.projectDetails,
      record.budgetRange ?? '',
      ...(record.preferredModels ?? []),
    ].some((value) => matchesQuery(value, q));
  });
  const { items, limit, offset } = paginate(filtered, filters.limit, filters.offset);
  return {
    items,
    total: filtered.length,
    limit,
    offset,
    countsByStatus: countByStatus(all, BOOKING_STATUSES),
  };
}

export async function getJoinApplicationById(id: string) {
  const all = await readRecords<JoinApplicationRecord>('join');
  return all.find((item) => item.id === id) ?? null;
}

export async function getBookingRequestById(id: string) {
  const all = await readRecords<BookingRequestRecord>('bookings');
  return all.find((item) => item.id === id) ?? null;
}

export async function updateJoinApplicationStatus(
  id: string,
  patch: JoinStatusUpdateInput
): Promise<JoinApplicationRecord | null> {
  const data = joinStatusUpdateSchema.parse(patch);
  const records = await readRecords<JoinApplicationRecord>('join');
  const index = records.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = records[index]!;
  const next: JoinApplicationRecord = stripEmpty({
    ...current,
    status: data.status,
    notes: data.notes || current.notes,
    reviewedBy: data.reviewedBy || current.reviewedBy || 'admin',
    reviewedAt: nowIso(),
  }) as JoinApplicationRecord;

  records[index] = next;
  await writeRecords('join', records);
  await appendActivity({
    entityType: 'join',
    entityId: id,
    action: 'status_updated',
    actor: next.reviewedBy || 'admin',
    diff: { from: current.status, to: next.status },
  });
  return next;
}

export async function updateBookingRequestStatus(
  id: string,
  patch: BookingStatusUpdateInput
): Promise<BookingRequestRecord | null> {
  const data = bookingStatusUpdateSchema.parse(patch);
  const records = await readRecords<BookingRequestRecord>('bookings');
  const index = records.findIndex((item) => item.id === id);
  if (index === -1) return null;

  const current = records[index]!;
  const next: BookingRequestRecord = stripEmpty({
    ...current,
    status: data.status,
    notes: data.notes || current.notes,
    reviewedBy: data.reviewedBy || current.reviewedBy || 'admin',
    reviewedAt: nowIso(),
  }) as BookingRequestRecord;

  records[index] = next;
  await writeRecords('bookings', records);
  await appendActivity({
    entityType: 'booking',
    entityId: id,
    action: 'status_updated',
    actor: next.reviewedBy || 'admin',
    diff: { from: current.status, to: next.status },
  });
  return next;
}

type SeedOptions = {
  joinCount?: number;
  bookingCount?: number;
  replace?: boolean;
};

const JOIN_SEED_POOL: Omit<JoinApplicationInput, 'website'>[] = [
  {
    fullName: 'Nora Mensah',
    email: 'nora.mensah@example.test',
    location: 'Lille, France',
    instagram: '@nora.moves',
    about:
      'Athlete turned creative. Comfortable on camera and looking to build an editorial and commercial portfolio across Europe.',
  },
  {
    fullName: 'Hugo Lambert',
    email: 'hugo.lambert@example.test',
    location: 'Brussels, Belgium',
    instagram: '@hlambert.studio',
    about:
      'Streetwear e-commerce experience with a focus on movement and product storytelling. Available to travel for castings.',
  },
  {
    fullName: 'Mina Duarte',
    email: 'mina.duarte@example.test',
    location: 'Porto, Portugal',
    instagram: '@mina.onset',
    about:
      'Dance background, expressive posing, and interested in beauty and accessories campaigns. Passport ready and flexible schedule.',
  },
];

const BOOKING_SEED_POOL: Omit<BookingRequestInput, 'website'>[] = [
  {
    clientName: 'Atelier Nord',
    email: 'production@ateliernord.example.test',
    projectType: 'Editorial',
    projectDate: '2026-03-18',
    projectDetails:
      'SS26 editorial shoot in Paris for a digital campaign. Need 2 to 3 models with strong movement presence. Half-day fitting + one-day shoot.',
    budgetRange: '3k-8k',
    preferredModels: ['amara-diallo', 'eden-park'],
  },
  {
    clientName: 'Studio Canal 8',
    email: 'bookings@studiocanal8.example.test',
    projectType: 'Commercial',
    projectDate: '2026-04-02',
    projectDetails:
      'Lifestyle product campaign for beauty brand. Looking for diverse casting, clean skin, and natural expressions. Usage: EU digital + OOH.',
    budgetRange: '8k-20k',
    preferredModels: ['zara-okonkwo', 'sasha-volkov'],
  },
  {
    clientName: 'Maison Rivage',
    email: 'hello@maisonrivage.example.test',
    projectType: 'Event',
    projectDate: '2026-05-11',
    projectDetails:
      'Luxury retail activation in Milan. Need hosts/models with strong client-facing presence, bilingual preferred, two-day booking.',
    budgetRange: '5k-12k',
    preferredModels: ['luca-bianchi'],
  },
];

function cycleSeed<T>(pool: T[], count: number): T[] {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, i) => pool[i % pool.length]!).map((item) => ({ ...item }));
}

export async function seedFakeSubmissions(options: SeedOptions = {}) {
  const joinCount = Math.max(0, Math.min(100, options.joinCount ?? 2));
  const bookingCount = Math.max(0, Math.min(100, options.bookingCount ?? 2));
  if (options.replace) {
    await atomicWriteJson(filePathFor('join'), []);
    await atomicWriteJson(filePathFor('bookings'), []);
  }

  const joinSeeds = cycleSeed(JOIN_SEED_POOL, joinCount);
  const bookingSeeds = cycleSeed(BOOKING_SEED_POOL, bookingCount);

  for (let i = 0; i < joinSeeds.length; i += 1) {
    const item = joinSeeds[i]!;
    await saveJoinApplication(
      {
        ...item,
        email: item.email.replace('@', `+${Date.now()}-${i}@`),
        website: '',
      },
      { source: 'seed', allowDuplicates: true }
    );
  }

  for (let i = 0; i < bookingSeeds.length; i += 1) {
    const item = bookingSeeds[i]!;
    await saveBookingRequest(
      {
        ...item,
        email: item.email.replace('@', `+${Date.now()}-${i}@`),
        website: '',
      },
      { source: 'seed', allowDuplicates: true }
    );
  }

  return { joinRecords: joinSeeds.length, bookingRecords: bookingSeeds.length };
}

export async function exportBookingsCsv(format: 'internal' | 'mega-db' = 'internal') {
  const records = await readRecords<BookingRequestRecord>('bookings');
  const csv = buildBookingsCsv(records, { format });
  await ensureDir(EXPORT_DIR);
  const fileName = format === 'mega-db' ? 'bookings_mega_db_export.csv' : 'bookings_export.csv';
  await writeFile(path.join(EXPORT_DIR, fileName), csv, 'utf8');
  return csv;
}

export async function exportJoinCsv() {
  const records = await readRecords<JoinApplicationRecord>('join');
  const csv = buildJoinCsv(records);
  await ensureDir(EXPORT_DIR);
  await writeFile(path.join(EXPORT_DIR, 'join_export.csv'), csv, 'utf8');
  return csv;
}

export async function getSubmissionStats() {
  const [join, bookings] = await Promise.all([
    readRecords<JoinApplicationRecord>('join'),
    readRecords<BookingRequestRecord>('bookings'),
  ]);

  return {
    join: {
      total: join.length,
      countsByStatus: countByStatus(join, JOIN_STATUSES),
    },
    bookings: {
      total: bookings.length,
      countsByStatus: countByStatus(bookings, BOOKING_STATUSES),
    },
  };
}

