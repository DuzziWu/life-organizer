import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuthPage() {
  const { login, register, resetPassword } = useAuth()
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)
  const [infoMsg, setInfoMsg] = useState(null)
  const [showReset, setShowReset] = useState(false)
  const MotionForm = motion.form

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg(null)
    setInfoMsg(null)

    if (showReset) {
      const { error } = await resetPassword(email)
      if (error) {
        setErrorMsg(error.message)
      } else {
        setInfoMsg('Eine E-Mail zum Zurücksetzen wurde gesendet.')
      }
      setShowReset(false)
      return
    }

    const action = isLogin ? login : register
    const { error } = await action(email, password)

    if (error) {
      setErrorMsg(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  const switchTab = (mode) => {
    setIsLogin(mode)
    setErrorMsg(null)
    setInfoMsg(null)
    setShowReset(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md min-h-[480px] text-white">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-400">Life Organizer</h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 space-x-4">
          <button
            onClick={() => switchTab(true)}
            className={`px-4 py-2 rounded transition ${
              isLogin
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Anmelden
          </button>
          <button
            onClick={() => switchTab(false)}
            className={`px-4 py-2 rounded transition ${
              !isLogin
                ? 'bg-blue-600 text-white'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
            }`}
          >
            Registrieren
          </button>
        </div>

{/* Formular mit Animation */}
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
    <input
      type="email"
      required
      placeholder="E-Mail"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    {/* Passwortfeld nur anzeigen wenn kein Reset */}
    {!showReset && (
      <input
        type="password"
        required
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}

    {/* Reset Hinweis */}
    <AnimatePresence>
      {showReset && (
        <motion.p
          className="text-sm text-center text-gray-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          Wir senden dir einen Link zum Zurücksetzen des Passworts.
        </motion.p>
      )}
    </AnimatePresence>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
    >
      {showReset
        ? 'Zurücksetzen'
        : isLogin
        ? 'Anmelden'
        : 'Registrieren'}
    </button>

    {/* Passwort vergessen Button */}
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

        {/* Feedback-Nachrichten */}
        {errorMsg && (
          <p className="mt-4 text-red-400 text-sm text-center">{errorMsg}</p>
        )}
        {infoMsg && (
          <p className="mt-4 text-green-400 text-sm text-center">{infoMsg}</p>
        )}
      </div>
    </div>
  )
}
