"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Zap, Network, Code2, Globe, TrendingUp, Building2, Award, Cpu, Database } from "lucide-react"

const features = [
  {
    icon: Network,
    title: "Arbitrum Native Architecture",
    description:
      "Purpose-built for Arbitrum development with optimized tooling, native L2 support, and seamless cross-chain functionality",
  },
  {
    icon: Shield,
    title: "Enterprise Security Framework",
    description:
      "Advanced security analysis, formal verification tools, automated audit systems, and comprehensive vulnerability detection for production-ready smart contracts",
  },
  {
    icon: Zap,
    title: "High-Performance Development",
    description:
      "Instant compilation engine, real-time debugging capabilities, optimized deployment pipelines, and intelligent code analysis for maximum developer productivity",
  },
  {
    icon: Code2,
    title: "Multi-Language Development Suite",
    description:
      "Comprehensive support for Solidity, Vyper, and Arbitrum Stylus (Rust/C++) with unified development experience and cross-language interoperability",
  },
]

const stats = [
  {
    label: "Smart Contracts Deployed",
    value: "500K+",
    icon: Code2,
    description: "Production contracts deployed across Arbitrum networks",
  },
  {
    label: "Developer Hours Saved",
    value: "2M+",
    icon: TrendingUp,
    description: "Cumulative time saved through automation and optimization",
  },
  {
    label: "Enterprise Clients",
    value: "150+",
    icon: Users,
    description: "Fortune 500 companies and leading blockchain projects",
  },
  {
    label: "Global Developer Reach",
    value: "80+",
    icon: Globe,
    description: "Countries with active Arbix development teams",
  },
]

const partnerships = [
  {
    name: "Arbitrum Foundation",
    description: "Official development partner for Arbitrum ecosystem tools and infrastructure development",
    icon: Building2,
    category: "Strategic Partner",
  },
  {
    name: "OpenZeppelin",
    description: "Integrated security libraries, audit tools, and smart contract development frameworks",
    icon: Shield,
    category: "Security Partner",
  },
  {
    name: "Chainlink Labs",
    description: "Native oracle integration, price feed support, and decentralized data infrastructure",
    icon: Network,
    category: "Infrastructure Partner",
  },
  {
    name: "The Graph Protocol",
    description: "Built-in subgraph deployment, indexing tools, and decentralized query infrastructure",
    icon: Database,
    category: "Data Partner",
  },
]

const certifications = [
  {
    title: "SOC 2 Type II Compliant",
    description: "Comprehensive security and availability controls",
    icon: Award,
  },
  {
    title: "ISO 27001 Certified",
    description: "Information security management system certification",
    icon: Shield,
  },
  {
    title: "Enterprise SLA",
    description: "99.9% uptime guarantee with 24/7 support",
    icon: Cpu,
  },
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-6">About Arbix Platform</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The enterprise-grade Arbitrum development platform trusted by leading blockchain companies and developers
            worldwide. Build, test, and deploy production-ready decentralized applications with confidence on Arbitrum's
            Layer 2 infrastructure, backed by comprehensive tooling and professional support services.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={stat.label}
                className="text-center hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm font-semibold text-foreground mb-2">{stat.label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold mb-4 text-center">Core Platform Features</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Advanced development capabilities designed for professional blockchain development teams and enterprise
            applications.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-7 w-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold mb-4 text-center">Enterprise Certifications</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Industry-standard certifications and compliance frameworks ensuring enterprise-grade security and
            reliability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => {
              const IconComponent = cert.icon
              return (
                <Card key={cert.title} className="text-center hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{cert.title}</h4>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Strategic Partnerships */}
        <div className="mb-20">
          <h3 className="text-3xl font-semibold mb-4 text-center">Strategic Partnerships</h3>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Collaborative partnerships with leading blockchain infrastructure providers and security organizations to
            deliver comprehensive development solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerships.map((partner) => {
              const IconComponent = partner.icon
              return (
                <Card
                  key={partner.name}
                  className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{partner.name}</h4>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {partner.category}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{partner.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-background rounded-xl p-8 border-2 border-primary/10">
          <h3 className="text-3xl font-semibold mb-6 text-center">Our Mission</h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground text-center leading-relaxed mb-6">
              We are dedicated to advancing the future of decentralized application development on Arbitrum through
              innovative tooling and enterprise-grade infrastructure. Our mission is to provide professional development
              environments that make Layer 2 blockchain development accessible, secure, and efficient for organizations
              of all sizes.
            </p>
            <p className="text-base text-muted-foreground text-center leading-relaxed">
              From emerging startups to Fortune 500 enterprises, Arbix empowers development teams to build scalable,
              production-ready decentralized applications that leverage Arbitrum's superior performance and
              cost-effectiveness while maintaining Ethereum's robust security guarantees and decentralization
              principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
