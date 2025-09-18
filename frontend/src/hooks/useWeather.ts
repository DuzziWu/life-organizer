import { useState, useEffect, useCallback } from 'react'
import { WeatherData, WeatherForecast, WeatherConfig, WeatherLocation } from '../types/weather'
import { weatherService } from '../services/weatherService'

interface UseWeatherResult {
  weatherData: WeatherData | null
  forecast: WeatherForecast[]
  loading: boolean
  error: string | null
  refreshWeather: () => Promise<void>
  updateConfig: (newConfig: Partial<WeatherConfig>) => void
}

export function useWeather(config: WeatherConfig): UseWeatherResult {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<WeatherForecast[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentConfig, setCurrentConfig] = useState(config)

  const updateConfig = useCallback((newConfig: Partial<WeatherConfig>) => {
    setCurrentConfig(prev => ({ ...prev, ...newConfig }))
  }, [])

  const fetchWeatherData = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      let lat: number, lon: number

      if (currentConfig.location === 'auto') {
        // Get user's current location
        try {
          const coords = await weatherService.getCurrentLocation()
          lat = coords.lat
          lon = coords.lon
        } catch (locationError) {
          console.warn('Could not get current location, using demo data:', locationError)
          // Fallback to demo data
          setWeatherData(weatherService.getDemoWeatherData())
          setForecast(weatherService.getDemoForecast().slice(0, currentConfig.days))
          setLoading(false)
          return
        }
      } else {
        // Use selected location
        lat = currentConfig.location.lat
        lon = currentConfig.location.lon
      }

      // Check if we have a valid API key
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
      if (!apiKey || apiKey === 'demo-key') {
        console.warn('No valid OpenWeatherMap API key found, using demo data')
        // Use demo data but with selected location name if available
        const demoData = weatherService.getDemoWeatherData()
        if (currentConfig.location !== 'auto') {
          demoData.location = currentConfig.location.name
          demoData.country = currentConfig.location.country
        }
        setWeatherData(demoData)
        setForecast(weatherService.getDemoForecast().slice(0, currentConfig.days))
        setLoading(false)
        return
      }

      // Fetch real weather data
      const [currentWeather, weatherForecast] = await Promise.all([
        weatherService.getCurrentWeather(lat, lon, currentConfig.units),
        weatherService.getForecast(lat, lon, currentConfig.days, currentConfig.units)
      ])

      setWeatherData(currentWeather)
      setForecast(weatherForecast)
    } catch (err) {
      console.error('Error fetching weather data:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data')
      
      // Fallback to demo data on error
      setWeatherData(weatherService.getDemoWeatherData())
      setForecast(weatherService.getDemoForecast().slice(0, currentConfig.days))
    } finally {
      setLoading(false)
    }
  }, [currentConfig])

  const refreshWeather = useCallback(async () => {
    await fetchWeatherData()
  }, [fetchWeatherData])

  // Initial load
  useEffect(() => {
    fetchWeatherData()
  }, [fetchWeatherData])

  // Auto-refresh based on updateInterval
  useEffect(() => {
    if (currentConfig.updateInterval <= 0) return

    const interval = setInterval(() => {
      fetchWeatherData()
    }, currentConfig.updateInterval * 60 * 1000) // Convert minutes to milliseconds

    return () => clearInterval(interval)
  }, [currentConfig.updateInterval, fetchWeatherData])

  return {
    weatherData,
    forecast,
    loading,
    error,
    refreshWeather,
    updateConfig
  }
}