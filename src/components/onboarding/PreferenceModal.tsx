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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-6"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="w-full max-w-lg overflow-hidden rounded-3xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
          >
            <div className="p-6 sm:p-8 space-y-8">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-black tracking-tighter text-black dark:text-white">
                  CUSTOMIZE
                </h2>
                <p className="text-base font-medium text-black/70 dark:text-white/70">
                  Tell us what you care about to build your perfect daily digest.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleToggleCategory(cat)}
                      className={cn(
                        "rounded-xl border-2 border-black dark:border-white px-4 py-2 text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600",
                        categories.includes(cat)
                          ? "bg-[#0000FF] border-[#0000FF] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] -translate-y-1"
                          : "bg-white text-black dark:bg-black dark:text-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                      )}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white">Vibe / Tone</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {AVAILABLE_TONES.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTone(t.value)}
                      className={cn(
                        "flex flex-col items-start rounded-2xl border-2 border-black dark:border-white p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600",
                        tone === t.value
                          ? "bg-black text-white dark:bg-white dark:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] -translate-y-1"
                          : "bg-white text-black dark:bg-black dark:text-white hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                      )}
                    >
                      <span className="text-base font-black uppercase tracking-tight">
                        {t.label}
                      </span>
                      <span className="mt-1 text-sm font-medium opacity-80">
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black uppercase tracking-tight text-black dark:text-white">Markets (Tickers)</h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="e.g. AAPL, BTC, TSLA (Press Enter)"
                    value={tickerInput}
                    onChange={(e) => setTickerInput(e.target.value)}
                    onKeyDown={handleAddTicker}
                    className="w-full rounded-2xl border-2 border-black bg-white px-4 py-3 font-mono text-base font-bold text-black placeholder:text-black/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0000FF] dark:border-white dark:bg-black dark:text-white dark:placeholder:text-white/40 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                  />
                  {tickers.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tickers.map((ticker) => (
                        <span
                          key={ticker}
                          className="inline-flex items-center gap-1 rounded-xl border-2 border-black bg-white px-3 py-1 font-mono text-sm font-bold text-black dark:border-white dark:bg-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                        >
                          {ticker}
                          <button
                            onClick={() => handleRemoveTicker(ticker)}
                            className="ml-1 text-black/60 hover:text-[#FF3B30] dark:text-white/60 dark:hover:text-[#FF3B30] focus-visible:outline-none"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                className="w-full rounded-2xl border-4 border-black dark:border-white bg-[#0000FF] px-4 py-4 text-lg font-black uppercase tracking-widest text-white transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-black dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] dark:focus-visible:ring-white active:translate-y-1 active:shadow-none"
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
