'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { useDashboardStore } from '@/stores/dashboard-store';
import styles from './sidebar.module.scss';

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  const handleNavClick = () => {
    // Close sidebar on mobile after clicking a link
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  const handleBackdropClick = () => {
    if (sidebarCollapsed === false) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {!sidebarCollapsed && (
        <button
          type="button"
          className={clsx(styles.backdrop, { [styles.hidden]: sidebarCollapsed })}
          onClick={handleBackdropClick}
          aria-label="Close sidebar"
        />
      )}

      {/* Sidebar */}
      <aside className={clsx(styles.sidebar, { [styles.open]: !sidebarCollapsed })}>
        <nav className={styles.nav}>
          {MAIN_NAVIGATION.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={clsx(styles.navItem, { [styles.active]: isActive })}
                title={item.label}
                onClick={handleNavClick}
              >
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge && <span className={styles.badge}>{item.badge}</span>}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <p className={styles.version}>v1.0.0</p>
        </div>
      </aside>
    </>
  );
}
