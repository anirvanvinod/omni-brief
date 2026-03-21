"use client"

import React from 'react'
import { Newspaper, TrendingUp, Bell, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const bottomItems = [
  { name: 'Daily', icon: Newspaper, color: 'bg-[#FF3B30]' },
  { name: 'Ticker', icon: TrendingUp, color: '' },
  { name: 'Alerts', icon: Bell, color: '' },
  { name: 'Profile', icon: User, color: '' },
]

export function BottomNavBar() {
  return (
    <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t-4 border-black bg-white px-4 py-3 dark:border-white dark:bg-black md:hidden">
      {bottomItems.map((item, index) => (
        <a
          key={item.name}
          href="#"
          className={cn(
            "flex flex-col items-center justify-center p-2 transition-transform active:scale-95",
            item.color ? `${item.color} text-white border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]` : "text-black dark:text-white"
          )}
        >
          <item.icon className="h-6 w-6" />
          <span className="font-label text-[10px] font-bold uppercase">{item.name}</span>
        </a>
      ))}
    </nav>
  )
}
