'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { UpgradePrompt } from './upgrade-prompt'
import { ToolPageContent } from './tool-page-content'
import { TOOL_INFO, hasToolAccess, getUpgradeTier, Tier } from '@/lib/tiers'

interface ToolPageWrapperProps {
  toolId: string
}

export function ToolPageWrapper({ toolId }: ToolPageWrapperProps) {
  const [userTier, setUserTier] = useState<Tier | null>(null)
  const [loading, setLoading] = useState(true)
  const { userId } = useAuth()

  useEffect(() => {
    async function fetchUserTier() {
      if (!userId) {
        setLoading(false)
        return
      }

      try {
        const response = await fetch('/api/user/profile')
        if (response.ok) {
          const data = await response.json()
          setUserTier(data.tier as Tier)
        } else {
          // Default to trial if can't fetch
          setUserTier('trial')
        }
      } catch (err) {
        console.error('Failed to fetch user tier:', err)
        setUserTier('trial')
      } finally {
        setLoading(false)
      }
    }

    fetchUserTier()
  }, [userId])

  const tool = TOOL_INFO[toolId]
  
  if (!tool) {
    return (
      <div className="text-center py-12">
        <p className="text-[--text-light]">Tool not found</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-48 bg-[--bg-alt] rounded animate-pulse" />
        <div className="h-4 w-96 bg-[--bg-alt] rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 bg-[--bg-alt] rounded animate-pulse" />
          <div className="h-64 bg-[--bg-alt] rounded animate-pulse" />
        </div>
      </div>
    )
  }

  // Check access
  const hasAccess = userTier ? hasToolAccess(userTier, toolId) : false

  if (!hasAccess) {
    const requiredTier = getUpgradeTier(toolId)
    return (
      <UpgradePrompt
        toolName={tool.name}
        toolDescription={tool.description}
        toolFeatures={tool.features}
        requiredTier={requiredTier}
        currentTier={userTier || 'trial'}
      />
    )
  }

  return (
    <ToolPageContent
      toolId={toolId}
      toolName={tool.name}
      toolDescription={tool.description}
      toolFeatures={tool.features}
      cliCommands={tool.cliCommands}
      docsUrl={`https://docs.autonops.io/${toolId}`}
    />
  )
}
