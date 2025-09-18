import { WeatherData, WeatherForecast } from '../types/weather'

// OpenWeatherMap API configuration
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo-key'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

export interface WeatherLocation {
  name: string
  country: string
  lat: number
  lon: number
  state?: string
}

class WeatherService {
  private async fetchFromAPI(endpoint: string): Promise<any> {
    console.log('🌐 Calling OpenWeatherMap API:', endpoint.replace(API_KEY, 'API_KEY_HIDDEN'))
    const response = await fetch(endpoint)
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    console.log('✅ API Response received:', Object.keys(data))
    return data
  }

  // Fallback city database for when API is not available
  private fallbackCities: WeatherLocation[] = [
    // Major German cities
    { name: 'Berlin', country: 'DE', lat: 52.5200, lon: 13.4050 },
    { name: 'Hamburg', country: 'DE', lat: 53.5488, lon: 9.9872 },
    { name: 'München', country: 'DE', lat: 48.1351, lon: 11.5820 },
    { name: 'Köln', country: 'DE', lat: 50.9375, lon: 6.9603 },
    { name: 'Frankfurt am Main', country: 'DE', lat: 50.1109, lon: 8.6821 },
    { name: 'Stuttgart', country: 'DE', lat: 48.7758, lon: 9.1829 },
    { name: 'Düsseldorf', country: 'DE', lat: 51.2277, lon: 6.7735 },
    { name: 'Leipzig', country: 'DE', lat: 51.3397, lon: 12.3731 },
    { name: 'Dortmund', country: 'DE', lat: 51.5136, lon: 7.4653 },
    { name: 'Essen', country: 'DE', lat: 51.4556, lon: 7.0116 },
    { name: 'Bremen', country: 'DE', lat: 53.0793, lon: 8.8017 },
    { name: 'Dresden', country: 'DE', lat: 51.0504, lon: 13.7373 },
    { name: 'Hannover', country: 'DE', lat: 52.3759, lon: 9.7320 },
    { name: 'Nürnberg', country: 'DE', lat: 49.4521, lon: 11.0767 },
    { name: 'Duisburg', country: 'DE', lat: 51.4344, lon: 6.7623 },
    
    // Brandenburg cities (including Prenzlau area)
    { name: 'Potsdam', country: 'DE', lat: 52.3906, lon: 13.0645 },
    { name: 'Cottbus', country: 'DE', lat: 51.7606, lon: 14.3340 },
    { name: 'Brandenburg an der Havel', country: 'DE', lat: 52.4125, lon: 12.5316 },
    { name: 'Frankfurt (Oder)', country: 'DE', lat: 52.3481, lon: 14.5506 },
    { name: 'Oranienburg', country: 'DE', lat: 52.7548, lon: 13.2368 },
    { name: 'Fürstenwalde/Spree', country: 'DE', lat: 52.3581, lon: 14.0515 },
    { name: 'Rathenow', country: 'DE', lat: 52.6045, lon: 12.3364 },
    { name: 'Schwedt/Oder', country: 'DE', lat: 53.0606, lon: 14.2817 },
    { name: 'Neuruppin', country: 'DE', lat: 52.9244, lon: 12.8008 },
    { name: 'Prenzlau', country: 'DE', lat: 53.3125, lon: 13.8636 },
    { name: 'Templin', country: 'DE', lat: 53.1186, lon: 13.5017 },
    { name: 'Bernau bei Berlin', country: 'DE', lat: 52.6794, lon: 13.5869 },
    { name: 'Strausberg', country: 'DE', lat: 52.5807, lon: 13.8826 },
    { name: 'Eberswalde', country: 'DE', lat: 52.8338, lon: 13.8239 },
    
    // International cities
    { name: 'Wien', country: 'AT', lat: 48.2082, lon: 16.3738 },
    { name: 'Zürich', country: 'CH', lat: 47.3769, lon: 8.5417 },
    { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
    { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
    { name: 'Amsterdam', country: 'NL', lat: 52.3676, lon: 4.9041 },
    { name: 'Prag', country: 'CZ', lat: 50.0755, lon: 14.4378 },
    { name: 'Warschau', country: 'PL', lat: 52.2297, lon: 21.0122 }
  ]

  // Search for cities by name
  async searchCities(query: string): Promise<WeatherLocation[]> {
    if (!query || query.length < 2) return []

    // Check if we have a valid API key
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    if (!apiKey || apiKey === 'demo-key') {
      console.warn('No valid OpenWeatherMap API key found, using fallback city database')
      return this.searchFallbackCities(query)
    }

    try {
      const endpoint = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
      console.log('Searching cities with API:', endpoint)
      const data = await this.fetchFromAPI(endpoint)
      
      if (!data || data.length === 0) {
        console.warn('No results from API, falling back to local database')
        return this.searchFallbackCities(query)
      }
      
      return data.map((location: any) => ({
        name: location.name,
        country: location.country,
        state: location.state,
        lat: location.lat,
        lon: location.lon
      }))
    } catch (error) {
      console.error('Error searching cities via API:', error)
      console.log('Falling back to local city database')
      return this.searchFallbackCities(query)
    }
  }

  // Search in fallback city database
  private searchFallbackCities(query: string): WeatherLocation[] {
    const lowerQuery = query.toLowerCase()
    return this.fallbackCities
      .filter(city => 
        city.name.toLowerCase().includes(lowerQuery) ||
        city.name.toLowerCase().startsWith(lowerQuery)
      )
      .slice(0, 8) // Show more results since we have a good local database
      .sort((a, b) => {
        // Prioritize exact matches and starts-with matches
        const aStarts = a.name.toLowerCase().startsWith(lowerQuery)
        const bStarts = b.name.toLowerCase().startsWith(lowerQuery)
        if (aStarts && !bStarts) return -1
        if (!aStarts && bStarts) return 1
        return a.name.localeCompare(b.name)
      })
  }

  // Get accurate location name by coordinates
  async getLocationName(lat: number, lon: number): Promise<{ name: string, country: string }> {
    try {
      const endpoint = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      const data = await this.fetchFromAPI(endpoint)
      
      if (data && data.length > 0) {
        const location = data[0]
        return {
          name: location.name,
          country: location.country
        }
      }
      
      // Fallback to default if reverse geocoding fails
      return { name: 'Unbekannter Ort', country: 'Deutschland' }
    } catch (error) {
      console.error('Error getting location name:', error)
      return { name: 'Unbekannter Ort', country: 'Deutschland' }
    }
  }

  // Get current weather by coordinates
  async getCurrentWeather(lat: number, lon: number, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherData> {
    try {
      // Get both weather data and accurate location name
      const [weatherData, locationData] = await Promise.all([
        this.fetchFromAPI(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`),
        this.getLocationName(lat, lon)
      ])

      return {
        location: locationData.name,
        country: locationData.country,
        temperature: Math.round(weatherData.main.temp),
        condition: weatherData.weather[0].description,
        icon: this.mapWeatherIcon(weatherData.weather[0].icon),
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        pressure: weatherData.main.pressure,
        uvIndex: 0, // Not available in current weather API
        visibility: Math.round(weatherData.visibility / 1000), // Convert m to km
        feelsLike: Math.round(weatherData.main.feels_like),
        updatedAt: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw error
    }
  }

  // Get weather forecast by coordinates
  async getForecast(lat: number, lon: number, days: number = 5, units: 'metric' | 'imperial' = 'metric'): Promise<WeatherForecast[]> {
    try {
      const endpoint = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      const data = await this.fetchFromAPI(endpoint)

      // Group forecasts by day and take midday forecasts
      const dailyForecasts: { [key: string]: any[] } = {}
      
      data.list.forEach((forecast: any) => {
        const date = forecast.dt_txt.split(' ')[0]
        if (!dailyForecasts[date]) {
          dailyForecasts[date] = []
        }
        dailyForecasts[date].push(forecast)
      })

      const result: WeatherForecast[] = []
      const today = new Date()

      Object.entries(dailyForecasts).slice(0, days).forEach(([date, forecasts], index) => {
        // Take midday forecast (around 12:00) or closest available
        const middayForecast = forecasts.find(f => f.dt_txt.includes('12:00:00')) || forecasts[0]
        
        // Calculate min/max temperatures for the day
        const temps = forecasts.map(f => f.main.temp)
        const maxTemp = Math.round(Math.max(...temps))
        const minTemp = Math.round(Math.min(...temps))

        // Calculate precipitation chance
        const precipitation = Math.round(Math.max(...forecasts.map(f => (f.pop || 0) * 100)))

        // Get day name
        const forecastDate = new Date(date)
        const dayName = index === 0 ? 'Heute' : 
                       index === 1 ? 'Morgen' : 
                       forecastDate.toLocaleDateString('de-DE', { weekday: 'long' })

        result.push({
          date,
          dayName,
          maxTemp,
          minTemp,
          condition: middayForecast.weather[0].description,
          icon: this.mapWeatherIcon(middayForecast.weather[0].icon),
          precipitation
        })
      })

      return result
    } catch (error) {
      console.error('Error fetching forecast:', error)
      throw error
    }
  }

  // Get user's current location with high accuracy
  async getCurrentLocation(): Promise<{ lat: number, lon: number }> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'))
        return
      }

      // First try with high accuracy
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('High accuracy position:', position.coords.latitude, position.coords.longitude, 'Accuracy:', position.coords.accuracy + 'm')
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        (error) => {
          console.warn('High accuracy geolocation failed, trying fallback:', error.message)
          // Fallback to lower accuracy if high accuracy fails
          navigator.geolocation.getCurrentPosition(
            (position) => {
              console.log('Fallback position:', position.coords.latitude, position.coords.longitude, 'Accuracy:', position.coords.accuracy + 'm')
              resolve({
                lat: position.coords.latitude,
                lon: position.coords.longitude
              })
            },
            (fallbackError) => {
              reject(new Error(`Geolocation error: ${fallbackError.message}`))
            },
            {
              enableHighAccuracy: false,
              timeout: 15000,
              maximumAge: 600000 // 10 minutes for fallback
            }
          )
        },
        {
          enableHighAccuracy: true,
          timeout: 20000, // Increased timeout for better accuracy
          maximumAge: 60000 // 1 minute for high accuracy
        }
      )
    })
  }

  // Map OpenWeatherMap icons to our custom icons
  private mapWeatherIcon(apiIcon: string): string {
    const iconMap: { [key: string]: string } = {
      '01d': 'sunny',      // clear sky day
      '01n': 'clear-night', // clear sky night
      '02d': 'partly-cloudy', // few clouds day
      '02n': 'partly-cloudy', // few clouds night
      '03d': 'cloudy',     // scattered clouds
      '03n': 'cloudy',     // scattered clouds
      '04d': 'cloudy',     // broken clouds
      '04n': 'cloudy',     // broken clouds
      '09d': 'rainy',      // shower rain
      '09n': 'rainy',      // shower rain
      '10d': 'rainy',      // rain day
      '10n': 'rainy',      // rain night
      '11d': 'stormy',     // thunderstorm
      '11n': 'stormy',     // thunderstorm
      '13d': 'snowy',      // snow
      '13n': 'snowy',      // snow
      '50d': 'foggy',      // mist
      '50n': 'foggy',      // mist
    }

    return iconMap[apiIcon] || 'partly-cloudy'
  }

  // Demo/fallback data for when API is not available
  getDemoWeatherData(): WeatherData {
    return {
      location: 'Berlin',
      country: 'Deutschland',
      temperature: 22,
      condition: 'Teilweise bewölkt',
      icon: 'partly-cloudy',
      humidity: 65,
      windSpeed: 12,
      pressure: 1013,
      uvIndex: 5,
      visibility: 10,
      feelsLike: 24,
      updatedAt: new Date().toISOString()
    }
  }

  getDemoForecast(): WeatherForecast[] {
    return [
      { date: '2025-09-19', dayName: 'Morgen', maxTemp: 25, minTemp: 15, condition: 'Sonnig', icon: 'sunny', precipitation: 0 },
      { date: '2025-09-20', dayName: 'Freitag', maxTemp: 23, minTemp: 14, condition: 'Bewölkt', icon: 'cloudy', precipitation: 20 },
      { date: '2025-09-21', dayName: 'Samstag', maxTemp: 19, minTemp: 12, condition: 'Regen', icon: 'rainy', precipitation: 80 },
      { date: '2025-09-22', dayName: 'Sonntag', maxTemp: 21, minTemp: 13, condition: 'Teilweise bewölkt', icon: 'partly-cloudy', precipitation: 10 }
    ]
  }
}

export const weatherService = new WeatherService()