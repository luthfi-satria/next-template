'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type LoginInput, loginSchema } from '@/lib/zod/auth';
import { useLoginMutation } from '@/queries/auth.queries';
import styles from './login-form.module.scss';

export function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const loginMutation = useLoginMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Zod validation
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }

    loginMutation.mutate(formData, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Masuk ke Akun</h2>

      {loginMutation.isError && <p className={styles.error}>{loginMutation.error.message}</p>}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        disabled={loginMutation.isPending}
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        disabled={loginMutation.isPending}
      />

      <button type="submit" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Memproses...' : 'Masuk'}
      </button>
    </form>
  );
}
