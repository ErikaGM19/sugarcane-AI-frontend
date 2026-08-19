"use client";

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname === '/login' || pathname === '/register';
  const isDiagnosticoRoute = pathname === '/diagnostico';

  if (isAuthRoute) {
    return (
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="h-screen flex overflow-hidden bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Header />
          <main className={`flex-1 overflow-y-auto p-4 md:p-6 lg:p-4 ${isDiagnosticoRoute ? "bg-white" : ""}`}>
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
