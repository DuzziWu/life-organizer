import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function RegisterForm() {
  const { register } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState(null)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError(null)

    const { user, error } = await register(email, password)

    if (error) {
      setError(error.message)
      return
    }

    // Zusatzdaten in Tabelle "profiles" speichern
    const { error: profileError } = await supabase.from('profiles').insert([
      {
        id: user.id,      // User-ID als Primärschlüssel
        name: username    // Der eingegebene Benutzername
      }
    ])

    if (profileError) {
      setError('Registrierung erfolgreich, aber Fehler beim Speichern des Nutzernamens.')
    }
  }

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <input
        className="w-full p-2 rounded bg-gray-700 text-white"
        type="text"
        placeholder="Dein Name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

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
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Registrieren
      </button>
    </form>
  )
}
