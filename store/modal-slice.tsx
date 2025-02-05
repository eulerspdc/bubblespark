import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
}

interface ModalStore {
  modal: ModalState;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: {
    isOpen: false,
    content: null,
  },
  openModal: () => set({ modal: { isOpen: true } }),
  closeModal: () => set({ modal: { isOpen: false } }),
}));
