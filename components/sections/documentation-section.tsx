"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, ExternalLink, Zap, Shield, Network, Terminal, Database, FileText } from "lucide-react"

const docCategories = [
  {
    title: "Getting Started",
    description: "Comprehensive setup and configuration guides for Arbitrum development",
    icon: BookOpen,
    articles: [
      {
        title: "Environment Setup",
        description: "Configure your development environment for Arbitrum",
        difficulty: "Beginner",
      },
      {
        title: "Network Configuration",
        description: "Connect to Arbitrum One, Nova, and testnets",
        difficulty: "Beginner",
      },
      { title: "First Smart Contract", description: "Deploy your first contract on Arbitrum", difficulty: "Beginner" },
      {
        title: "MetaMask Integration",
        description: "Configure MetaMask for Arbitrum networks",
        difficulty: "Beginner",
      },
      {
        title: "Arbix IDE Setup",
        description: "Complete IDE configuration and workspace setup",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    title: "Smart Contract Development",
    description: "Advanced smart contract development patterns and best practices",
    icon: Code,
    articles: [
      {
        title: "Solidity Optimization",
        description: "Gas optimization techniques for Arbitrum",
        difficulty: "Advanced",
      },
      { title: "Cross-Chain Messaging", description: "Implement L1-L2 communication patterns", difficulty: "Advanced" },
      { title: "Arbitrum Stylus", description: "Develop contracts in Rust and C++", difficulty: "Expert" },
      {
        title: "Security Patterns",
        description: "Security best practices and audit guidelines",
        difficulty: "Advanced",
      },
      {
        title: "Testing Strategies",
        description: "Comprehensive testing frameworks and methodologies",
        difficulty: "Intermediate",
      },
    ],
  },
  {
    title: "Deployment & Operations",
    description: "Production deployment, monitoring, and maintenance procedures",
    icon: Zap,
    articles: [
      { title: "Testnet Deployment", description: "Deploy and test on Arbitrum Goerli", difficulty: "Intermediate" },
      {
        title: "Mainnet Migration",
        description: "Production deployment checklist and procedures",
        difficulty: "Advanced",
      },
      {
        title: "Contract Verification",
        description: "Verify contracts on Arbiscan and other explorers",
        difficulty: "Intermediate",
      },
      {
        title: "Performance Monitoring",
        description: "Monitor contract performance and gas usage",
        difficulty: "Advanced",
      },
      { title: "Upgrade Patterns", description: "Implement upgradeable contract architectures", difficulty: "Expert" },
    ],
  },
  {
    title: "Advanced Integration",
    description: "Enterprise-level integrations and advanced development techniques",
    icon: Shield,
    articles: [
      { title: "Custom Gateway Integration", description: "Build custom token gateways", difficulty: "Expert" },
      { title: "MEV Protection", description: "Implement MEV protection strategies", difficulty: "Expert" },
      {
        title: "Oracle Integration",
        description: "Integrate with Chainlink and other oracles",
        difficulty: "Advanced",
      },
      { title: "DeFi Protocols", description: "Build complex DeFi applications", difficulty: "Expert" },
      { title: "Enterprise Architecture", description: "Design scalable enterprise solutions", difficulty: "Expert" },
    ],
  },
]

const apiReference = [
  {
    title: "Arbitrum RPC API",
    description: "Complete RPC API reference for Arbitrum networks",
    icon: Terminal,
    endpoints: ["eth_call", "eth_sendTransaction", "arb_getL1ToL2MessageStatus", "arb_estimateComponents"],
  },
  {
    title: "Arbix SDK",
    description: "JavaScript/TypeScript SDK for Arbitrum development",
    icon: Code,
    endpoints: ["Contract Deployment", "Cross-Chain Messaging", "Gas Estimation", "Event Monitoring"],
  },
  {
    title: "Bridge API",
    description: "Arbitrum bridge integration and token transfers",
    icon: Network,
    endpoints: ["Bridge Status", "Token Deposits", "Withdrawal Processing", "Fee Calculation"],
  },
  {
    title: "Analytics API",
    description: "Network analytics and performance metrics",
    icon: Database,
    endpoints: ["Network Stats", "Transaction Metrics", "Gas Analytics", "Performance Data"],
  },
]

const quickLinks = [
  {
    title: "Arbitrum Portal",
    description: "Official Arbitrum bridge and ecosystem tools",
    url: "https://bridge.arbitrum.io",
    category: "Official",
  },
  {
    title: "Arbitrum Documentation",
    description: "Comprehensive official documentation",
    url: "https://docs.arbitrum.io",
    category: "Official",
  },
  {
    title: "Arbiscan Explorer",
    description: "Arbitrum blockchain explorer and analytics",
    url: "https://arbiscan.io",
    category: "Tools",
  },
  {
    title: "Developer Discord",
    description: "Join the Arbitrum developer community",
    url: "#",
    category: "Community",
  },
  {
    title: "GitHub Repository",
    description: "Arbix IDE source code and contributions",
    url: "#",
    category: "Development",
  },
  {
    title: "Bug Reports",
    description: "Report issues and feature requests",
    url: "#",
    category: "Support",
  },
]

const networkInfo = [
  {
    name: "Arbitrum One",
    description: "Production network for decentralized applications with full Ethereum compatibility",
    chainId: "42161",
    rpc: "https://arb1.arbitrum.io/rpc",
    explorer: "https://arbiscan.io",
    icon: Network,
    status: "Production",
    gasToken: "ETH",
    blockTime: "~0.25s",
  },
  {
    name: "Arbitrum Goerli",
    description: "Testnet environment for development, testing, and integration",
    chainId: "421613",
    rpc: "https://goerli-rollup.arbitrum.io/rpc",
    explorer: "https://goerli.arbiscan.io",
    icon: Code,
    status: "Testnet",
    gasToken: "GoerliETH",
    blockTime: "~0.25s",
  },
  {
    name: "Arbitrum Nova",
    description: "Optimized network for gaming, social applications, and high-throughput use cases",
    chainId: "42170",
    rpc: "https://nova.arbitrum.io/rpc",
    explorer: "https://nova.arbiscan.io",
    icon: Zap,
    status: "Production",
    gasToken: "ETH",
    blockTime: "~0.25s",
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "Intermediate":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "Advanced":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
    case "Expert":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

export function DocumentationSection() {
  return (
    <section id="documentation" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Technical Documentation</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Comprehensive documentation, API references, and development guides for building production-ready
            applications on Arbitrum using the Arbix development platform.
          </p>
        </div>

        {/* Network Information */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-center mb-4">Arbitrum Networks</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Connect to Arbitrum's Layer 2 networks for different use cases and development stages.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {networkInfo.map((network) => {
              const IconComponent = network.icon
              return (
                <Card
                  key={network.name}
                  className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{network.name}</CardTitle>
                          <Badge variant={network.status === "Production" ? "default" : "secondary"} className="mt-1">
                            {network.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{network.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-muted-foreground block">Chain ID</span>
                          <span className="font-mono font-semibold">{network.chainId}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block">Block Time</span>
                          <span className="font-mono font-semibold">{network.blockTime}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground block mb-1">RPC Endpoint</span>
                        <code className="text-xs bg-muted p-2 rounded block break-all">{network.rpc}</code>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Explorer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Documentation Categories */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-center mb-4">Development Guides</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Step-by-step guides covering everything from basic setup to advanced enterprise patterns.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {docCategories.map((category) => {
              const IconComponent = category.icon
              return (
                <Card key={category.title} className="hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      {category.articles.map((article) => (
                        <div key={article.title} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-medium text-sm leading-tight">{article.title}</h4>
                            <Badge size="sm" className={`text-xs ${getDifficultyColor(article.difficulty)}`}>
                              {article.difficulty}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed mb-2">{article.description}</p>
                          <Button variant="ghost" size="sm" className="h-6 text-xs p-0 hover:bg-transparent">
                            Read Guide <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* API Reference */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold text-center mb-4">API Reference</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Complete API documentation for integrating with Arbitrum networks and Arbix development tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {apiReference.map((api) => {
              const IconComponent = api.icon
              return (
                <Card key={api.title} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{api.title}</CardTitle>
                    </div>
                    <CardDescription>{api.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {api.endpoints.map((endpoint) => (
                        <div key={endpoint} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-primary/60" />
                          <span className="text-muted-foreground">{endpoint}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4 bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      View Reference
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-3xl font-semibold text-center mb-4">Resources & Tools</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Essential tools, community resources, and external services for Arbitrum development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Card key={link.title} className="hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">{link.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {link.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{link.description}</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
