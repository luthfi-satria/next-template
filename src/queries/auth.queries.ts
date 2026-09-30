'use client';

import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { getProfileAction, loginAction, registerAction } from '@/actions/auth.actions';
import type { LoginInput, RegisterInput } from '@/lib/zod/auth';
import { useAuthStore } from '@/stores/auth-store';

// 1. Query Keys Centralized
export const authKeys = {
  all: ['auth'] as const,
  profile: (userId: string) => [...authKeys.all, 'profile', userId] as const,
};

// 2. Query Options
export const profileQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: authKeys.profile(userId),
    queryFn: async () => {
      const res = await getProfileAction(userId);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    enabled: !!userId,
  });

// 3. Custom Query Hook
export function useUserProfile(userId: string) {
  return useQuery(profileQueryOptions(userId));
}

// 4. Custom Mutation Hook (Register)
export function useRegisterMutation() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: RegisterInput) => {
      const res = await registerAction(data);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: (data) => {
      setUser({
        id: data.userId,
        name: '',
        email: '',
        role: 'user',
      });
    },
  });
}

export function useLoginMutation() {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await loginAction(data);
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
    onSuccess: (userData) => {
      // Simpan data user aktif ke Zustand Store
      setUser(userData);
    },
  });
}
