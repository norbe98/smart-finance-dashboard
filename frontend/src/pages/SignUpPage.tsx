import { useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function SignUpPage() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [registeredEmail, setRegisteredEmail] = useState<string>("")
    const { signUp } = useAuth()

    async function handleSignUp() {
        try {
            const rEmail = await signUp({email, password})
            if(rEmail) setRegisteredEmail(rEmail)
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSignUp()
            }}>
                <label>Email:
                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>Password:
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button>Register</button>
            </form>

            {registeredEmail && <>
            You registered successfully with {registeredEmail}, now you can login.</>}
        </div>
    )
}