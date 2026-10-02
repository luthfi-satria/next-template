import Block from '@/components/common/blocks/block';
import Card from '@/components/common/cards/card';
import WelcomeCard from '@/components/common/cards/welcomeCard';
import styles from './welcome-card.module.scss';

interface WelcomeCardProps {
  userName: string;
}

export default function DashboardWelcomeCard({ userName }: WelcomeCardProps) {
  const currentHour = new Date().getHours();
  let greeting = 'Good morning';

  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else if (currentHour >= 18) {
    greeting = 'Good evening';
  }

  return (
    <Card className={styles.welcomeCard}>
      <Block as="div" className={styles.content}>
        <WelcomeCard title={greeting} content={userName} />
      </Block>
      <div className={styles.decoration} />
    </Card>
  );
}
