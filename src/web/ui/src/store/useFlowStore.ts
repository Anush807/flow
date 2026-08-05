import { create } from 'zustand';
import type { Flow, FlowStatus } from '../types';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface FlowStoreState {
  // Filters & UI state
  searchTerm: string;
  statusFilter: FlowStatus | 'all';

  // Modals
  isTestModalOpen: boolean;
  isEmitModalOpen: boolean;
  activeFlowForAction: Flow | null;

  toasts: Toast[];

  setSearchTerm: (term: string) => void;
  setStatusFilter: (filter: FlowStatus | 'all') => void;
  openTestModal: (flow: Flow) => void;
  closeTestModal: () => void;
  openEmitModal: (flow: Flow) => void;
  closeEmitModal: () => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useFlowStore = create<FlowStoreState>((set) => ({
  searchTerm: '',
  statusFilter: 'all',

  isTestModalOpen: false,
  isEmitModalOpen: false,
  activeFlowForAction: null,

  toasts: [],

  setSearchTerm: (term) => set({ searchTerm: term }),
  setStatusFilter: (filter) => set({ statusFilter: filter }),

  openTestModal: (flow) => set({ isTestModalOpen: true, activeFlowForAction: flow }),
  closeTestModal: () => set({ isTestModalOpen: false, activeFlowForAction: null }),

  openEmitModal: (flow) => set({ isEmitModalOpen: true, activeFlowForAction: flow }),
  closeEmitModal: () => set({ isEmitModalOpen: false, activeFlowForAction: null }),

  addToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    // Errors are worth reading twice; a success toast can go.
    setTimeout(
      () => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
      type === 'error' ? 8000 : 4000,
    );
  },
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
