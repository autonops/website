'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const commands = [
  {
    label: 'Scan AWS infrastructure',
    command: 'infraiq verify scan --provider aws --sync',
  },
  {
    label: 'Start Heroku migration',
    command: 'infraiq migrate scan heroku --app-name YOUR_APP --sync',
  },
  {
    label: 'Run compliance check',
    command: 'infraiq comply quickscan --sync',
  },
]

export function QuickActions() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  
  const copyToClipboard = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }
  
  return (
    <div className="mt-4 space-y-3">
      <p className="text-sm text-[--text-light]">
        Run these commands locally to sync new data:
      </p>
      
      {commands.map((cmd, index) => (
        <div key={index} className="space-y-1">
          <p className="text-xs text-[--text-light]">{cmd.label}</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs bg-[--code-bg] text-[--code-text] px-3 py-2 rounded font-mono overflow-x-auto">
              {cmd.command}
            </code>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0"
              onClick={() => copyToClipboard(cmd.command, index)}
            >
              {copiedIndex === index ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
