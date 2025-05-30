import React, { useState, useEffect } from 'react'

const API_KEY = 'a78b36acd4ea468406922f6b99c9ed96'
const CACHE_DURATION_HOURS = 8

export default function WeatherWidget({ openSettings, size }) {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (!location) getInitialLocation()
  }, [location])

  useEffect(() => {
    if (location) {
      fetchWeather(location)
      if (size !== 'small') fetchForecast(location)
    }
  }, [location, size])

  useEffect(() => {
    setShowSettings(openSettings)
  }, [openSettings])

  const getInitialLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=de`
          )
          const data = await res.json()
          const city = data.city || data.locality || data.principalSubdivision
          if (city) setLocation(city)
        },
        () => setLocation('Berlin')
      )
    } else {
      setLocation('Berlin')
    }
  }

  const fetchWeather = async (city) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`
      )
      const data = await res.json()
      if (data.cod === 200) setWeather(data)
      else setWeather(null)
    } catch (err) {
      console.error('Aktuelles Wetter konnte nicht geladen werden', err)
      setWeather(null)
    }
    setLoading(false)
  }

  const fetchForecast = async (city) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=de`
      )
      const data = await res.json()
      if (data.cod === '200') {
        const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 5)
        setForecast(daily)
      }
    } catch (err) {
      console.error('Vorhersage konnte nicht geladen werden', err)
      setForecast([])
    }
  }

  const handleLocationUpdate = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      setLocation(inputValue.trim())
      setInputValue('')
      setShowSettings(false)
    }
  }

  const getDayName = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('de-DE', { weekday: 'long' })
  }

  const renderWeatherBlock = (entry, isToday = false) => {
    const day = isToday ? 'Heute' : getDayName(entry.dt)
    const icon = entry.weather[0].icon
    const rain = entry.pop !== undefined ? Math.round(entry.pop * 100) : null

    return (
      <div className="flex flex-col items-center text-center mb-6" key={entry.dt}>
        <h3 className="text-lg font-semibold">{day}</h3>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={entry.weather[0].description}
          className="w-16 h-16"
        />
        <p className="text-2xl font-bold">{Math.round(entry.main.temp)}°C</p>
        {rain !== null && (
          <p className="text-sm text-blue-300"> 🌧 {rain}%</p>
        )}
      </div>
    )
  }

  return (
    <div className="text-white relative h-full">
      {showSettings && (
        <form
          onSubmit={handleLocationUpdate}
          className="non-draggable absolute top-10 left-2 bg-gray-700 p-3 rounded shadow-lg z-20"
        >
          <input
            type="text"
            placeholder="Ort eingeben"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="non-draggable px-2 py-1 rounded text-black mr-2"
          />
          <button
            type="submit"
            className="non-draggable bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-white"
          >
            Speichern
          </button>
        </form>
      )}

      {loading && <p>Lade Wetterdaten...</p>}

      {!loading && weather && (
        <div className="flex flex-col items-center justify-center text-center h-full">
          <h2 className="text-xl font-bold mt-5">{weather.name}</h2>

          {size === 'small' && renderWeatherBlock(weather, true)}

          {(size === 'medium' || size === 'large') && (
            <div className="flex flex-row justify-around w-full mt-4">
              {forecast.map((day) => renderWeatherBlock(day, false, size))}
            </div>
          )}
        </div>
      )}

      {!loading && !weather && (
        <p className="text-red-400">Ort nicht gefunden oder Fehler aufgetreten.</p>
      )}
    </div>
  )
}
