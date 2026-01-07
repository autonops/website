/**
 * Tier configuration for InfraIQ tools
 */

export type Tier = 'trial' | 'free' | 'pro' | 'team' | 'enterprise' | 'beta'

export interface TierConfig {
  name: string
  price: string
  tools: string[]
  features: string[]
}

export const TIER_CONFIGS: Record<Tier, TierConfig> = {
  trial: {
    name: 'Trial',
    price: 'Free for 30 days',
    tools: ['verify', 'migrate'],
    features: ['Scan only - see value, upgrade to act'],
  },
  free: {
    name: 'Free',
    price: 'Free',
    tools: ['verify', 'migrate'],
    features: ['Scan only - see value, upgrade to act'],
  },
  pro: {
    name: 'Pro',
    price: '$499/mo',
    tools: ['verify', 'migrate', 'codify', 'comply'],
    features: ['Core workflow tools', 'Email support'],
  },
  team: {
    name: 'Team',
    price: '$2,499/mo',
    tools: ['verify', 'migrate', 'codify', 'comply', 'dataiq', 'secureiq', 'tessera'],
    features: ['All 7 tools', 'Team management', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    price: '$25,000/year',
    tools: ['verify', 'migrate', 'codify', 'comply', 'dataiq', 'secureiq', 'tessera'],
    features: ['All 7 tools', 'Kubernetes support', 'Priority support', 'SSO', 'Dedicated support'],
  },
  beta: {
    name: 'Beta',
    price: 'Beta Access',
    tools: ['verify', 'migrate', 'codify', 'comply', 'dataiq', 'secureiq', 'tessera'],
    features: ['Full access during beta'],
  },
}

export const TOOL_INFO: Record<string, {
  name: string
  fullName: string
  description: string
  icon: string
  color: string
  features: string[]
  cliCommands: string[]
  requiredTier: Tier
}> = {
  verify: {
    name: 'VerifyIQ',
    fullName: 'Infrastructure Verification',
    description: 'Scan and validate your cloud infrastructure for security issues, misconfigurations, and compliance gaps.',
    icon: '🔍',
    color: 'blue',
    features: [
      'Security vulnerability scanning',
      'Configuration drift detection',
      'Cost optimization analysis',
      'Compliance gap identification',
    ],
    cliCommands: [
      'infraiq verify scan aws --sync',
      'infraiq verify scan gcp --sync',
      'infraiq verify analyze report.json',
    ],
    requiredTier: 'trial',
  },
  migrate: {
    name: 'MigrateIQ',
    fullName: 'Cloud Migration',
    description: 'Automate cloud-to-cloud migrations with intelligent service mapping and zero-downtime strategies.',
    icon: '🚀',
    color: 'orange',
    features: [
      'Heroku to AWS migration',
      'Multi-cloud support',
      'Zero-downtime strategies',
      'Terraform generation',
    ],
    cliCommands: [
      'infraiq migrate scan heroku --app-name myapp --sync',
      'infraiq migrate map scan.json aws',
      'infraiq migrate generate plan.json --output terraform/',
    ],
    requiredTier: 'trial',
  },
  codify: {
    name: 'CodifyIQ',
    fullName: 'Infrastructure as Code',
    description: 'Transform manually-created cloud resources into production-ready Terraform configurations.',
    icon: '📝',
    color: 'purple',
    features: [
      'Discover existing resources',
      'Generate Terraform code',
      'Import scripts included',
      'Dependency mapping',
    ],
    cliCommands: [
      'infraiq codify scan aws --region us-east-1 --sync',
      'infraiq codify analyze scan.json',
      'infraiq codify generate scan.json --output ./terraform',
    ],
    requiredTier: 'pro',
  },
  comply: {
    name: 'ComplyIQ',
    fullName: 'Compliance Automation',
    description: 'Continuous compliance monitoring with automated evidence collection for SOC2, ISO27001, and HIPAA.',
    icon: '🔒',
    color: 'green',
    features: [
      'SOC2 compliance monitoring',
      'Automated evidence collection',
      'Audit-ready exports',
      'Remediation scripts',
    ],
    cliCommands: [
      'infraiq comply quickscan --sync',
      'infraiq comply scan --provider aws --framework soc2',
      'infraiq comply export --format pdf',
    ],
    requiredTier: 'pro',
  },
  dataiq: {
    name: 'DataIQ',
    fullName: 'Database Migration',
    description: 'Intelligent database migrations with zero-downtime, self-healing capabilities, and automated cutover.',
    icon: '🗄️',
    color: 'cyan',
    features: [
      'Zero-downtime migrations',
      'Self-healing engine',
      'Multi-master replication',
      'Cross-engine support',
    ],
    cliCommands: [
      'infraiq dataiq discover --source postgresql://... --sync',
      'infraiq dataiq plan --assessment discovery.json',
      'infraiq dataiq migrate --plan plan.json --self-heal',
    ],
    requiredTier: 'team',
  },
  secureiq: {
    name: 'SecureIQ',
    fullName: 'Secret Management',
    description: 'Discover, classify, and manage secrets across your infrastructure without ever exposing sensitive values.',
    icon: '🔐',
    color: 'yellow',
    features: [
      'Secret discovery',
      'Classification & mapping',
      'Migration checklists',
      'Compliance validation',
    ],
    cliCommands: [
      'infraiq secureiq scan --provider heroku --sync',
      'infraiq secureiq audit --manifest secrets.yaml --framework soc2',
      'infraiq secureiq checklist --manifest secrets.yaml --target aws',
    ],
    requiredTier: 'team',
  },
  tessera: {
    name: 'Tessera',
    fullName: 'Monolith Decomposition',
    description: 'AI-powered monolith to microservices transformation with intelligent service boundary detection.',
    icon: '🎭',
    color: 'pink',
    features: [
      'AI-powered analysis',
      'Domain-driven design',
      'Service scaffolding',
      'Migration roadmaps',
    ],
    cliCommands: [
      'infraiq tessera analyze --source ./myapp --sync',
      'infraiq tessera design --analysis analysis.json --pattern hybrid',
      'infraiq tessera craft --mosaic mosaic.yaml --framework fastapi',
    ],
    requiredTier: 'team',
  },
}

/**
 * Check if a user's tier has access to a tool
 */
export function hasToolAccess(userTier: Tier, toolId: string): boolean {
  const tierConfig = TIER_CONFIGS[userTier]
  if (!tierConfig) return false
  return tierConfig.tools.includes(toolId)
}

/**
 * Get the required tier for a tool
 */
export function getRequiredTier(toolId: string): Tier {
  return TOOL_INFO[toolId]?.requiredTier || 'pro'
}

/**
 * Get upgrade path for a tool
 */
export function getUpgradeTier(toolId: string): Tier {
  const required = getRequiredTier(toolId)
  if (required === 'trial' || required === 'free') return 'pro'
  if (required === 'pro') return 'pro'
  return 'team'
}
