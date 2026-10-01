'use client';

import QuickStatsCard from '@/components/features/dashboard/quick-stats-card';
import WelcomeCard from '@/components/features/dashboard/welcome-card';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { useAuthStore } from '@/stores/auth-store';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className={styles.dashboardGrid}>
        <WelcomeCard userName={user?.name || 'User'} />

        <div className={styles.statsGrid}>
          <QuickStatsCard title="Total Projects" value="12" icon="📁" trend="+2 this month" />
          <QuickStatsCard title="Team Members" value="8" icon="👥" trend="2 new members" />
          <QuickStatsCard title="Tasks Completed" value="47" icon="✅" trend="+5 this week" />
          <QuickStatsCard title="Active Issues" value="3" icon="⚠️" trend="1 critical" />
        </div>
      </div>
    </DashboardLayout>
  );
}
