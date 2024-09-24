import { create } from 'zustand';

interface RentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useRentModal = create<RentModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));