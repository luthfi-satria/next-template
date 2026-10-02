'use server';

import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
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
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validated.email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, error: 'Email sudah terdaftar' };
    }

    const passwordHash = await bcrypt.hash(validated.password, 12);

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
    const user = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (user.length === 0) {
      return { success: false, error: 'User tidak ditemukan' };
    }

    return { success: true, data: user[0] };
  } catch (_error) {
    return { success: false, error: 'Gagal mengambil data user' };
  }
}

// Action Login
export async function loginAction(input: LoginInput): Promise<ActionResult<UserSession['user']>> {
  try {
    const validated = loginSchema.parse(input);

    const userResult = await db
      .select()
      .from(users)
      .where(eq(users.email, validated.email))
      .limit(1);

    if (userResult.length === 0) {
      return { success: false, error: 'Email atau password salah' };
    }

    const user = userResult[0];

    // Verifikasi password (bcrypt)
    const valid = await bcrypt.compare(validated.password, user.passwordHash);
    if (!valid) {
      return { success: false, error: 'Email atau password salah' };
    }

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Set auth cookie
    const cookieStore = await cookies();
    cookieStore.set('auth-token', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true, data: userData };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Gagal melakukan login' };
  }
}

// Action Logout
export async function logoutAction(): Promise<ActionResult<null>> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    return { success: true, data: null };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Gagal melakukan logout' };
  }
}
