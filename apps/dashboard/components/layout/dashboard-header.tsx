'use client'

import { UserButton } from '@clerk/nextjs'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardHeader() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  return (
    <header className="dashboard-header">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="text-[--text-light] hover:text-[--text]"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
        
        {/* User Button (Clerk) */}
        <UserButton 
          afterSignOutUrl="https://autonops.io"
          appearance={{
            elements: {
              avatarBox: 'w-9 h-9',
            },
          }}
        />
      </div>
    </header>
  )
}
