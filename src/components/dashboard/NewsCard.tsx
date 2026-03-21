"use client"

import React, { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Globe, FileText, Sparkles, Share } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export interface NewsArticle {
  id?: string;
  categoryBadge?: string;
  category?: string; // Backwards compatible with Phase 3
  readTime: string;
  headline: string;
  summary: string | string[];
  eli5Version?: string;
  eli5?: string; // Backwards compatible with Phase 3
  sources?: string[];
}

interface NewsCardProps {
  article: NewsArticle;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
}

export function NewsCard({ article }: NewsCardProps) {
  const [isEli5, setIsEli5] = useState(false)

  // Handle data structure differences between Phase 3 mocks and Phase 4 AI output
  const summaryArray = Array.isArray(article.summary) ? article.summary : [article.summary]
  const eli5Text = article.eli5Version || article.eli5 || "Simplify unavailable."
  const categoryLabel = article.categoryBadge || `🤖 ${article.category || 'News'}`

  const handleShare = async () => {
    const shareText = `OmniBrief | ${article.headline}\n\n${summaryArray[0]}\n\n— Summarized by OmniBrief.`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.headline,
          text: shareText,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      navigator.clipboard.writeText(shareText)
      toast.success("Copied to clipboard!")
    }
  }

  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -2 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white/60 p-6 shadow-sm backdrop-blur-md transition-all hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/50"
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
          {categoryLabel}
        </span>
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          {article.readTime}
        </span>
      </div>

      {/* Headline */}
      <h3 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
        {article.headline}
      </h3>

      {/* Content */}
      <div className="mb-6 flex-1 space-y-3">
        {isEli5 ? (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className="rounded-xl bg-blue-50/50 p-4 border border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30"
          >
            <p className="text-[15px] font-medium leading-relaxed text-blue-900 dark:text-blue-200">
              {eli5Text}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {summaryArray.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800/50">
        <div className="flex -space-x-2">
          {article.sources ? (
            article.sources.slice(0, 3).map((url, i) => (
               <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-zinc-100 text-zinc-600 dark:border-zinc-900 dark:bg-zinc-800 dark:text-zinc-400">
                <Globe className="h-3.5 w-3.5" />
              </div>
            ))
          ) : (
            <>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-red-100 text-red-600 dark:border-zinc-900 dark:bg-red-900/30 dark:text-red-400">
                <Globe className="h-3.5 w-3.5" />
              </div>
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-100 text-blue-600 dark:border-zinc-900 dark:bg-blue-900/30 dark:text-blue-400">
                <FileText className="h-3.5 w-3.5" />
              </div>
            </>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            aria-label="Share story"
          >
            <Share className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsEli5(!isEli5)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              isEli5 
                ? "bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600 dark:focus-visible:ring-offset-zinc-900" 
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-900"
            )}
          >
            <Sparkles className="h-3 w-3" />
            {isEli5 ? "Read Full" : "ELI5"}
          </button>
        </div>
      </div>
    </motion.article>
  )
}
