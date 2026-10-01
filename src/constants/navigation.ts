import type { NavigationItem } from '@/types/dashboard';

export const MAIN_NAVIGATION: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: '📊',
  },
  {
    id: 'guide',
    label: 'Guide',
    href: '/guide',
    icon: '📖',
    children: [
      {
        id: 'themes',
        label: 'Themes & Styles Guide',
        href: '/themes',
        icon: '📈',
      },
      {
        id: 'components',
        label: 'Components',
        href: '/components',
        icon: '📁',
        badge: 3,
      },
      {
        id: 'typography',
        label: 'Typography',
        href: '/typography',
        icon: '🔤',
      },
    ],
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
