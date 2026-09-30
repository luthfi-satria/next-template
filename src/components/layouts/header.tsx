'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useDashboardStore } from '@/stores/dashboard-store';
import styles from './header.module.scss';

export function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { toggleSidebar } = useDashboardStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Header should only be used in authenticated context (DashboardLayout)
  // If not authenticated, return null or redirect should happen via middleware
  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <button
          type="button"
          className={styles.menuToggle}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <Link href="/dashboard" className={styles.logo}>
          NextTemplate
        </Link>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userEmail}>{user.email}</span>
        </div>
        <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
