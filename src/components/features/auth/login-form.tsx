'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginAction } from '@/actions/auth.actions';
import { type LoginInput, loginSchema } from '@/lib/zod/auth';
import { useAuthStore } from '@/stores/auth-store';
import styles from './login-form.module.scss';

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Client-side Zod validation
    const validation = loginSchema.safeParse(formData);
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const result = await loginAction(formData);

      if (result.success) {
        // Set user in auth store
        setUser(result.data);
        // Set auth cookie (server action should handle this)
        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Masuk ke Akun</h2>

      {error && <p className={styles.error}>{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Memproses...' : 'Masuk'}
      </button>
    </form>
  );
}
