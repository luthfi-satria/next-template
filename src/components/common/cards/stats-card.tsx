import styles from '@/app/components/page.module.scss';
import Heading from '@/components/common/headings/heading';
import QuickStatsCard from '@/components/features/dashboard/quick-stats-card';

export default function StatsCardShowcase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Stats Card Components
      </Heading>

      <div className={styles.statsGrid}>
        <QuickStatsCard
          title="Total Users"
          value="12,345"
          icon="👥"
          trend="↑ 12% from last month"
        />
        <QuickStatsCard title="Revenue" value="$45,231" icon="💰" trend="↑ 8% from last month" />
        <QuickStatsCard
          title="Active Sessions"
          value="1,234"
          icon="⚡"
          trend="↓ 3% from last month"
        />
        <QuickStatsCard
          title="Completed Tasks"
          value="856"
          icon="✓"
          trend="↑ 24% from last month"
        />
      </div>
    </section>
  );
}
