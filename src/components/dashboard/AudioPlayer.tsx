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
          className="fixed bottom-10 left-1/2 z-50 w-[95%] max-w-lg -translate-x-1/2"
        >
          <div className="flex items-center justify-between border-4 border-black bg-white p-6 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
            
            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlayPause}
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center border-2 border-black bg-black text-white transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none dark:border-white dark:bg-white dark:text-black"
            >
              {isPlaying && !isPaused ? (
                <Pause className="h-7 w-7 fill-current" />
              ) : (
                <Play className="h-7 w-7 fill-current ml-1" />
              )}
            </button>

            {/* Info and Progress */}
            <div className="mx-6 flex flex-1 flex-col">
              <span className="mb-2 flex items-center font-mono text-xs font-black uppercase tracking-[0.2em] text-black dark:text-white">
                <Headphones className="mr-2 h-4 w-4 text-[#FF3B30]" />
                Neural Broadcast: ON
              </span>
              <div className="h-4 border-2 border-black bg-[#e2e2e2] dark:border-white dark:bg-zinc-800">
                <motion.div 
                  className="h-full bg-[#FF3B30]"
                  initial={{ width: "0%" }}
                  animate={{ width: isPlaying && !isPaused ? "100%" : "0%" }}
                  transition={{ duration: 180, ease: "linear" }}
                />
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center border-2 border-black bg-white text-black transition-all hover:bg-black hover:text-white dark:border-white dark:bg-black dark:text-white dark:hover:bg-white dark:hover:text-black"
            >
              <X className="h-6 w-6" />
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}