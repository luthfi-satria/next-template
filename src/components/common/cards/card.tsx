import type { HTMLAttributes } from 'react';
import Block from '../blocks/block';
import styles from './card.module.scss';

type CardsProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children?: React.ReactNode;
};
export default function Card({ className, children, ...props }: CardsProps) {
  return (
    <Block as="div" className={`${styles.card} ${className ?? ''}`} {...props}>
      {children}
    </Block>
  );
}
