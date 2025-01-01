import { create } from "zustand";

interface AuthState {
  user: string;
  setUser: (user: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: "",

  setUser: (user) => set({ user }),
}));
