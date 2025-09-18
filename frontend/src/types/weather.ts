// Weather Widget Types

export interface WeatherData {
  location: string
  country: string
  temperature: number
  condition: string
  icon: string
  humidity: number
  windSpeed: number
  pressure: number
  uvIndex: number
  visibility: number
  feelsLike: number
  updatedAt: string
}

export interface WeatherForecast {
  date: string
  dayName: string
  maxTemp: number
  minTemp: number
  condition: string
  icon: string
  precipitation: number
}

export interface WeatherLocation {
  name: string
  country: string
  lat: number
  lon: number
  state?: string
}

export interface WeatherConfig {
  location: 'auto' | WeatherLocation
  units: 'metric' | 'imperial'
  showForecast: boolean
  days: number
  updateInterval: number // minutes
  showDetails: boolean
}

export type WeatherSize = 'small' | 'medium' | 'large'

export interface WeatherWidgetProps {
  size: WeatherSize
  config: WeatherConfig
  onConfigChange?: (config: WeatherConfig) => void
}