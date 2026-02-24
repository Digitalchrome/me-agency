export default function StatusBadge({ status }: { status: string }) {
  const color =
    status === 'new'
      ? 'bg-blue-100 text-blue-900 border-blue-900'
      : status === 'confirmed' || status === 'signed' || status === 'completed'
        ? 'bg-green-100 text-green-900 border-green-900'
        : status === 'rejected' || status === 'cancelled'
          ? 'bg-red-100 text-red-900 border-red-900'
          : 'bg-yellow-100 text-yellow-900 border-yellow-900';

  return (
    <span className={`inline-flex items-center px-2 py-1 border-2 text-[10px] font-mono uppercase tracking-widest ${color}`}>
      {status}
    </span>
  );
}

