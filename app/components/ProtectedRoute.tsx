"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const isAuthRoute = pathname === '/login' || pathname === '/register';

    if (!isAuthenticated && !isAuthRoute) {
      router.push('/login');
    } else if (isAuthenticated && isAuthRoute) {
      router.push('/');
    }
  }, [isAuthenticated, pathname, router, mounted]);

  if (!mounted) return null;

  const isAuthRoute = pathname === '/login' || pathname === '/register';
  if (!isAuthenticated && !isAuthRoute) return null;
  if (isAuthenticated && isAuthRoute) return null;

  return <>{children}</>;
}
