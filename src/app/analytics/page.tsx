'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import styles from './page.module.scss';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1>Analytics</h1>
        <p>Analytics dashboard coming soon...</p>
      </div>
    </DashboardLayout>
  );
}
