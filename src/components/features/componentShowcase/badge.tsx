import styles from '@/app/components/page.module.scss';
import Badges from '@/components/common/badges/badges';
import Grid from '@/components/common/blocks/grid';
import Card from '@/components/common/cards/card';
import Heading from '@/components/common/headings/heading';
import Label from '@/components/common/inputs/label';

export default function BadgeShowcase() {
  const badges = [
    { label: 'Badge - Default', variant: 'default', content: 'Default' },
    { label: 'Badge - Success', variant: 'success', content: '✓ Success' },
    { label: 'Badge - Error', variant: 'error', content: '✕ Error' },
    { label: 'Badge - Warning', variant: 'warning', content: '⚠ Warning' },
    { label: 'Badge - Info', variant: 'info', content: 'ℹ Info' },
  ];
  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Badge Components
      </Heading>

      <Grid>
        {badges.map(({ label, variant, content }) => (
          <Card key={label}>
            <Label variant="div">{label}</Label>
            <Badges
              key={label}
              variant={variant as 'default' | 'success' | 'error' | 'warning' | 'info'}
            >
              {content}
            </Badges>
          </Card>
        ))}
      </Grid>
    </section>
  );
}
