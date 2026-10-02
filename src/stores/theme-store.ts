'use client';

import { create } from 'zustand';
import { COLOR_TOKENS } from '@/constants/themes';
import type { ThemeState } from '@/types/themes';

interface ThemeStateProp extends ThemeState {
  filteredColor: { name: string; hex: string; category: string }[];
  setCopiedText: (text: string | null) => void;
  setSearch: (search: string) => void;
  setActiveTab: (tab: 'all' | 'colors' | 'typography' | 'spacing' | 'elevation' | null) => void;
  handleCopy: (text: string) => void;
  setFilteredColor: () => void;
}

export const useThemeStore = create<ThemeStateProp>((set, get) => ({
  copiedText: null,
  search: null,
  activeTab: 'all',
  filteredColor: [],
  setCopiedText: (text) => set({ copiedText: text }),
  setSearch: (search) => {
    set({ search });
    get().setFilteredColor();
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  handleCopy: (text) => {
    navigator.clipboard.writeText(text);
    get().setCopiedText(text);
    setTimeout(() => get().setCopiedText(null), 1800);
  },
  setFilteredColor: () =>
    set((_state) => {
      const search = get().search || '';
      const filtered = COLOR_TOKENS.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.hex.toLowerCase().includes(search.toLowerCase()) ||
          item.category.toLowerCase().includes(search.toLowerCase()),
      );
      return { filteredColor: filtered };
    }),
}));
