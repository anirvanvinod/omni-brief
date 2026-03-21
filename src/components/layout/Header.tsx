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
    <header className="sticky top-0 z-50 flex w-full flex-col items-center justify-center border-b-4 border-black bg-white px-6 py-8 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-black dark:text-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:pl-64">
      <div className="flex w-full max-w-5xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">cloud</span>
          <div className="flex flex-col">
            <span className="font-label text-xs font-bold uppercase tracking-widest text-primary-fixed">68°F / TOKYO</span>
            <span className="font-label text-[10px] opacity-60 uppercase">HEAVY DATA FLOW</span>
          </div>
        </div>
        
        <h1 className="font-['Inter'] text-4xl font-black uppercase tracking-tighter md:text-6xl text-center">
          OMNIBRIEF
        </h1>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-surface-container border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:active:shadow-none"
          >
            {mounted ? (
              theme === "dark" ? (
                <span className="material-symbols-outlined">light_mode</span>
              ) : (
                <span className="material-symbols-outlined">dark_mode</span>
              )
            ) : (
              <span className="material-symbols-outlined invisible">light_mode</span>
            )}
          </button>
          <button className="bg-primary border-2 border-black p-3 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none dark:bg-white dark:text-black dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:active:shadow-none">
            <span className="material-symbols-outlined">cloud</span>
          </button>
        </div>
      </div>
    </header>
  )
}
