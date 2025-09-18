import React from 'react'
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  Droplets, 
  MapPin,
  Loader,
  AlertCircle,
  Zap
} from 'lucide-react'
import { WeatherWidgetProps, WeatherSize } from '../../types/weather'
import { useWeather } from '../../hooks/useWeather'

function getWeatherIcon(iconName: string) {
  switch (iconName) {
    case 'sunny': return <Sun className="w-full h-full text-yellow-400" />
    case 'clear-night': return <Sun className="w-full h-full text-blue-300" />
    case 'partly-cloudy': return <Cloud className="w-full h-full text-gray-300" />
    case 'cloudy': return <Cloud className="w-full h-full text-gray-400" />
    case 'rainy': return <CloudRain className="w-full h-full text-blue-400" />
    case 'snowy': return <CloudSnow className="w-full h-full text-blue-200" />
    case 'stormy': return <Zap className="w-full h-full text-yellow-300" />
    case 'foggy': return <Cloud className="w-full h-full text-gray-500" />
    default: return <Sun className="w-full h-full text-yellow-400" />
  }
}

function WeatherSmall({ config, onConfigChange }: { config: WeatherWidgetProps['config'], onConfigChange?: (config: any) => void }) {
  const { weatherData, loading, error } = useWeather(config)
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Loader className="w-6 h-6 text-gray-400 animate-spin" />
      </div>
    )
  }

  if (error || !weatherData) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-4">
        <AlertCircle className="w-6 h-6 text-red-400 mb-2" />
        <div className="text-xs text-red-400">Fehler</div>
      </div>
    )
  }
  
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-4">
      <div className="w-8 h-8 mb-1">
        {getWeatherIcon(weatherData.icon)}
      </div>
      <div className="text-lg font-bold text-white">
        {weatherData.temperature}°
      </div>
      <div className="text-xs text-gray-400 truncate w-full">
        {weatherData.location}
      </div>
    </div>
  )
}

function WeatherMedium({ config, onConfigChange }: { config: WeatherWidgetProps['config'], onConfigChange?: (config: any) => void }) {
  const { weatherData, forecast, loading, error } = useWeather(config)
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Loader className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    )
  }

  if (error || !weatherData) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-sm text-red-400">Wetterdaten nicht verfügbar</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="flex items-center space-x-4 w-full">
        {/* Aktuelle Wetter Info - links */}
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-12 h-12 flex-shrink-0">
            {getWeatherIcon(weatherData.icon)}
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-white">
              {weatherData.temperature}°
            </div>
            <div className="text-xs text-gray-400 truncate">
              {weatherData.location}
            </div>
          </div>
        </div>
        
        {/* 3-Tage Vorhersage - horizontal rechts */}
        <div className="flex space-x-3 flex-1 justify-end">
          {forecast.slice(0, 3).map((day, index) => (
            <div key={index} className="text-center min-w-0">
              <div className="text-xs text-gray-400 mb-1">{day.dayName.slice(0, 2)}</div>
              <div className="w-6 h-6 mx-auto mb-1">
                {getWeatherIcon(day.icon)}
              </div>
              <div className="text-xs text-white font-semibold">{day.maxTemp}°</div>
              <div className="text-xs text-gray-500">{day.minTemp}°</div>
              {day.precipitation > 0 && (
                <div className="text-xs text-blue-400">{day.precipitation}%</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WeatherLarge({ config, onConfigChange }: { config: WeatherWidgetProps['config'], onConfigChange?: (config: any) => void }) {
  const { weatherData, forecast, loading, error } = useWeather(config)
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="w-10 h-10 text-gray-400 animate-spin mx-auto mb-3" />
          <div className="text-sm text-gray-400">Wetterdaten werden geladen...</div>
        </div>
      </div>
    )
  }

  if (error || !weatherData) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <div className="text-sm text-red-400 mb-2">Wetterdaten nicht verfügbar</div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="h-full flex flex-col justify-center p-4">
      {/* Header mit aktueller Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12">
            {getWeatherIcon(weatherData.icon)}
          </div>
          <div>
            <div className="text-xl font-bold text-white">
              {weatherData.temperature}°
            </div>
            <div className="text-sm text-gray-400 capitalize">
              {weatherData.condition}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <MapPin className="w-3 h-3 mr-1" />
              {weatherData.location}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-sm text-gray-400 mb-1">
            Gefühlt {weatherData.feelsLike}°
          </div>
          <div className="text-xs text-gray-500">
            {new Date(weatherData.updatedAt).toLocaleTimeString('de-DE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
      
      {/* 4-Tage Vorhersage */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-sm text-gray-400 mb-3 font-medium">4-Tage Vorhersage</div>
        <div className="space-y-2">
          {forecast.slice(0, 4).map((day, index) => (
            <div key={index} className="flex items-center justify-between bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-6 h-6 flex-shrink-0">
                  {getWeatherIcon(day.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{day.dayName}</div>
                  <div className="text-xs text-gray-400 truncate capitalize">{day.condition}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 flex-shrink-0">
                {day.precipitation > 0 && (
                  <div className="flex items-center space-x-1">
                    <Droplets className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-blue-400">{day.precipitation}%</span>
                  </div>
                )}
                <div className="flex items-center space-x-1 min-w-[50px] justify-end">
                  <span className="text-sm text-gray-400">{day.minTemp}°</span>
                  <span className="text-sm font-semibold text-white">{day.maxTemp}°</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WeatherWidget({ size, config, onConfigChange }: WeatherWidgetProps) {  
  const renderContent = () => {
    switch (size) {
      case 'small':
        return <WeatherSmall config={config} onConfigChange={onConfigChange} />
      case 'medium':
        return <WeatherMedium config={config} onConfigChange={onConfigChange} />
      case 'large':
        return <WeatherLarge config={config} onConfigChange={onConfigChange} />
      default:
        return <WeatherMedium config={config} onConfigChange={onConfigChange} />
    }
  }
  
  return (
    <div className="h-full">
      {renderContent()}
    </div>
  )
}