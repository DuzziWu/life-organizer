import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function RegisterForm() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    await register(email, password)
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
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
        Register
      </button>
    </form>
  )
}
