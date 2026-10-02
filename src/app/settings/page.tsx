'use client';

import DashboardLayout from '@/components/layouts/dashboard-layout';
import styles from './page.module.scss';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1>Settings</h1>
        <p>Settings page coming soon...</p>
      </div>
    </DashboardLayout>
  );
}
