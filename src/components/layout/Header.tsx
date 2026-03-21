"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { WeatherWidget } from "./WeatherWidget"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur supports-[backdrop-filter]:bg-zinc-50/60 dark:supports-[backdrop-filter]:bg-zinc-950/60 transition-colors duration-300">
      <div className="mx-auto max-w-5xl flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            OmniBrief
          </h1>
          <div className="flex items-center space-x-3 mt-0.5">
            <time
              dateTime={new Date().toISOString()}
              className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
            >
              {currentDate}
            </time>
            {mounted && <WeatherWidget />}
          </div>
        </div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800",
            "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400",
            "hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 dark:focus-visible:ring-zinc-300",
            "transition-colors"
          )}
          aria-label="Toggle dark mode"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )
          ) : (
            <span className="h-4 w-4" /> // placeholder to prevent layout shift
          )}
        </button>
      </div>
    </header>
  )
}