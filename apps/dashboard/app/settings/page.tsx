'use client'

import { useUserSync } from '@/hooks/useUserSync'
import { useState } from 'react'

export default function SettingsPage() {
  const { user, loading, error, apiKey, tier, trialDaysRemaining } = useUserSync()
  const [copied, setCopied] = useState(false)
  const [showKey, setShowKey] = useState(false)

  const copyApiKey = async () => {
    if (!apiKey) return
    await navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="animate-pulse">
          <div className="h-4 bg-[--border] rounded w-1/4 mb-4"></div>
          <div className="h-10 bg-[--border] rounded w-1/2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-500">
          Error loading user data: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-[--text-light] mb-8">Manage your account and API access</p>

      {/* Account Info */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Account</h2>
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
              <span className="capitalize text-[--text]">{tier}</span>
              {tier === 'trial' && trialDaysRemaining > 0 && (
                <span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded">
                  {trialDaysRemaining} days left
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* API Key */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">API Key</h2>
        <div className="bg-[--card-bg] border border-[--border] rounded-lg p-6">
          <p className="text-sm text-[--text-light] mb-4">
            Use this API key to authenticate CLI commands and API requests.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[--bg] border border-[--border] rounded-lg px-4 py-3 font-mono text-sm">
              {showKey ? apiKey : '•'.repeat(32)}
            </div>
            <button
              onClick={() => setShowKey(!showKey)}
              className="px-4 py-3 bg-[--bg-alt] border border-[--border] rounded-lg hover:bg-[--border] transition-colors"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
            <button
              onClick={copyApiKey}
              className="px-4 py-3 bg-[--primary] text-white rounded-lg hover:bg-[--primary-dark] transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="mt-4 p-4 bg-[--bg] rounded-lg">
            <p className="text-sm text-[--text-light] mb-2">Configure your CLI:</p>
            <code className="text-sm font-mono text-[--primary]">
              infraiq sync configure --api-key {showKey ? apiKey : 'YOUR_API_KEY'}
            </code>
          </div>
        </div>
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Usage</h2>
        <div className="bg-[--card-bg] border border-[--border] rounded-lg p-6">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="text-sm text-[--text-light]">Scans Today</label>
              <p className="text-2xl font-bold text-[--text]">0</p>
            </div>
            <div>
              <label className="text-sm text-[--text-light]">Scans This Month</label>
              <p className="text-2xl font-bold text-[--text]">0</p>
            </div>
            <div>
              <label className="text-sm text-[--text-light]">Total Scans</label>
              <p className="text-2xl font-bold text-[--text]">0</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
