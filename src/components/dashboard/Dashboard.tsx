"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RefreshCw, Headphones, AlertCircle, Loader2 } from 'lucide-react'
import { usePreferences } from '@/hooks/usePreferences'
import { useNativeTTS } from '@/hooks/useNativeTTS'
import { getStaticBrief } from '@/data/briefs'
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
      const nextStories = await getStaticBrief(activeCats, preferences.tone)
      setStories(nextStories)
    } catch (err: unknown) {
      console.error(err)
      const errorMessage = err instanceof Error ? err.message : "We couldn't fetch your brief right now.";
      setError(errorMessage)
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
    <div className="flex min-h-[calc(100vh-4rem)] flex-col w-full relative pb-24 bg-background dark:bg-black md:pl-64">
      <MarketTicker />
      
      <main className="mx-auto w-full max-w-5xl p-6 md:p-12 mb-24">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="space-y-4">
              <h2 className="font-headline font-black text-5xl md:text-8xl tracking-tighter uppercase leading-none text-black dark:text-white">
                Your Daily<br />Brief
              </h2>
              <p className="font-label font-bold text-xl text-primary-fixed opacity-80 uppercase tracking-tight dark:text-red-500">
                {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} / THE PRECISION UPDATE
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => fetchBrief()}
                disabled={isLoading}
                className="inline-flex h-14 items-center justify-center border-4 border-black bg-white px-6 text-sm font-black uppercase tracking-[0.2em] text-black transition-all hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:text-white"
              >
                <RefreshCw className={`mr-2 h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                UPDATE
              </button>
              
              {supported && stories.length > 0 && (
                <button
                  onClick={handleListen}
                  className="inline-flex h-14 items-center justify-center border-4 border-black bg-primary px-6 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white"
                >
                  <Headphones className="mr-2 h-5 w-5" />
                  LISTEN
                </button>
              )}
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-6">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-black uppercase tracking-[0.3em] text-black/20 dark:text-white/20 animate-pulse">Syncing Neural Data</p>
          </div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center border-4 border-black bg-white p-12 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black"
          >
            <AlertCircle className="mb-6 h-12 w-12 text-error" />
            <h3 className="mb-4 text-4xl font-black uppercase tracking-tighter text-black dark:text-white">System Failure</h3>
            <p className="mb-10 text-xl font-bold uppercase tracking-tight text-black/40 dark:text-white/40">{error}</p>
            <button
              onClick={() => fetchBrief()}
              className="border-4 border-black bg-black px-10 py-5 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:border-white"
            >
              Restart Connection
            </button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {stories.map((story, index) => (
              <div key={story.id || index} className={index === 0 ? "md:col-span-2" : ""}>
                <NewsCard article={story} />
              </div>
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
