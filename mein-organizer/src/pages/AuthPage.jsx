import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../supabase'

export default function AuthPage() {
  const { login, register, resetPassword } = useAuth()
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [showReset, setShowReset] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [infoMsg, setInfoMsg] = useState(null)

  const MotionForm = motion.form

  const resetUI = () => {
    setErrorMsg(null)
    setInfoMsg(null)
    setShowReset(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetUI()

    if (showReset) {
      const { error } = await resetPassword(email)
      error
        ? setErrorMsg(error.message)
        : setInfoMsg('E-Mail zum Zurücksetzen gesendet.')
      return
    }

    if (isLogin) {
      const { error } = await login(email, password)
      if (error) return setErrorMsg(error.message)

      // Username aus Supabase ziehen
      const { data: { user } } = await supabase.auth.getUser()
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user?.id)
        .single()

      if (profile?.username) {
        localStorage.setItem('userName', profile.username)
      }

      navigate('/welcome')
    } else {
      const { error, data } = await register(email, password)
      if (error) return setErrorMsg(error.message)

      const userId = data?.user?.id
      if (userId && username.trim()) {
        await supabase.from('profiles').upsert({ id: userId, username: username.trim() })
        localStorage.setItem('userName', username.trim())
      }

      navigate('/welcome')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md min-h-[500px]">
        <h1 className="text-3xl font-bold text-green-400 text-center mb-6">Life Organizer</h1>

        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => {
              setIsLogin(true)
              resetUI()
            }}
            className={`px-4 py-2 rounded transition ${isLogin ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}
          >
            Anmelden
          </button>
          <button
            onClick={() => {
              setIsLogin(false)
              resetUI()
            }}
            className={`px-4 py-2 rounded transition ${!isLogin ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'}`}
          >
            Registrieren
          </button>
        </div>

        <AnimatePresence mode="wait">
          <MotionForm
            key={isLogin ? 'login' : 'register'}
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
            transition={{ duration: 0.3 }}
          >
            {!isLogin && !showReset && (
              <input
                type="text"
                placeholder="Nutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                required
              />
            )}

            <input
              type="email"
              required
              placeholder="E-Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />

            {!showReset && (
              <input
                type="password"
                required
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
              />
            )}

            {showReset && (
              <motion.p
                className="text-sm text-center text-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                Wir senden dir einen Link zum Zurücksetzen des Passworts.
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
            >
              {showReset ? 'Zurücksetzen' : isLogin ? 'Anmelden' : 'Registrieren'}
            </button>

            {isLogin && !showReset && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowReset(true)}
                  className="text-sm text-gray-400 hover:underline"
                >
                  Passwort vergessen?
                </button>
              </div>
            )}
          </MotionForm>
        </AnimatePresence>

        {errorMsg && <p className="mt-4 text-red-400 text-sm text-center">{errorMsg}</p>}
        {infoMsg && <p className="mt-4 text-green-400 text-sm text-center">{infoMsg}</p>}
      </div>
    </div>
  )
}
