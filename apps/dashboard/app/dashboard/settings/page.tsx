'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'
import { Copy, Eye, EyeOff, Check } from 'lucide-react'
import { upsertUser, getUserStats, User, UserStats } from '@/lib/api'

export default function SettingsPage() {
  const { user: clerkUser, isLoaded, isSignedIn } = useUser()
  const [user, setUser] = useState<User | null>(null)
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showKey, setShowKey] = useState(false)

  useEffect(() => {
    async function fetchData() {
      if (!isLoaded) return
      
      if (!isSignedIn || !clerkUser) {
        setUser(null)
        setStats(null)
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        
        const email = clerkUser.primaryEmailAddress?.emailAddress
        if (!email) {
          throw new Error('No email address found')
        }

        const name = [clerkUser.firstName, clerkUser.lastName]
          .filter(Boolean)
          .join(' ') || null

        // Fetch user data
        const syncedUser = await upsertUser(clerkUser.id, email, name ?? undefined)
        setUser(syncedUser)

        // Fetch stats
        const userStats = await getUserStats(clerkUser.id)
        setStats(userStats)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [clerkUser, isLoaded, isSignedIn])

  const copyApiKey = async () => {
    if (!user?.api_key) return
    await navigator.clipboard.writeText(user.api_key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[--text]">Settings</h1>
          <p className="text-[--text-light] mt-1">Manage your account and API access</p>
        </div>
        <div className="animate-pulse space-y-6">
          <div className="h-40 bg-[--bg-alt] rounded-lg"></div>
          <div className="h-48 bg-[--bg-alt] rounded-lg"></div>
          <div className="h-32 bg-[--bg-alt] rounded-lg"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[--text]">Settings</h1>
          <p className="text-[--text-light] mt-1">Manage your account and API access</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
          Error loading user data: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[--text]">Settings</h1>
        <p className="text-[--text-light] mt-1">Manage your account and API access</p>
      </div>

      {/* Account Info */}
      <section>
        <h2 className="text-lg font-semibold text-[--text] mb-4">Account</h2>
        <div className="bg-[--card-bg] border border-[--border] rounded-lg p-6 space-y-4">
          <div>
            <label className="text-sm text-[--text-light]">Email</label>
            <p className="text-[--text]">{user?.email}</p>
          </div>
          <div>
            <label className="text-sm text-[--text-light]">Name</label>
            <p className="text-[--text]">{user?.name || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm text-[--text-light]">Plan</label>
            <div className="flex items-center gap-2">
              <span className="capitalize text-[--text]">{user?.tier}</span>
              {user?.tier === 'trial' && user?.trial_days_remaining > 0 && (
                <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">
                  {user.trial_days_remaining} days left
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* API Key */}
      <section>
        <h2 className="text-lg font-semibold text-[--text] mb-4">API Key</h2>
        <div className="bg-[--card-bg] border border-[--border] rounded-lg p-6">
          <p className="text-sm text-[--text-light] mb-4">
            Use this API key to authenticate CLI commands and API requests.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[--bg] border border-[--border] rounded-lg px-4 py-3 font-mono text-sm text-[--text] overflow-hidden">
              {showKey ? user?.api_key : '•'.repeat(40)}
            </div>
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-3 bg-[--bg-alt] border border-[--border] rounded-lg hover:bg-[--border] transition-colors text-[--text]"
              title={showKey ? 'Hide' : 'Show'}
            >
              {showKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            <button
              onClick={copyApiKey}
              className="p-3 bg-[--primary] text-white rounded-lg hover:opacity-90 transition-opacity"
              title="Copy"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>

          <div className="mt-4 p-4 bg-[--bg] rounded-lg">
            <p className="text-sm text-[--text-light] mb-2">Configure your CLI:</p>
            <code className="text-sm font-mono text-[--primary]">
              infraiq sync configure --api-key {showKey ? user?.api_key : 'YOUR_API_KEY'}
            </code>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-lg font-semibold text-[--text] mb-4">Usage</h2>
        <div className="bg-[--card-bg] border border-[--border] rounded-lg p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-[--text-light]">Scans Today</label>
              <p className="text-2xl font-bold text-[--text]">{stats?.scans_today ?? 0}</p>
            </div>
            <div>
              <label className="text-sm text-[--text-light]">Scans This Month</label>
              <p className="text-2xl font-bold text-[--text]">{stats?.scans_this_month ?? 0}</p>
            </div>
            <div>
              <label className="text-sm text-[--text-light]">Total Scans</label>
              <p className="text-2xl font-bold text-[--text]">{stats?.scans_total ?? 0}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
