import styles from './welcome-card.module.scss';

interface WelcomeCardProps {
  userName: string;
}

export default function WelcomeCard({ userName }: WelcomeCardProps) {
  const currentHour = new Date().getHours();
  let greeting = 'Good morning';

  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good afternoon';
  } else if (currentHour >= 18) {
    greeting = 'Good evening';
  }

  return (
    <div className={styles.welcomeCard}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          {greeting}, <span className={styles.userName}>{userName}</span>! 👋
        </h1>
        <p className={styles.subtitle}>
          Welcome back to your dashboard. Here's what's happening today.
        </p>
      </div>
      <div className={styles.decoration} />
    </div>
  );
}
