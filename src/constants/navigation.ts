import type { NavigationItem } from '@/types/dashboard';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    icon: '📁',
    badge: 3,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: '📈',
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: '⚙️',
  },
];

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROJECTS: '/projects',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;
