'use client';

import Link from 'next/link';
import { useAuthStore } from '@/stores/auth-store';

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <Link href="/">
        <strong>NextTemplate</strong>
      </Link>
      <nav>
        {isAuthenticated && user ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span>
              Halo, <strong>{user.name}</strong>
            </span>
            <button type="button" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
}
