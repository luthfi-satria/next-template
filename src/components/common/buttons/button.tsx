import type React from 'react';
import styles from './button.module.scss';

export type ButtonVariant = 'default' | 'primary' | 'success' | 'danger' | 'outline' | 'disabled';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

export default function ButtonComponent({
  children,
  variant = 'default',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClass = styles[variant] || '';
  const combinedClassName = [styles.button, variantClass, className].filter(Boolean).join(' ');

  return (
    <button {...props} disabled={disabled} className={combinedClassName}>
      {children}
    </button>
  );
}
