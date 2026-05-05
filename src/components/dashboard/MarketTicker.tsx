"use client"

import React from 'react'
import { usePreferences } from '@/hooks/usePreferences'

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
    <div className="sticky top-[128px] z-30 w-full overflow-hidden whitespace-nowrap border-b-4 border-black bg-black py-3 text-white dark:border-white md:pl-64">
      <div className="flex animate-marquee gap-12 font-label text-sm uppercase tracking-widest">
        {displayTickers.map((item, index) => (
          <span key={`${item.symbol}-${index}`} className="flex gap-2">
            {item.symbol}{" "}
            <span className={item.isPositive ? "text-green-400" : "text-red-500"}>
              {item.price} ({item.change})
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
