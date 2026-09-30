'use client';

import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import styles from './page.module.scss';

export default function ProjectsPage() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <h1>Projects</h1>
        <p>Project management page coming soon...</p>
      </div>
    </DashboardLayout>
  );
}
