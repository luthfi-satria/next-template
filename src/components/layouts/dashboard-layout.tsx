'use client';

import type React from 'react';
import Navbar from '@/components/layouts/navbar';
import Sidebar from '@/components/layouts/sidebar';
import styles from './dashboard-layout.module.scss';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layoutWrapper}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Navbar />
        <main className={styles.pageBody}>{children}</main>
      </div>
    </div>
  );
}
