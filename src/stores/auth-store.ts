import { create } from 'zustand';
import type { UserSession } from '@/types/user';

interface AuthState {
  user: UserSession['user'] | null;
  isAuthenticated: boolean;
  setUser: (user: UserSession['user'] | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
