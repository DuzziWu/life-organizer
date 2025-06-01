import React, { useState } from 'react'

export default function WeatherSettingsForm({ onSubmit }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (trimmed) {
      localStorage.setItem('weather-location', trimmed)
      onSubmit(trimmed)
      setInput('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-700 p-3 rounded shadow-lg text-white mt-4">
      <input
        type="text"
        placeholder="Ort eingeben"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="px-2 py-1 rounded text-black mr-2"
      />
      <button type="submit" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-white">
        Speichern
      </button>
    </form>
  )
}
