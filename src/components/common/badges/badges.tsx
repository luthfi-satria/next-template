import Block from '../blocks/block';
import styles from './badges.module.scss';

type BadgesProps = React.HTMLAttributes<HTMLElement> & {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
};
export default function Badges({ children, variant = 'default', className, ...rest }: BadgesProps) {
  return (
    <Block as="span" className={`${styles.badge} ${styles[variant]} ${className}`} {...rest}>
      {children}
    </Block>
  );
}
