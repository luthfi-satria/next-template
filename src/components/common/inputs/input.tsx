import type React from 'react';
import Block from '../blocks/block';
import styles from './input.module.scss';
import Label from './label';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  errorText?: string;
  helperText?: string;
  label?: string;
};

export default function Input({
  error = false,
  errorText,
  helperText,
  label,
  className = '',
  id,
  disabled,
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const inputClasses = [styles.input, error ? styles.error : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Block as="div" className={styles.inputWrapper}>
      {label && (
        <Label htmlFor={inputId} className={styles.label}>
          {label}
        </Label>
      )}

      <input id={inputId} disabled={disabled} className={inputClasses} {...props} />

      {error && errorText && (
        <Block as="div" className={styles.errorText}>
          {errorText}
        </Block>
      )}

      {!error && helperText && (
        <Block as="div" className={styles.helperText}>
          {helperText}
        </Block>
      )}
    </Block>
  );
}
