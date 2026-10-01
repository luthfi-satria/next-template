'use client';

import DashboardLayout from '@/components/layouts/dashboard-layout';
import styles from './page.module.scss';

export default function ComponentsPage() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1>Components</h1>
        <p>Components page coming soon...</p>
      </div>
    </DashboardLayout>
  );
}
