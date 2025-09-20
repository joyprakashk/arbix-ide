"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Download,
  Star,
  Shield,
  Code,
  Database,
  Coins,
  Vote,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const libraries = [
  {
    name: "ArbixToken",
    description:
      "Production-ready ERC-20 token implementation with advanced features including permit functionality, flash minting capabilities, and comprehensive access controls",
    version: "v2.1.0",
    downloads: "15.2k",
    stars: 342,
    audited: true,
    auditFirm: "OpenZeppelin",
    category: "Tokens",
    icon: Coins,
    gasOptimized: true,
    lastUpdated: "2024-01-15",
    features: ["EIP-2612 Permit", "Flash Minting", "Role-based Access", "Pausable Operations"],
  },
  {
    name: "ArbixNFT",
    description:
      "Complete NFT marketplace smart contract suite with royalty management, batch operations, and cross-chain compatibility for enterprise NFT applications",
    version: "v1.8.3",
    downloads: "8.7k",
    stars: 198,
    audited: true,
    auditFirm: "Consensys Diligence",
    category: "NFTs",
    icon: Database,
    gasOptimized: true,
    lastUpdated: "2024-01-10",
    features: ["EIP-2981 Royalties", "Batch Minting", "Metadata Management", "Marketplace Integration"],
  },
  {
    name: "ArbixDeFi",
    description:
      "Comprehensive DeFi protocol templates including AMM, lending pools, yield farming, and governance mechanisms optimized for Arbitrum's Layer 2 architecture",
    version: "v3.0.1",
    downloads: "12.1k",
    stars: 267,
    audited: true,
    auditFirm: "Trail of Bits",
    category: "DeFi",
    icon: Code,
    gasOptimized: true,
    lastUpdated: "2024-01-20",
    features: ["AMM Protocol", "Lending Pools", "Yield Farming", "Flash Loans"],
  },
  {
    name: "ArbixDAO",
    description:
      "Advanced governance and DAO management contracts with proposal systems, voting mechanisms, treasury management, and multi-signature capabilities",
    version: "v1.5.2",
    downloads: "6.3k",
    stars: 156,
    audited: false,
    auditFirm: null,
    category: "Governance",
    icon: Vote,
    gasOptimized: false,
    lastUpdated: "2024-01-05",
    features: ["Proposal System", "Voting Mechanisms", "Treasury Management", "Multi-sig Support"],
  },
  {
    name: "ArbixBridge",
    description:
      "Cross-chain bridge infrastructure with secure token transfers, message passing, and state synchronization between Arbitrum and Ethereum mainnet",
    version: "v2.3.0",
    downloads: "9.8k",
    stars: 223,
    audited: true,
    auditFirm: "Quantstamp",
    category: "Infrastructure",
    icon: ExternalLink,
    gasOptimized: true,
    lastUpdated: "2024-01-18",
    features: ["Token Bridging", "Message Passing", "State Sync", "Fraud Proofs"],
  },
  {
    name: "ArbixOracle",
    description:
      "Decentralized oracle network integration with price feeds, external data sources, and verifiable random functions for enterprise applications",
    version: "v1.2.1",
    downloads: "4.5k",
    stars: 134,
    audited: true,
    auditFirm: "CertiK",
    category: "Oracles",
    icon: Database,
    gasOptimized: true,
    lastUpdated: "2024-01-12",
    features: ["Price Feeds", "VRF Integration", "External APIs", "Data Verification"],
  },
]

const categories = [
  { name: "All", count: libraries.length },
  { name: "Tokens", count: libraries.filter((lib) => lib.category === "Tokens").length },
  { name: "NFTs", count: libraries.filter((lib) => lib.category === "NFTs").length },
  { name: "DeFi", count: libraries.filter((lib) => lib.category === "DeFi").length },
  { name: "Governance", count: libraries.filter((lib) => lib.category === "Governance").length },
  { name: "Infrastructure", count: libraries.filter((lib) => lib.category === "Infrastructure").length },
  { name: "Oracles", count: libraries.filter((lib) => lib.category === "Oracles").length },
]

export function LibrariesSection() {
  const { t } = useLanguage()

  return (
    <section id="libraries" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-6">{t("libraries.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            {t("libraries.subtitle")}. All libraries are thoroughly tested, gas-optimized, and designed for
            enterprise-grade applications with comprehensive documentation and professional support.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Badge
                key={category.name}
                variant="outline"
                className="px-3 py-1 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category.name} ({category.count})
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {libraries.map((library) => {
            const IconComponent = library.icon
            return (
              <Card
                key={library.name}
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          {library.name}
                          {library.audited && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {!library.audited && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {library.category}
                          </Badge>
                          {library.gasOptimized && (
                            <Badge variant="outline" className="text-xs">
                              Gas Optimized
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{library.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Features */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Key Features:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {library.features.map((feature) => (
                        <div key={feature} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="font-mono">{library.version}</span>
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        {library.downloads}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {library.stars}
                      </div>
                    </div>
                  </div>

                  {/* Audit Info */}
                  {library.audited && library.auditFirm && (
                    <div className="mb-4 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-green-800 dark:text-green-200">Audited by {library.auditFirm}</span>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Button size="sm" className="flex-1">
                      <Download className="h-3 w-3 mr-1" />
                      Install
                    </Button>
                    <Button size="sm" variant="outline">
                      <BookOpen className="h-3 w-3 mr-1" />
                      Docs
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      GitHub
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-background rounded-xl p-8 border-2 border-primary/10">
            <h3 className="text-2xl font-semibold mb-4">Need Custom Smart Contracts?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our team of expert blockchain developers can create custom smart contract solutions tailored to your
              specific business requirements with full audit and deployment support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Request Custom Development</Button>
              <Button size="lg" variant="outline">
                View Enterprise Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
