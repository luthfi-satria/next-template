export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: number;
  children?: NavigationItem[];
}

export interface DashboardLayout {
  sidebarCollapsed: boolean;
  activeRoute: string;
}
