import styles from '@/app/components/page.module.scss';
import Block from '@/components/common/blocks/block';
import Grid from '@/components/common/blocks/grid';
import StatsCard from '@/components/common/cards/statsCard';
import Heading from '@/components/common/headings/heading';

export default function StatsCardShowcase() {
  return (
    <Block as="section" className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Stats Card Components
      </Heading>

      <Grid className={styles.statsGrid}>
        <StatsCard title="Total Users" value="12,345" icon="👥" trend="↑ 12% from last month" />
        <StatsCard title="Revenue" value="$45,231" icon="💰" trend="↑ 8% from last month" />
        <StatsCard title="Active Sessions" value="1,234" icon="⚡" trend="↓ 3% from last month" />
        <StatsCard title="Completed Tasks" value="856" icon="✓" trend="↑ 24% from last month" />
      </Grid>
    </Block>
  );
}
