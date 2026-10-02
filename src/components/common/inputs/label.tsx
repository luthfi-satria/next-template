import type React from 'react';
import styles from './label.module.scss';

type LabelVariant = 'div' | 'span' | 'label';

type LabelProps = React.HTMLAttributes<HTMLElement> & {
  variant?: LabelVariant;
  htmlFor?: string;
  children?: React.ReactNode;
};

export default function Label({
  variant = 'label',
  children,
  className = '',
  ...props
}: LabelProps) {
  const Component = variant as React.ElementType;

  const combinedClassName = [styles.label, className].filter(Boolean).join(' ');

  return (
    <Component className={combinedClassName} {...props}>
      {children}
    </Component>
  );
}
