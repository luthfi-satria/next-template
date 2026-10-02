'use client';

import { useState } from 'react';
import { type RegisterInput, registerSchema } from '@/lib/zod/auth';
import { useRegisterMutation } from '@/queries/auth.queries';
import styles from './register-form.module.scss';

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterInput>({
    name: '',
    email: '',
    password: '',
  });

  const registerMutation = useRegisterMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi Zod di client sebelum diproses
    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      alert(validation.error.issues[0].message);
      return;
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        alert('Registrasi berhasil!');
      },
    });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <h2>Daftar Akun Baru</h2>

      {registerMutation.isError && <p className={styles.error}>{registerMutation.error.message}</p>}

      <input
        type="text"
        placeholder="Nama Lengkap"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        disabled={registerMutation.isPending}
      />

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        disabled={registerMutation.isPending}
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        disabled={registerMutation.isPending}
      />

      <button type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Memproses...' : 'Daftar'}
      </button>
    </form>
  );
}
