import Block from '../blocks/block';
import styles from './statsCard.module.scss';

interface StatsCardProps {
  title: string;
  value: string;
  icon: string;
  trend?: string;
}

export default function StatsCard({ title, value, icon, trend }: StatsCardProps) {
  return (
    <Block as="div" className={styles.card}>
      <Block as="div" className={styles.header}>
        <Block as="span" className={styles.icon}>
          {icon}
        </Block>
        <h3 className={styles.title}>{title}</h3>
      </Block>
      <Block as="div" className={styles.value}>
        {value}
      </Block>
      {trend && (
        <Block as="p" className={styles.trend}>
          {trend}
        </Block>
      )}
    </Block>
  );
}
