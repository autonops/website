import { Card, Metric, Text, Flex, ProgressBar, Grid, DonutChart, BarChart } from '@tremor/react'
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

// Placeholder data - would come from API
const securityScore = {
  score: 84,
  grade: 'B+',
  change: '+5%',
}

const issuesBySeverity = [
  { name: 'Critical', value: 2, color: 'red' },
  { name: 'High', value: 8, color: 'orange' },
  { name: 'Medium', value: 15, color: 'yellow' },
  { name: 'Low', value: 23, color: 'blue' },
]

const resourcesByType = [
  { name: 'EC2', count: 45 },
  { name: 'S3', count: 28 },
  { name: 'RDS', count: 12 },
  { name: 'Lambda', count: 67 },
  { name: 'IAM', count: 156 },
]

export async function VerifyOverview() {
  return (
    <div className="space-y-6">
      {/* Score Cards */}
      <Grid numItems={1} numItemsSm={2} numItemsLg={4} className="gap-4">
        <Card decoration="top" decorationColor="blue">
          <Flex alignItems="start">
            <div>
              <Text>Security Score</Text>
              <Metric>{securityScore.grade}</Metric>
              <Text className="mt-1">{securityScore.score}/100</Text>
            </div>
            <Shield className="h-8 w-8 text-blue-500" />
          </Flex>
          <ProgressBar value={securityScore.score} color="blue" className="mt-4" />
        </Card>
        
        <Card decoration="top" decorationColor="red">
          <Flex alignItems="start">
            <div>
              <Text>Critical Issues</Text>
              <Metric>2</Metric>
              <Text className="mt-1">Need immediate attention</Text>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="green">
          <Flex alignItems="start">
            <div>
              <Text>Resources Scanned</Text>
              <Metric>308</Metric>
              <Text className="mt-1">Across 5 services</Text>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </Flex>
        </Card>
        
        <Card decoration="top" decorationColor="gray">
          <Flex alignItems="start">
            <div>
              <Text>Last Scan</Text>
              <Metric>2h ago</Metric>
              <Text className="mt-1">AWS us-east-1</Text>
            </div>
            <Clock className="h-8 w-8 text-gray-500" />
          </Flex>
        </Card>
      </Grid>
      
      {/* Charts Row */}
      <Grid numItems={1} numItemsLg={2} className="gap-6">
        {/* Issues by Severity */}
        <Card>
          <Title>Issues by Severity</Title>
          <Text>Distribution of found issues</Text>
          <DonutChart
            className="mt-6 h-52"
            data={issuesBySeverity}
            category="value"
            index="name"
            colors={['red', 'orange', 'yellow', 'blue']}
            showAnimation
          />
        </Card>
        
        {/* Resources by Type */}
        <Card>
          <Title>Resources by Type</Title>
          <Text>AWS resources scanned</Text>
          <BarChart
            className="mt-6 h-52"
            data={resourcesByType}
            index="name"
            categories={['count']}
            colors={['blue']}
            showAnimation
          />
        </Card>
      </Grid>
      
      {/* Empty State - shown when no scans */}
      {false && (
        <Card className="text-center py-12">
          <Shield className="h-12 w-12 text-[--text-light] mx-auto mb-4" />
          <Title>No scans yet</Title>
          <Text className="mt-2 mb-6">
            Run your first security scan to see results here.
          </Text>
          <code className="text-sm bg-[--code-bg] text-[--code-text] px-4 py-2 rounded font-mono">
            infraiq verify scan --provider aws --sync
          </code>
        </Card>
      )}
    </div>
  )
}
