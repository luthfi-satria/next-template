'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type React from 'react';
import { useEffect, useState } from 'react';
import { MAIN_NAVIGATION } from '@/constants/navigation';
import { useDashboardStore } from '@/stores/dashboard-store';
import type { NavigationItem } from '@/types/dashboard';
import styles from './sidebar.module.scss';

function SidebarNavItem({
  item,
  pathname,
  onNavClick,
}: {
  item: NavigationItem;
  pathname: string;
  onNavClick: () => void;
}) {
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // Cek apakah item ini atau salah satu children-nya sedang aktif
  const isSelfActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
  const isChildActive =
    hasChildren &&
    item.children?.some(
      (child) => pathname === child.href || pathname.startsWith(`${child.href}/`),
    );
  const isActive = isSelfActive || isChildActive;

  // Auto expand menu jika halaman aktif ada di dalam children
  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [isChildActive]);

  const toggleOpen = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else {
      onNavClick();
    }
  };

  return (
    <div className={styles.navGroup}>
      {/* Parent Menu Item */}
      <Link
        href={item.href}
        className={clsx(styles.navItem, {
          [styles.active]: isActive,
          [styles.hasChildren]: hasChildren,
          [styles.expanded]: isOpen,
        })}
        title={item.label}
        onClick={toggleOpen}
      >
        <span className={styles.navIcon}>{item.icon}</span>
        <span className={styles.navLabel}>{item.label}</span>

        {item.badge !== undefined && <span className={styles.badge}>{item.badge}</span>}

        {hasChildren && <span className={clsx(styles.arrow, { [styles.rotated]: isOpen })}>▾</span>}
      </Link>

      {/* Render Sub Menu / Children */}
      {hasChildren && (
        <div className={clsx(styles.subMenu, { [styles.subMenuOpen]: isOpen })}>
          {item.children?.map((child) => {
            const isChildSubActive =
              pathname === child.href || pathname.startsWith(`${child.href}/`);

            return (
              <Link
                key={child.id}
                href={child.href}
                className={clsx(styles.subNavItem, { [styles.activeSub]: isChildSubActive })}
                title={child.label}
                onClick={onNavClick}
              >
                <span className={styles.subNavIcon}>{child.icon}</span>
                <span className={styles.navLabel}>{child.label}</span>
                {child.badge !== undefined && (
                  <span className={clsx(styles.badge, styles.subBadge)}>{child.badge}</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useDashboardStore();

  const handleNavClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      toggleSidebar();
    }
  };

  const handleBackdropClick = () => {
    if (!sidebarCollapsed) {
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
        <div className={styles.sidebarHeader}>
          <span className={styles.logoIcon}>⚡</span>
          <span className={styles.logoText}>Dashboard</span>
        </div>

        <nav className={styles.nav}>
          {MAIN_NAVIGATION.map((item) => (
            <SidebarNavItem
              key={item.id}
              item={item}
              pathname={pathname}
              onNavClick={handleNavClick}
            />
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <p className={styles.version}>v1.0.0</p>
        </div>
      </aside>
    </>
  );
}
