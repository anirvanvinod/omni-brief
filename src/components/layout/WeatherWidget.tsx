"use client"

import React, { useState, useEffect } from 'react'
import { Cloud, Sun, CloudRain, CloudLightning, Loader2 } from 'lucide-react'

export function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            // Fetch from Open-Meteo (free, no API key required)
            const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`)
            const data = await res.json()
            setWeather({
              temp: Math.round(data.current_weather.temperature),
              code: data.current_weather.weathercode
            })
            setLoading(false)
          } catch (e) {
            console.error('Weather fetch error', e)
            setError(true)
            setLoading(false)
          }
        },
        (err) => {
          console.error('Geolocation error', err)
          setError(true)
          setLoading(false)
        }
      )
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError(true)
      setLoading(false)
    }
  }, [])

  if (loading) return <Loader2 className="h-4 w-4 animate-spin text-zinc-400" />
  if (error || !weather) return null

  // Simple WMO weather code mapping
  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="h-4 w-4 text-yellow-500" />
    if (code <= 3) return <Cloud className="h-4 w-4 text-zinc-400" />
    if (code >= 51 && code <= 67) return <CloudRain className="h-4 w-4 text-blue-400" />
    if (code >= 95) return <CloudLightning className="h-4 w-4 text-purple-500" />
    return <Cloud className="h-4 w-4 text-zinc-400" />
  }

  return (
    <div className="flex items-center space-x-2 border-2 border-black bg-white px-2 py-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
      {getWeatherIcon(weather.code)}
      <span className="font-mono text-xs font-black uppercase text-black dark:text-white">{weather.temp}°</span>
    </div>
  )
}
