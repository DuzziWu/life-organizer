import React, { useEffect, useState } from 'react'

export default function ClockWidget({ size }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const getGreeting = () => {
    const hour = now.getHours()
    if (hour < 12) return 'Guten Morgen!'
    if (hour < 18) return 'Guten Tag!'
    return 'Guten Abend!'
  }

  const formatDate = () =>
    now.toLocaleDateString('de-DE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

  return (
    <div className="flex flex-col items-center justify-center text-white text-center h-full">
      <p className="text-5xl font-bold">
        {now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </p>

      {size !== 'small' && (
        <p className="text-lg mt-2">{formatDate()}</p>
      )}

      {size === 'large' && (
        <p className="text-sm text-gray-400 mt-2">{getGreeting()}</p>
      )}
    </div>
  )
}
