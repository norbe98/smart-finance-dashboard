import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function SignInPage() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { signIn, error } = useAuth()

    async function handleSignIn() {
        try {
            await signIn({email, password})
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSignIn()
            }}>
                <label>Email:
                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>Password:
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button>Sign In</button>
            </form>

            {error && <>{error}</>}
        </div>
    )
}