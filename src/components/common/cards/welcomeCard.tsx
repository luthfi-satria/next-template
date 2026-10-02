import Block from '@/components/common/blocks/block';
import styles from '@/components/common/cards/welcomeCard.module.scss';
import Heading from '../headings/heading';

type cardVariant = 'primary' | 'secondary' | 'tertiary' | 'outline';
type WelcomeCardProps = {
  variant?: cardVariant;
  title: string;
  content?: string;
  icon?: React.ReactNode;
};
export default function WelcomeCard({
  variant = 'primary',
  title,
  content,
  icon,
}: WelcomeCardProps) {
  return (
    <Block as="div" className={`${styles.welcomeCard} ${variant ? styles[variant] : ''}`}>
      <Block as="div" className={styles.content}>
        <Heading as="h1" className={styles.title}>
          {title}
          {icon && (
            <Block as="span" className={styles.icon}>
              {icon}
            </Block>
          )}
        </Heading>
        <Block as="p" className={styles.subtitle}>
          {content}
        </Block>
      </Block>
      <Block as="div" className={styles.decoration} />
    </Block>
  );
}
