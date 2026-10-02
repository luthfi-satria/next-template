'use client';

import Block from '@/components/common/blocks/block';
import Grid from '@/components/common/blocks/grid';
import StatsCard from '@/components/common/cards/statsCard';
import DashboardWelcomeCard from '@/components/features/dashboard/welcome-card';
import DashboardLayout from '@/components/layouts/dashboard-layout';
import { useAuthStore } from '@/stores/auth-store';
import styles from './dashboard.module.scss';

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <Grid className={styles.dashboardGrid}>
        <DashboardWelcomeCard userName={user?.name || 'User'} />

        <Block as="div" className={styles.statsGrid}>
          <StatsCard title="Total Projects" value="12" icon="📁" trend="+2 this month" />
          <StatsCard title="Team Members" value="8" icon="👥" trend="2 new members" />
          <StatsCard title="Tasks Completed" value="47" icon="✅" trend="+5 this week" />
          <StatsCard title="Active Issues" value="3" icon="⚠️" trend="1 critical" />
        </Block>
      </Grid>
    </DashboardLayout>
  );
}
