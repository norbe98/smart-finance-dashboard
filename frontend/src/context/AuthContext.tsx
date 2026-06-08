import { createContext, useContext } from "react";
import type { AuthContext } from "../types/types";

const AuthContext = createContext<AuthContext | null>(null)

export default function AuthProvider({children}: {children: React.ReactNode}) {
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("AuthContext does not exist!");
    return ctx
}