import styles from '@/app/components/page.module.scss';
import Heading from '@/components/common/headings/heading';
import WelcomeCard from '@/components/features/dashboard/welcome-card';

export default function WelcomeCardShowcase() {
  return (
    <section className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Welcome Card Components
      </Heading>

      <div className={styles.welcomeCardContainer}>
        <WelcomeCard userName="John Doe" />
        <WelcomeCard userName="Jane Smith" />
      </div>
    </section>
  );
}
