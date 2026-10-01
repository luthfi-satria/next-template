'use server';

import { eq } from 'drizzle-orm';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { type LoginInput, loginSchema, type RegisterInput, registerSchema } from '@/lib/zod/auth';
import type { UserSession } from '@/types/user';

export type ActionResult<T> = { success: true; data: T } | { success: false; error: string };

// Action Registration
export async function registerAction(
  input: RegisterInput,
): Promise<ActionResult<{ userId: string }>> {
  try {
    const validated = registerSchema.parse(input);

    // Cek apakah email sudah terdaftar
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, validated.email),
    });

    if (existingUser) {
      return { success: false, error: 'Email sudah terdaftar' };
    }

    // Hash password (Simulasi sederhana dengan Web Crypto API atau gunakan bcryptjs)
    const passwordHash = Buffer.from(validated.password).toString('base64'); // Ganti dengan bcrypt.hash di produksi

    const [newUser] = await db
      .insert(users)
      .values({
        name: validated.name,
        email: validated.email,
        passwordHash,
        role: 'user',
      })
      .returning({ id: users.id });

    return { success: true, data: { userId: newUser.id } };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Gagal melakukan registrasi' };
  }
}

// Action Get Current User Profile
export async function getProfileAction(userId: string): Promise<ActionResult<UserSession['user']>> {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return { success: false, error: 'User tidak ditemukan' };
    }

    return { success: true, data: user };
  } catch (_error) {
    return { success: false, error: 'Gagal mengambil data user' };
  }
}

// Action Login
export async function loginAction(input: LoginInput): Promise<ActionResult<UserSession['user']>> {
  try {
    const validated = loginSchema.parse(input);

    const user = await db.query.users.findFirst({
      where: eq(users.email, validated.email),
    });

    if (!user) {
      return { success: false, error: 'Email atau password salah' };
    }

    // Verifikasi password (gunakan bcrypt.compare untuk produksi)
    const inputHash = Buffer.from(validated.password).toString('base64');
    if (user.passwordHash !== inputHash) {
      return { success: false, error: 'Email atau password salah' };
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return { success: true, data: userData };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Gagal melakukan login' };
  }
}
