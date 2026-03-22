import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LayoutState = {
  layout: 'side' | 'bottom';
  setLayout: (layout: 'side' | 'bottom') => void;
};

export const useLayout = create<LayoutState>()(
  persist(
    (set) => ({
      layout: 'bottom',
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: 'layout-storage',
    },
  ),
);
