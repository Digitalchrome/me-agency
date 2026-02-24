import type { BookingRequestRecord } from '@/lib/submissions';

type ExportFormat = 'internal' | 'mega-db';

function sanitizeCsvCell(value: unknown): string {
  const raw = String(value ?? '');
  const prefixed = /^[=+\-@]/.test(raw) ? `'${raw}` : raw;
  return `"${prefixed.replace(/"/g, '""')}"`;
}

function asJobStatus(status: BookingRequestRecord['status']) {
  const map: Record<BookingRequestRecord['status'], string> = {
    new: 'Option',
    reviewing: 'En revue',
    quoted: 'Devis envoyé',
    confirmed: 'Confirmé',
    completed: 'Terminé',
    cancelled: 'Annulé',
    archived: 'Archivé',
  };
  return map[status];
}

function buildMegaDbRows(records: BookingRequestRecord[]) {
  const header = [
    'ID_BOOKING',
    'DATE_DEBUT',
    'DATE_FIN',
    'ID_CLIENT',
    'ID_MANNEQUIN',
    'TYPE_JOB',
    'LIEU',
    'CACHET_MANNEQUIN',
    'COMMISSION_AGENCE',
    'DROITS_IMAGE',
    'TOTAL_HT',
    'STATUT_JOB',
    'STATUT_FACTURE',
    'NUMERO_FACTURE',
  ];

  const rows = records.map((record, index) => {
    const seq = String(index + 1).padStart(3, '0');
    const clientSeed = record.clientName.replace(/[^A-Za-z0-9]/g, '').slice(0, 4).toUpperCase() || 'WEB';
    return [
      `BWEB-${seq}`,
      record.projectDate,
      record.projectDate,
      `CWEB-${clientSeed}`,
      (record.preferredModels?.[0] ?? '').toUpperCase(),
      record.projectType,
      record.projectDetails.slice(0, 80),
      0,
      0,
      0,
      0,
      asJobStatus(record.status),
      'Non facturable',
      '',
    ];
  });

  return [header, ...rows];
}

function buildInternalRows(records: BookingRequestRecord[]) {
  const header = [
    'id',
    'createdAt',
    'status',
    'clientName',
    'email',
    'projectType',
    'projectDate',
    'budgetRange',
    'preferredModels',
    'projectDetails',
    'notes',
    'reviewedAt',
    'reviewedBy',
    'source',
    'schemaVersion',
  ];

  const rows = records.map((record) => [
    record.id,
    record.createdAt,
    record.status,
    record.clientName,
    record.email,
    record.projectType,
    record.projectDate,
    record.budgetRange ?? '',
    (record.preferredModels ?? []).join('|'),
    record.projectDetails,
    record.notes ?? '',
    record.reviewedAt ?? '',
    record.reviewedBy ?? '',
    record.source,
    record.schemaVersion,
  ]);

  return [header, ...rows];
}

export function exportBookingsCsv(
  records: BookingRequestRecord[],
  options?: { format?: ExportFormat }
): string {
  const format = options?.format ?? 'internal';
  const rows = format === 'mega-db' ? buildMegaDbRows(records) : buildInternalRows(records);
  return rows.map((row) => row.map(sanitizeCsvCell).join(',')).join('\n');
}

