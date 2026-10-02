import styles from '@/app/components/page.module.scss';
import Block from '@/components/common/blocks/block';
import WelcomeCard from '@/components/common/cards/welcomeCard';
import Heading from '@/components/common/headings/heading';

export default function WelcomeCardShowcase() {
  return (
    <Block as="section" className={styles.section}>
      <Heading as="h2" variant="medium" className={styles.sectionTitle}>
        Welcome Card Components
      </Heading>

      <Block as="div" className={styles.welcomeCardContainer}>
        <WelcomeCard variant="primary" title="Welcome" content="John Doe" />
        <WelcomeCard variant="secondary" title="Welcome" content="Jane Smith" />
        <WelcomeCard variant="tertiary" title="Welcome" content="Alice Johnson" />
        <WelcomeCard variant="outline" title="Welcome" content="Bob Brown" />
      </Block>
    </Block>
  );
}
