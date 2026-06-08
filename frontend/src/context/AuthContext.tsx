import { createContext, useContext, useState } from "react";
import type { User,  AuthContext, AuthUser } from "../types/types";

const AuthContext = createContext<AuthContext | null>(null)

export default function AuthProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<User |null>(null)
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<string>("")

    async function signUp(data: AuthUser) {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const email = await res.json()
        return email
    }

    return (
        <AuthContext.Provider value={{ user, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("AuthContext does not exist!");
    return ctx
}