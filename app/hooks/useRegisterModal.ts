import { create } from 'zustand';

interface RegisterModalStoreProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useRegisterModal = create<RegisterModalStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));