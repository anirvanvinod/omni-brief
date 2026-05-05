"use client"

import React, { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Share } from 'lucide-react'
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
  const categoryLabel = article.categoryBadge || `[${article.category || 'News'}]`

  const handleShare = async () => {
    const shareText = `OmniBrief | ${article.headline}\n\n${summaryArray[0]}\n\n- Summarized by OmniBrief.`
    
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
      className="group relative flex flex-col overflow-hidden rounded-[24px] border-4 border-black bg-surface-container-lowest shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 dark:border-white dark:bg-black dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
    >
      <div className="p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full border-2 border-black bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-white dark:border-white">
            {categoryLabel}
          </span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black uppercase tracking-widest text-black/40 dark:text-white/40">
              {article.readTime}
            </span>
            <button
              type="button"
              onClick={handleShare}
              className="border-2 border-black bg-white p-2 text-black transition-all hover:bg-black hover:text-white active:translate-x-0.5 active:translate-y-0.5 dark:border-white dark:bg-black dark:text-white"
              aria-label={`Share ${article.headline}`}
            >
              <Share className="h-4 w-4" />
            </button>
          </div>
        </div>

        <h3 className="mb-4 font-headline text-3xl font-black uppercase leading-none tracking-tighter text-black dark:text-white md:text-5xl">
          {article.headline}
        </h3>

        <div className="mb-8 flex-1">
          {isEli5 ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-4 border-black bg-surface-container-high p-6 dark:border-white dark:bg-zinc-800"
            >
              <p className="font-body text-lg font-bold leading-tight tracking-tight text-on-surface-variant dark:text-white">
                {eli5Text}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {summaryArray.map((paragraph, i) => (
                <p key={i} className="font-body text-lg text-on-surface-variant dark:text-white/80 line-clamp-3">
                  {paragraph}
                </p>
              ))}
            </motion.div>
          )}
        </div>

        <button
          onClick={() => setIsEli5(!isEli5)}
          className="w-full border-4 border-black bg-white py-5 font-headline text-xl font-black uppercase tracking-widest text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none dark:border-white dark:bg-black dark:text-white dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
        >
          {isEli5 ? "SHOW FULL REPORT" : "EXPLAIN LIKE I'M 5"}
        </button>
      </div>
    </motion.article>
  )
}
