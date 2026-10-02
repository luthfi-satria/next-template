import Block from '../blocks/block';
import styles from './grid.module.scss';

type GridProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: React.ReactNode;
};
export default function Grid({ className, children }: GridProps) {
  return (
    <Block as="div" className={`${styles.grid} ${className ?? ''}`}>
      {children}
    </Block>
  );
}
