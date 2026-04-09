import type { ReactNode } from 'react';
import { isAdminTokenValid } from '@/lib/server/admin-auth';

export default function AdminGuard({
  token,
  children,
}: {
  token?: string | null;
  children: ReactNode;
}) {
  if (!isAdminTokenValid(token)) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="border-3 border-black dark:border-white p-8 bg-light-grey dark:bg-dark-grey shadow-brutal">
          <h1 className="font-editorial text-4xl font-bold mb-4">Admin Access Required</h1>
          <p className="font-mono text-xs uppercase tracking-widest opacity-70 mb-4">
            Add a valid token via <code>?token=...</code> or set <code>ADMIN_ACCESS_TOKEN</code>.
          </p>
          <p className="font-mono text-xs uppercase tracking-widest opacity-50">
            Default demo token: <code>demo-admin</code>
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

