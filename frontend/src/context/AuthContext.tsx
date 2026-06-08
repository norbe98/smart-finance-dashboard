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

    async function signIn(data: AuthUser) {
                const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const user = await res.json()

            if(res.status === 401) return setError("The email is not existing")

            if(res.status === 402) return setError("The passowrd is not correct")

            if(res.status === 200) {
                localStorage.setItem("token", user.token)
            }
    }

    async function logOut() {

    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, error }}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("AuthContext does not exist!");
    return ctx
}