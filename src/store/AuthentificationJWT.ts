import ModToken from "../models/users/ModToken.ts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface InterfaceTokenStore {
    token: ModToken | null;
    setToken: (newToken: ModToken) => void;
}

export const useAuthentificationJWTStore = create<InterfaceTokenStore>()(
    persist(
        (set) => ({
            token: null,
            setToken: (newToken: ModToken) => set({ token: newToken }),
        }),
        {
            name: "token store",
            partialize: (state) => ({ token:encrypteData(JSON.stringify(state.token)) })
        }
    )
);
