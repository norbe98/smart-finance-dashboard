import { createContext, useContext, useEffect, useState } from "react";
import type { User,  AuthContext, AuthUser } from "../types/types";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContext | null>(null)

export default function AuthProvider({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<User |null>(null)
    const [message, setMessage] = useState<string>("")
    const [loading, setLoading] = useState<string>("")
    const navigate = useNavigate()

    useEffect(() => {
        getMe()
        setMessage("")
    }, [])
    
    async function getMe() {
        const token = localStorage.getItem("token")
        
        const res = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const user = await res.json()

        if(user) {
            setUser(user)
        }
    }
    
    async function signUp(data: AuthUser) {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if(res.status === 400) return setMessage("Email already exists!")
        if(res.status === 201) return setMessage("You registered successfully, now you can login.")

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
            
            if(res.status === 401) return setMessage("Invalid email/password, please try again!")

            if(res.status === 200) {
                localStorage.setItem("token", user.token)
                setUser(user.userData)
                alert("You logged in successfully!")
                navigate("/")
                setMessage("")
            }
    }

    async function logOut() {
        localStorage.removeItem("token")
        setUser(null)
        navigate("/")
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, message, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if(!ctx) throw new Error("AuthContext does not exist!");
    return ctx
}