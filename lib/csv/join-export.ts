import type { JoinApplicationRecord } from '@/lib/submissions';

function sanitizeCsvCell(value: unknown): string {
  const raw = String(value ?? '');
  const prefixed = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${prefixed.replace(/"/g, '""')}"`;
}

export function exportJoinCsv(records: JoinApplicationRecord[]): string {
  const header = [
    'id',
    'createdAt',
    'status',
    'fullName',
    'email',
    'location',
    'instagram',
    'about',
    'notes',
    'reviewedAt',
    'reviewedBy',
    'source',
    'schemaVersion',
  ];

  const lines = [header.join(',')];
  for (const record of records) {
    lines.push(
      [
        record.id,
        record.createdAt,
        record.status,
        record.fullName,
        record.email,
        record.location,
        record.instagram ?? '',
        record.about,
        record.notes ?? '',
        record.reviewedAt ?? '',
        record.reviewedBy ?? '',
        record.source,
        record.schemaVersion,
      ]
        .map(sanitizeCsvCell)
        .join(',')
    );
  }

  return lines.join('\n');
}

