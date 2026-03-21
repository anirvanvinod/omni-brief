"use client"

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { usePreferences } from '@/hooks/usePreferences'
import { cn } from '@/lib/utils'

// Mock generator for ticker data
const getMockTickerData = (ticker: string) => {
  // Deterministic mock data based on ticker string length
  const basePrice = (ticker.length * 45) + (ticker.charCodeAt(0) * 2)
  const isPositive = ticker.length % 2 === 0
  const changePct = ((ticker.charCodeAt(ticker.length - 1) % 50) / 10).toFixed(2)
  
  return {
    symbol: ticker,
    price: basePrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
    change: isPositive ? `+${changePct}%` : `-${changePct}%`,
    isPositive,
  }
}

export function MarketTicker() {
  const { preferences, isMounted } = usePreferences()

  if (!isMounted) return null

  // Fallback to defaults if user has no tickers
  const activeTickers = preferences.tickers.length > 0 
    ? preferences.tickers 
    : ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'BTC', 'ETH']

  const tickerData = activeTickers.map(getMockTickerData)

  // Double the array for seamless infinite scrolling
  const displayTickers = [...tickerData, ...tickerData, ...tickerData]

  return (
    <div className="w-full overflow-hidden border-b border-zinc-200 bg-white/50 dark:border-zinc-800 dark:bg-zinc-950/50 backdrop-blur-md">
      <div className="flex w-max animate-marquee items-center space-x-8 py-2.5 px-4">
        {displayTickers.map((item, index) => (
          <div key={`${item.symbol}-${index}`} className="flex items-center space-x-2 shrink-0">
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              {item.symbol}
            </span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {item.price}
            </span>
            <div className={cn(
              "flex items-center text-xs font-medium",
              item.isPositive ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"
            )}>
              {item.isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
