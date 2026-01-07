'use client'

import { Card, Title, Text, Button } from '@tremor/react'
import { Lock, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import { TIER_CONFIGS, Tier } from '@/lib/tiers'

interface UpgradePromptProps {
  toolName: string
  toolDescription: string
  toolFeatures: string[]
  requiredTier: Tier
  currentTier: Tier
}

export function UpgradePrompt({
  toolName,
  toolDescription,
  toolFeatures,
  requiredTier,
  currentTier,
}: UpgradePromptProps) {
  const requiredConfig = TIER_CONFIGS[requiredTier]
  const currentConfig = TIER_CONFIGS[currentTier]

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card className="text-center">
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[--bg-alt] flex items-center justify-center">
            <Lock className="w-8 h-8 text-[--text-light]" />
          </div>
        </div>

        {/* Tool Name & Description */}
        <Title className="text-2xl mb-2">{toolName}</Title>
        <Text className="text-[--text-light] mb-8 max-w-md mx-auto">
          {toolDescription}
        </Text>

        {/* Features List */}
        <div className="text-left bg-[--bg-alt] rounded-lg p-6 mb-8">
          <Text className="font-semibold mb-4">What you get with {toolName}:</Text>
          <ul className="space-y-3">
            {toolFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-[--text-light]">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Current vs Required Tier */}
        <div className="mb-8 p-4 border border-[--border] rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <Text className="text-sm text-[--text-light]">Your current plan</Text>
              <Text className="font-semibold">{currentConfig.name}</Text>
            </div>
            <ArrowRight className="w-5 h-5 text-[--text-light]" />
            <div>
              <Text className="text-sm text-[--text-light]">Required plan</Text>
              <Text className="font-semibold text-blue-500">{requiredConfig.name}</Text>
            </div>
          </div>
        </div>

        {/* Upgrade Button */}
        <div className="space-y-4">
          <Link href="/dashboard/settings?tab=billing">
            <Button size="lg" className="w-full">
              Upgrade to {requiredConfig.name} — {requiredConfig.price}
            </Button>
          </Link>
          <Link href="https://autonops.io/pricing" target="_blank">
            <Button variant="secondary" size="lg" className="w-full">
              View All Plans
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
