"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Newspaper, TrendingUp, Bookmark, Compass, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Brief', href: '/', icon: Newspaper },
  { name: 'Markets', href: '#', icon: TrendingUp },
  { name: 'Saved', href: '#', icon: Bookmark },
  { name: 'Explore', href: '#', icon: Compass },
  { name: 'Settings', href: '#', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-full w-64 flex-col border-r-4 border-black bg-white p-6 pt-40 dark:border-white dark:bg-black md:flex">
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 p-4 font-label text-lg font-bold transition-transform hover:translate-x-1 hover:translate-y-1",
                isActive 
                  ? "bg-[#FF3B30] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:border-white" 
                  : "text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
