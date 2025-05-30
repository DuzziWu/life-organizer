import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginForm() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        className="w-full p-2 rounded bg-gray-700 text-white"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="w-full p-2 rounded bg-gray-700 text-white"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Login
      </button>
    </form>
  )
}
