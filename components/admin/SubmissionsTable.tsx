import type { ReactNode } from 'react';

export default function SubmissionsTable({
  headers,
  children,
}: {
  headers: string[];
  children: ReactNode;
}) {
  return (
    <div className="overflow-x-auto border-3 border-black dark:border-white">
      <table className="w-full min-w-[980px]">
        <thead className="bg-black text-white dark:bg-white dark:text-black">
          <tr>
            {headers.map((header) => (
              <th key={header} className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-widest">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

