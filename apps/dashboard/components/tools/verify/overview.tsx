"use client";

import {
  Card,
  Title,
  Text,
  Metric,
  Flex,
  ProgressBar,
  Grid,
  DonutChart,
  AreaChart,
  Badge,
  Color,
} from "@tremor/react";

// Security score color based on value
function getScoreColor(score: number): Color {
  if (score >= 90) return "emerald";
  if (score >= 70) return "yellow";
  return "red";
}

// Sample data - will be replaced with API data
const severityData = [
  { name: "Critical", value: 3 },
  { name: "High", value: 12 },
  { name: "Medium", value: 28 },
  { name: "Low", value: 45 },
];

const trendData = [
  { date: "Jan 1", score: 72 },
  { date: "Jan 8", score: 75 },
  { date: "Jan 15", score: 71 },
  { date: "Jan 22", score: 78 },
  { date: "Jan 29", score: 82 },
  { date: "Feb 5", score: 85 },
];

const categoryScores = [
  { name: "IAM & Access", score: 92 },
  { name: "Network Security", score: 78 },
  { name: "Data Protection", score: 85 },
  { name: "Logging & Monitoring", score: 68 },
  { name: "Compliance", score: 88 },
];

export function VerifyOverview() {
  const overallScore = 85;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <Grid numItemsMd={2} numItemsLg={4} className="gap-6">
        <Card decoration="top" decorationColor={getScoreColor(overallScore)}>
          <Text>Security Score</Text>
          <Metric>{overallScore}/100</Metric>
          <Flex className="mt-2">
            <Text className="text-sm">+5 from last scan</Text>
            <Badge color="emerald" size="sm">↑ 6%</Badge>
          </Flex>
        </Card>
        
        <Card>
          <Text>Total Resources</Text>
          <Metric>1,247</Metric>
          <Text className="text-sm mt-2">Across 3 regions</Text>
        </Card>
        
        <Card>
          <Text>Open Issues</Text>
          <Metric>88</Metric>
          <Text className="text-sm mt-2">15 critical, 28 high</Text>
        </Card>
        
        <Card>
          <Text>Last Scan</Text>
          <Metric className="text-lg">2 hours ago</Metric>
          <Text className="text-sm mt-2">Duration: 4m 32s</Text>
        </Card>
      </Grid>

      {/* Charts Row */}
      <Grid numItemsMd={2} className="gap-6">
        {/* Issues by Severity */}
        <Card>
          <Title>Issues by Severity</Title>
          <Text>Distribution of found issues</Text>
          <DonutChart
            className="mt-6 h-52"
            data={severityData}
            category="value"
            index="name"
            colors={["red", "orange", "yellow", "slate"]}
            showAnimation
          />
        </Card>

        {/* Security Score Trend */}
        <Card>
          <Title>Security Score Trend</Title>
          <Text>Last 6 weeks</Text>
          <AreaChart
            className="mt-6 h-52"
            data={trendData}
            index="date"
            categories={["score"]}
            colors={["blue"]}
            showAnimation
            curveType="monotone"
          />
        </Card>
      </Grid>

      {/* Category Breakdown */}
      <Card>
        <Title>Security by Category</Title>
        <Text>Detailed breakdown of security posture</Text>
        <div className="mt-6 space-y-4">
          {categoryScores.map((category) => (
            <div key={category.name}>
              <Flex>
                <Text>{category.name}</Text>
                <Text>{category.score}%</Text>
              </Flex>
              <ProgressBar
                value={category.score}
                color={getScoreColor(category.score)}
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
