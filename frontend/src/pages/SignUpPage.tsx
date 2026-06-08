import { useState } from "react"

export default function SignUpPage() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    return (
        <div>
            <form>
                <label>Email:
                    <input value={email} type="email" onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label>Password:
                    <input value={password} type="password" onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button>Register</button>
            </form>
        </div>
    )
}