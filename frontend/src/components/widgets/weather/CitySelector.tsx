import React, { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Loader, X } from 'lucide-react'
import { WeatherLocation } from '../../../types/weather'
import { weatherService } from '../../../services/weatherService'

interface CitySelectorProps {
  selectedLocation: 'auto' | WeatherLocation
  onLocationChange: (location: 'auto' | WeatherLocation) => void
  onClose: () => void
}

export function CitySelector({ selectedLocation, onLocationChange, onClose }: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<WeatherLocation[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isAutoLocation, setIsAutoLocation] = useState(selectedLocation === 'auto')
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (searchQuery.length >= 2) {
      // Debounce search
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      
      searchTimeoutRef.current = setTimeout(async () => {
        setIsSearching(true)
        try {
          const results = await weatherService.searchCities(searchQuery)
          setSearchResults(results)
        } catch (error) {
          console.error('Error searching cities:', error)
          setSearchResults([])
        } finally {
          setIsSearching(false)
        }
      }, 300)
    } else {
      setSearchResults([])
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  const handleLocationSelect = (location: WeatherLocation) => {
    onLocationChange(location)
    setIsAutoLocation(false)
    onClose()
  }

  const handleAutoLocationSelect = () => {
    onLocationChange('auto')
    setIsAutoLocation(true)
    onClose()
  }

  const getDisplayName = (location: WeatherLocation) => {
    const countryNames: { [key: string]: string } = {
      'DE': 'Deutschland',
      'AT': 'Österreich', 
      'CH': 'Schweiz',
      'FR': 'Frankreich',
      'GB': 'Großbritannien',
      'NL': 'Niederlande',
      'CZ': 'Tschechien',
      'PL': 'Polen'
    }
    
    const countryName = countryNames[location.country] || location.country
    
    return location.state 
      ? `${location.name}, ${location.state}, ${countryName}`
      : `${location.name}, ${countryName}`
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Standort auswählen</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Auto Location Option */}
        <div className="mb-4">
          <button
            onClick={handleAutoLocationSelect}
            className={`w-full p-3 rounded-xl border transition-all duration-200 flex items-center space-x-3 ${
              isAutoLocation
                ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                : 'border-white/10 hover:border-white/20 text-gray-300 hover:text-white'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span>Automatisch erkennen</span>
          </button>
        </div>

        <div className="text-sm text-gray-400 mb-4 text-center">oder</div>

        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Stadt suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
          />
          {isSearching && (
            <Loader className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-64 overflow-y-auto space-y-1">
          {searchResults.length > 0 ? (
            searchResults.map((location, index) => (
              <button
                key={`${location.lat}-${location.lon}-${index}`}
                onClick={() => handleLocationSelect(location)}
                className="w-full p-3 text-left rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                  {location.name}
                </div>
                <div className="text-sm text-gray-400">
                  {location.state ? `${location.state}, ` : ''}{location.country}
                </div>
              </button>
            ))
          ) : searchQuery.length >= 2 && !isSearching ? (
            <div className="text-center py-8 text-gray-400">
              Keine Städte gefunden
            </div>
          ) : searchQuery.length < 2 ? (
            <div className="text-center py-8 text-gray-400">
              Geben Sie mindestens 2 Zeichen ein
            </div>
          ) : null}
        </div>

        {/* Current Selection */}
        {selectedLocation !== 'auto' && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="text-sm text-gray-400 mb-2">Aktuell ausgewählt:</div>
            <div className="text-white font-medium">
              {getDisplayName(selectedLocation)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}