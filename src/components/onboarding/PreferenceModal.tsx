"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { usePreferences, type Tone } from '@/hooks/usePreferences'
import { cn } from '@/lib/utils'

const AVAILABLE_CATEGORIES = ['Tech', 'Business', 'Science', 'Politics', 'Entertainment']
const AVAILABLE_TONES: { value: Tone; label: string; desc: string }[] = [
  { value: 'ELI5', label: 'ELI5', desc: 'Explain Like I\'m 5' },
  { value: 'Professional', label: 'Professional', desc: 'Brief and to the point' },
  { value: 'Witty', label: 'Witty', desc: 'Smart, engaging, and fun' },
]

export function PreferenceModal() {
  const { preferences, updatePreferences } = usePreferences()
  
  const [categories, setCategories] = useState<string[]>(preferences.categories)
  const [tone, setTone] = useState<Tone>(preferences.tone || 'Professional')
  const [tickers, setTickers] = useState<string[]>(preferences.tickers)
  const [tickerInput, setTickerInput] = useState('')

  const handleToggleCategory = (cat: string) => {
    setCategories((prev) => 
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleAddTicker = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tickerInput.trim()) {
      e.preventDefault()
      const newTicker = tickerInput.trim().toUpperCase()
      if (!tickers.includes(newTicker)) {
        setTickers([...tickers, newTicker])
      }
      setTickerInput('')
    }
  }

  const handleRemoveTicker = (tickerToRemove: string) => {
    setTickers(tickers.filter((t) => t !== tickerToRemove))
  }

  const handleSave = () => {
    updatePreferences({
      categories,
      tone,
      tickers,
      hasCompletedOnboarding: true,
    })
  }

  return (
    <AnimatePresence>
      {!preferences.hasCompletedOnboarding && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-6"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  Customize Your Feed
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Tell us what you care about to build your perfect daily digest.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleToggleCategory(cat)}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900",
                        categories.includes(cat)
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Vibe / Tone</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {AVAILABLE_TONES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={cn(
                        "flex flex-col items-start rounded-xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
                        tone === t.value
                          ? "border-blue-600 bg-blue-50/50 dark:border-blue-500 dark:bg-blue-500/10"
                          : "border-zinc-200 bg-transparent hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        tone === t.value ? "text-blue-900 dark:text-blue-400" : "text-zinc-900 dark:text-zinc-100"
                      )}>
                        {t.label}
                      </span>
                      <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-50">Markets (Tickers)</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="e.g. AAPL, BTC, TSLA (Press Enter)"
                    value={tickerInput}
                    onChange={(e) => setTickerInput(e.target.value)}
                    onKeyDown={handleAddTicker}
                    className="w-full rounded-xl border border-zinc-200 bg-transparent px-4 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 dark:border-zinc-800 dark:text-zinc-50 dark:focus-visible:ring-blue-500"
                  />
                  {tickers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tickers.map((ticker) => (
                        <span
                          key={ticker}
                          className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        >
                          {ticker}
                          <button
                            onClick={() => handleRemoveTicker(ticker)}
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 focus-visible:outline-none"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              >
                Save & Generate Digest
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}