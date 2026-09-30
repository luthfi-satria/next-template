'use client';

import { create } from 'zustand';
import type { DashboardLayout } from '@/types/dashboard';

interface DashboardState extends DashboardLayout {
  setSidebarCollapsed: (collapsed: boolean) => void;
  setActiveRoute: (route: string) => void;
  toggleSidebar: () => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarCollapsed: true, // Default to closed on mobile
  activeRoute: '/dashboard',
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setActiveRoute: (route) => set({ activeRoute: route }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
}));
