import { create } from 'zustand';

interface ScrollStore {
  progress: number;
  activeSection: string;
 isReady: boolean;
 setProgress: (p: number) => void;
  setActiveSection: (s: string) => void;
  setReady: (r: boolean) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  activeSection: 'hero',
  isReady: false,
  setProgress: (p) => set({ progress: p }),
  setActiveSection: (s) => set({ activeSection: s }),
  setReady: (r) => set({ isReady: r }),
}));
