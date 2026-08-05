import { create } from 'zustand';

/**
 * The console has no session of its own – it is a client of the management API,
 * which authenticates with a single static key (`API_KEY` on the server). The
 * operator pastes that key once; it is kept in localStorage and sent as
 * `x-api-key` on every request.
 *
 * That means the key is readable by anything running on this origin, which is
 * the honest trade for a single-credential admin API: the alternative would be
 * inventing a user/session system the engine does not have. Deploy the console
 * on the same origin as the API and treat the browser as trusted.
 */
const STORAGE_KEY = 'flow.console.apiKey';

function readStoredKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    // Private mode / storage disabled – the key just does not persist.
    return '';
  }
}

interface AuthState {
  apiKey: string;
  /** Set when the server answers 401, so the gate can explain itself. */
  rejected: boolean;
  setApiKey: (key: string) => void;
  clearApiKey: () => void;
  markRejected: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  apiKey: readStoredKey(),
  rejected: false,

  setApiKey: (key) => {
    const trimmed = key.trim();
    try {
      if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Non-fatal: the key still works for this tab.
    }
    set({ apiKey: trimmed, rejected: false });
  },

  clearApiKey: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore.
    }
    set({ apiKey: '', rejected: false });
  },

  markRejected: () => set({ rejected: true }),
}));

/** For the axios interceptor, which runs outside React. */
export function currentApiKey(): string {
  return useAuthStore.getState().apiKey;
}
