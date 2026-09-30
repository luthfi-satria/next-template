'use client';

import { Header } from '@/components/layouts/header';
import Sidebar from '@/components/layouts/sidebar';
import styles from './dashboard-layout.module.scss';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainWrapper}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
