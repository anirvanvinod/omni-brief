"use client"

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, X, Headphones } from 'lucide-react'

interface AudioPlayerProps {
  isVisible: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  onTogglePlayPause: () => void;
  onClose: () => void;
}

export function AudioPlayer({ isVisible, isPlaying, isPaused, onTogglePlayPause, onClose }: AudioPlayerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2"
        >
          <div className="flex items-center justify-between rounded-2xl border border-zinc-200/50 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-zinc-800/50 dark:bg-zinc-900/70">
            
            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlayPause}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white transition-transform hover:scale-105 active:scale-95 dark:bg-white dark:text-zinc-900"
            >
              {isPlaying && !isPaused ? (
                <Pause className="h-5 w-5 fill-current" />
              ) : (
                <Play className="h-5 w-5 fill-current ml-1" />
              )}
            </button>

            {/* Info and Progress (Simulated for native TTS) */}
            <div className="mx-4 flex flex-1 flex-col">
              <span className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                <Headphones className="mr-1.5 h-3.5 w-3.5 text-blue-500" />
                Now Playing: Your Daily Brief
              </span>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <motion.div 
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying && !isPaused ? "100%" : "0%" }}
                  transition={{ duration: 180, ease: "linear" }} // Simulated duration
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
            >
              <X className="h-5 w-5" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}