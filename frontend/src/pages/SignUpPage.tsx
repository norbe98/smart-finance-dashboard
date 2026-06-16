import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

export default function SignUpPage() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { signUp, message, changeMessage, loading, changeLoading } = useAuth()

    useEffect(() => {
      changeMessage("")
    }, [])

  async function handleSignUp() {
    changeLoading(true)
    try {
      const content = await signUp({ email, password })
      changeMessage(content.message)
    } catch (error) {
      if (error instanceof Error) {
      changeMessage(error.message)
      }
    } finally {
      changeLoading(false)
    }
  }

  return (
    <div className="mt-4 md:mt-1 flex items-center justify-center px-4">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow-lg border p-8"
        onSubmit={(e) => {
          e.preventDefault()
          handleSignUp()
        }}
      >
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Create account
        </h1>

        <p className="text-slate-500 mb-6">
          Register to start using your dashboard.
        </p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-400"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="flex justify-center mt-2 bg-slate-800 text-white py-2 rounded-lg cursor-pointer hover:bg-slate-700 transition" disabled={loading}>
          {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Signing un...</span>
              </div>
            ) : (
              "Sign Up"
          )}
          </button>
        </div>


        {message === "You registered successfully!" ? 
          <p className="mt-4 text-sm text-green-600">
            {message}
          </p>
          :
          <p className="mt-4 text-sm text-red-600">
            {message}
          </p>
        }
      </form>
    </div>
  )
}