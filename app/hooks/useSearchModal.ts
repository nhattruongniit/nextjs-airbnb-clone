import { create } from 'zustand';

interface SearchModalStoreProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useSearchModal = create<SearchModalStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));