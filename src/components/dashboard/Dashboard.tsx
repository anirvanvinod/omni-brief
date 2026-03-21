"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Headphones, AlertCircle, Loader2 } from 'lucide-react'
import { usePreferences } from '@/hooks/usePreferences'
import { useNativeTTS } from '@/hooks/useNativeTTS'
import { MarketTicker } from './MarketTicker'
import { NewsCard, type NewsArticle } from './NewsCard'
import { AudioPlayer } from './AudioPlayer'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

export function Dashboard() {
  const { preferences, isMounted } = usePreferences()
  const { play, togglePause, stop, isPlaying, isPaused, supported } = useNativeTTS()

  const [stories, setStories] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAudioPlayerVisible, setIsAudioPlayerVisible] = useState(false)

  const fetchBrief = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const activeCats = preferences.categories.length > 0 ? preferences.categories : ['Tech', 'Business', 'World']
      
      const res = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: activeCats, tone: preferences.tone })
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.details || errData.error || 'Failed to fetch brief');
      }
      
      const data = await res.json()
      setStories(data.stories || [])
    } catch (err: any) {
      console.error(err)
      setError(err.message || "We couldn't fetch your brief right now.")
    } finally {
      setIsLoading(false)
    }
  }, [preferences.categories, preferences.tone])

  useEffect(() => {
    if (isMounted) {
      fetchBrief()
    }
  }, [isMounted, fetchBrief])

  if (!isMounted) return null

  const handleListen = () => {
    if (!supported) {
      alert("Text-to-Speech is not supported in this browser.")
      return
    }
    
    setIsAudioPlayerVisible(true)
    
    // Create a cohesive script for the TTS to read
    const script = `Good morning. Here is your daily brief summarized by OmniBrief. ` + 
      stories.map(s => `Story: ${s.headline}. ${s.eli5Version || s.summary}`).join(" ... Next story: ") + 
      " ... That concludes your brief for today."
    
    play(script)
  }

  const handleCloseAudio = () => {
    stop()
    setIsAudioPlayerVisible(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col w-full relative pb-24">
      <MarketTicker />
      
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:py-12">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-light tracking-tight text-zinc-900 dark:text-zinc-50">
              Good Morning.
            </h2>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              Here is your daily brief, personalized for you.
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => fetchBrief()}
              disabled={isLoading}
              className="inline-flex h-10 items-center justify-center rounded-xl bg-zinc-100 px-4 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200 disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            
            {supported && stories.length > 0 && (
              <button
                onClick={handleListen}
                className="inline-flex h-10 items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-700 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
              >
                <Headphones className="mr-2 h-4 w-4" />
                Listen
              </button>
            )}
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <p className="text-sm text-zinc-500 animate-pulse">Our AI is reading the news...</p>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/30 dark:bg-red-900/10"
          >
            <AlertCircle className="mb-3 h-8 w-8 text-red-500" />
            <h3 className="mb-1 text-lg font-medium text-red-900 dark:text-red-400">Error</h3>
            <p className="mb-4 text-sm text-red-700 dark:text-red-300">{error}</p>
            <button
              onClick={() => fetchBrief()}
              className="rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
            >
              Tap to try again
            </button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col space-y-6"
          >
            {stories.map((story, index) => (
              <NewsCard key={story.id || index} article={story} />
            ))}
          </motion.div>
        )}
      </main>

      <AudioPlayer 
        isVisible={isAudioPlayerVisible}
        isPlaying={isPlaying}
        isPaused={isPaused}
        onTogglePlayPause={togglePause}
        onClose={handleCloseAudio}
      />
    </div>
  )
}
