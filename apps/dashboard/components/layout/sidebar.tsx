'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Shield, 
  Rocket, 
  FileCode, 
  Lock, 
  Database,
  Key,
  Puzzle,
  FolderKanban,
  Settings,
  HelpCircle,
  ExternalLink
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = {
  main: [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ],
  tools: [
    { name: 'VerifyIQ', href: '/dashboard/verify', icon: Shield, emoji: '🔍' },
    { name: 'MigrateIQ', href: '/dashboard/migrate', icon: Rocket, emoji: '🚀' },
    { name: 'CodifyIQ', href: '/dashboard/codify', icon: FileCode, emoji: '📝' },
    { name: 'ComplyIQ', href: '/dashboard/comply', icon: Lock, emoji: '🔒' },
    { name: 'DataIQ', href: '/dashboard/dataiq', icon: Database, emoji: '🗄️' },
    { name: 'SecureIQ', href: '/dashboard/secureiq', icon: Key, emoji: '🔐' },
    { name: 'Tessera', href: '/dashboard/tessera', icon: Puzzle, emoji: '🎭' },
  ],
  workspace: [
    { name: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ],
}

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-header">
        <Link href="/dashboard" className="logo">
          auton<span className="logo-accent">ops</span>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="sidebar-nav scrollbar-thin">
        {/* Main */}
        <div className="sidebar-section">
          {navigation.main.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'sidebar-link',
                pathname === item.href && 'active'
              )}
            >
              <item.icon className="sidebar-link-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Tools */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Tools</div>
          {navigation.tools.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'sidebar-link',
                pathname.startsWith(item.href) && 'active'
              )}
            >
              <span className="text-base">{item.emoji}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Workspace */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">Workspace</div>
          {navigation.workspace.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'sidebar-link',
                pathname.startsWith(item.href) && 'active'
              )}
            >
              <item.icon className="sidebar-link-icon" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-[--border]">
        <Link
          href="https://docs.autonops.io"
          target="_blank"
          className="sidebar-link"
        >
          <HelpCircle className="sidebar-link-icon" />
          <span>Documentation</span>
          <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
        </Link>
      </div>
    </aside>
  )
}
