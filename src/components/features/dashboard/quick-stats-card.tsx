import styles from './quick-stats-card.module.scss';

interface QuickStatsCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
}

export default function QuickStatsCard({ title, value, icon, trend }: QuickStatsCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.value}>{value}</div>
      {trend && <p className={styles.trend}>{trend}</p>}
    </div>
  );
}
