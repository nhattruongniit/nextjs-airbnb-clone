import { create } from 'zustand';

interface LoginModalStoreProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useLoginModal = create<LoginModalStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));