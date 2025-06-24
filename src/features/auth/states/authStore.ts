import { create } from "zustand";
import type { CurrentUser } from "../types/CurrentUser"; // Reutilizamos este tipo

// Define a estrutura do nosso estado e das ações para modificá-lo
interface AuthState {
  currentUser: CurrentUser | null;
  idToken: string | null;
  loading: boolean;
  error: Error | null;
  setAuthState: (state: Partial<AuthState>) => void; // Ação para atualizar o estado
  clearAuthState: () => void; // Ação para limpar o estado (logout)
}

// Cria o store com o Zustand
export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial
  currentUser: null,
  idToken: null,
  loading: true,
  error: null,
  // Ações que modificam o estado
  setAuthState: (newState) => set((state) => ({ ...state, ...newState })),
  clearAuthState: () => set({ currentUser: null, idToken: null, error: null }),
}));
