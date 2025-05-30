import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Fehler beim Laden des Profils:', error.message)
      } else {
        setProfile(data)
      }

      setLoading(false)
    }

    fetchProfile()
  }, [user, navigate])

  if (loading) return <p className="p-4 text-white">Lade Profil...</p>

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 text-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Mein Profil</h2>
      {profile ? (
        <div className="space-y-2">
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Erstellt am:</strong> {new Date(profile.created_at).toLocaleString()}</p>
          <button
            onClick={logout}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <p>Kein Profil gefunden.</p>
      )}
    </div>
  )
}
