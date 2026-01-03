import { Suspense } from 'react'
import { Card, Title, Text, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'
import { VerifyOverview } from '@/components/tools/verify/overview'
import { VerifyScans } from '@/components/tools/verify/scans'
import { VerifyFindings } from '@/components/tools/verify/findings'

export const metadata = {
  title: 'VerifyIQ',
  description: 'Infrastructure verification and security scanning',
}

export default function VerifyPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[--text] flex items-center gap-2">
            <span>🔍</span> VerifyIQ
          </h1>
          <p className="text-[--text-light] mt-1">
            Infrastructure verification, security scanning, and drift detection.
          </p>
        </div>
        
        {/* CLI Command Hint */}
        <div className="hidden lg:block">
          <code className="text-xs bg-[--code-bg] text-[--code-text] px-3 py-2 rounded font-mono">
            infraiq verify scan --provider aws --sync
          </code>
        </div>
      </div>
      
      {/* Tabs */}
      <TabGroup>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Scans</Tab>
          <Tab>Findings</Tab>
        </TabList>
        
        <TabPanels>
          {/* Overview Tab */}
          <TabPanel>
            <div className="mt-6">
              <Suspense fallback={<LoadingSkeleton />}>
                <VerifyOverview />
              </Suspense>
            </div>
          </TabPanel>
          
          {/* Scans Tab */}
          <TabPanel>
            <div className="mt-6">
              <Suspense fallback={<LoadingSkeleton />}>
                <VerifyScans />
              </Suspense>
            </div>
          </TabPanel>
          
          {/* Findings Tab */}
          <TabPanel>
            <div className="mt-6">
              <Suspense fallback={<LoadingSkeleton />}>
                <VerifyFindings />
              </Suspense>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-32 bg-[--bg-alt] rounded-lg animate-pulse" />
      <div className="h-64 bg-[--bg-alt] rounded-lg animate-pulse" />
    </div>
  )
}
