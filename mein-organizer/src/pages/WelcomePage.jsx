import React, { useState, useEffect } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'

const API_KEY = 'a78b36acd4ea468406922f6b99c9ed96'

export default function WeatherWidget({ size }) {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cached = localStorage.getItem('weather-location')
    if (cached) setLocation(cached)
    else getInitialLocation()
  }, [])

  useEffect(() => {
    if (location) {
      fetchWeather(location)
      if (size !== 'small') fetchForecast(location)
    }
  }, [location, size])

  const getInitialLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=de`
          )
          const data = await res.json()
          const city = data.city || data.locality || data.principalSubdivision
          if (city) {
            setLocation(city)
            localStorage.setItem('weather-location', city)
          }
        },
        () => {
          setLocation('Berlin')
          localStorage.setItem('weather-location', 'Berlin')
        }
      )
    } else {
      setLocation('Berlin')
      localStorage.setItem('weather-location', 'Berlin')
    }
  }

  const fetchWeather = async (city) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=de`
      )
      const data = await res.json()
      setWeather(data.cod === 200 ? data : null)
    } catch {
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
    } catch {
      setForecast([])
    }
  }

  const getDayName = (ts) =>
    new Date(ts * 1000).toLocaleDateString('de-DE', { weekday: 'long' })

  const getWeatherEmoji = (desc) => {
    const d = desc.toLowerCase()
    if (d.includes('regen')) return '🌧️'
    if (d.includes('sonne') || d.includes('klar')) return '☀️'
    if (d.includes('wolke')) return '☁️'
    if (d.includes('schnee')) return '❄️'
    if (d.includes('gewitter')) return '⛈️'
    if (d.includes('nebel') || d.includes('dunst')) return '🌫️'
    return '🌡️'
  }

  // IconCode zu Pfad in public/lottie
  const lottieMap = {
    '01d': '/lottie/Weather-sunny.json',
    '01n': '/lottie/Weather-sunny.json',
    '02d': '/lottie/Weather-partly cloudy.json',
    '02n': '/lottie/Weather-partly cloudy.json',
    '03d': '/lottie/Weather-partly cloudy.json',
    '03n': '/lottie/Weather-partly cloudy.json',
    '04d': '/lottie/Weather-partly cloudy.json',
    '04n': '/lottie/Weather-partly cloudy.json',
    '09d': '/lottie/Weather-partly shower.json',
    '09n': '/lottie/Weather-partly shower.json',
    '10d': '/lottie/Weather-partly shower.json',
    '10n': '/lottie/Weather-partly shower.json',
    '11d': '/lottie/Weather-thunder.json',
    '11n': '/lottie/Weather-thunder.json',
    '13d': '/lottie/Weather-snow.json',
    '13n': '/lottie/Weather-snow.json',
    '50d': '/lottie/Weather-foggy.json',
    '50n': '/lottie/Weather-foggy.json',
  }

  const renderWeatherBlock = (entry, isToday = false) => {
    const day = isToday ? 'Heute' : getDayName(entry.dt)
    const icon = entry.weather[0].icon
    const rain = entry.pop !== undefined ? Math.round(entry.pop * 100) : null
    const desc = entry.weather[0].description
    const lottieSrc = lottieMap[icon]

    return (
      <div className="flex flex-col items-center text-center mb-6" key={entry.dt}>
        <h3 className="text-lg font-semibold">{day}</h3>
        {lottieSrc ? (
          <Player
            autoplay
            loop
            src={lottieSrc}
            style={{ height: '64px', width: '64px' }}
            className="mb-1"
          />
        ) : (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt=""
            className="w-16 h-16 mb-1"
          />
        )}
        <p className="text-2xl font-bold">{Math.round(entry.main.temp)}°C</p>
        <p className="text-sm mt-1">
          {getWeatherEmoji(desc)} {desc}
        </p>
        {rain !== null && <p className="text-sm text-blue-300">🌧 {rain}%</p>}
      </div>
    )
  }

  return (
    <div className="text-white relative h-full rounded-xl p-4 shadow-lg bg-gray-800">
      {loading && <p>Lade Wetterdaten...</p>}

      {!loading && weather && (
        <div className="flex flex-col items-center justify-center text-center h-full">
          <h2 className="text-xl font-bold mt-5">{weather.name}</h2>
          {size === 'small' && renderWeatherBlock(weather, true)}
          {(size === 'medium' || size === 'large') && (
            <div className="flex flex-row justify-around w-full mt-4">
              {forecast.map((day) => renderWeatherBlock(day, false))}
            </div>
          )}
        </div>
      )}

      {!loading && !weather && (
        <p className="text-red-400">Ort nicht gefunden.</p>
      )}
    </div>
  )
}
