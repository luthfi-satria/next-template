import type { Metadata } from 'next';
import { RegisterForm } from '@/components/features/auth/register-form';

export const metadata: Metadata = {
  title: 'Daftar Akun | Next Template',
  description: 'Halaman pendaftaran pengguna baru',
};

export default function RegisterPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '1rem' }}>
      <RegisterForm />
    </main>
  );
}
