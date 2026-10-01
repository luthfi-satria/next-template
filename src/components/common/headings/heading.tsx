import clsx from 'clsx';
import type React from 'react';
import styles from './heading.module.scss';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingVariant = 'large' | 'medium' | 'small';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement> & {
  as?: HeadingLevel;
  variant?: HeadingVariant;
};

export default function Heading({
  as: Tag = 'h2',
  variant,
  className,
  children,
  ...rest
}: HeadingProps) {
  return (
    <Tag
      className={clsx(styles.heading, variant && styles[`heading--${variant}`], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
