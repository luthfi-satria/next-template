'use client';

import { useDashboardStore } from '@/stores/dashboard-store';
import styles from './navbar.module.scss';

export default function Navbar() {
  const { toggleSidebar } = useDashboardStore();

  return (
    <header className={styles.navbar}>
      {/* Hamburger Toggle Button (Hanya Muncul di Mobile/Tablet) */}
      <button
        type="button"
        className={styles.hamburgerBtn}
        onClick={toggleSidebar}
        aria-label="Toggle Navigation Menu"
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>

      <div className={styles.navTitle}>
        <span>Dashboard App</span>
      </div>
    </header>
  );
}
