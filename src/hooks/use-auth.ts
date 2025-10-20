import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthStore = {
  token: string;
  setToken: (token: string) => void;
  getToken: () => string;
};

export const useAuth = create(
  persist<AuthStore>(
    (set, get) => ({
      token: "",
      setToken: (token: string) => {
        set({ token });
      },
      getToken: () => {
        const state = get();
        return state.token;
      },
    }),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
