"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Play, Search, Bug, FileText, TestTube, GitBranch, ExternalLink, CheckCircle } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function PluginsSection() {
  const { t } = useLanguage()

  const plugins = [
    {
      id: "solidity-compiler",
      title: "Solidity Compiler",
      description: "Compiles Solidity contracts. Increases compilation speed and provides detailed error messages.",
      icon: Code,
      status: "active",
      category: "Core",
    },
    {
      id: "deploy-run",
      title: "Deploy & Run",
      description:
        "Deploy contracts to various networks and interact with deployed contracts. Records and data from transactions.",
      icon: Play,
      status: "active",
      category: "Core",
    },
    {
      id: "file-explorer",
      title: "File Explorer",
      description: "Organize files in workspaces and folders, create, delete, rename files and work.",
      icon: FileText,
      status: "active",
      category: "Core",
    },
    {
      id: "debugger",
      title: "Debugger",
      description:
        "A visual debugger that includes breakpoints and a step debugger for transactions of verified contracts.",
      icon: Bug,
      status: "active",
      category: "Core",
    },
    {
      id: "static-analyzer",
      title: "Static Analyzers",
      description: "Examines and debugs code without actually executing it. Integrates with Slither.",
      icon: Search,
      status: "active",
      category: "Analysis",
    },
    {
      id: "unit-testing",
      title: "Solidity Unit Testing",
      description: "Runs unit tests written in Solidity.",
      icon: TestTube,
      status: "active",
      category: "Testing",
    },
    {
      id: "arbixd",
      title: "Arbixd",
      description:
        "An npm package that locally connects a folder on your computer to the Arbix IDE and runs on localhost.",
      icon: GitBranch,
      status: "active",
      category: "Tools",
    },
  ]

  return (
    <section id="plugins" className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-20 left-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container relative px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">{t("plugins.title").toUpperCase()}</h2>
            <h3 className="text-2xl font-semibold text-primary mb-6">EVERYTHING IS A PLUGIN</h3>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed mb-8">
              {t("plugins.subtitle")}
            </p>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground leading-relaxed">
              The Arbix team builds all core plugins and some additional plugins, all of which are designated by the
              green checkmark. We also support teams who build plugins to allow their projects to be used inside of
              Arbix.
            </p>
          </div>

          {/* Core Plugins Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h4 className="text-xl font-semibold text-foreground">{t("plugins.featured")}</h4>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                Additional Plugins
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {plugins.map((plugin) => {
                const IconComponent = plugin.icon
                return (
                  <Card
                    key={plugin.id}
                    className="group hover:shadow-lg transition-all duration-300 border hover:border-primary/50 relative"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-sm font-semibold text-foreground leading-tight">
                              {plugin.title}
                            </CardTitle>
                          </div>
                        </div>
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-xs text-muted-foreground leading-relaxed mb-3">
                        {plugin.description}
                      </CardDescription>
                      <Badge variant="secondary" className="text-xs">
                        {plugin.category}
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Plugin Engine Section */}
          <div className="text-center">
            <h4 className="text-2xl font-bold text-foreground mb-4">Arbix Plugin Engine</h4>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground leading-relaxed mb-8">
              The Arbix Plugin Engine manages the communication between plugins. Plugin developers should read here.
              Arbix plugins use bootstrap and should adhere to our UI Standards.
            </p>
            <p className="mx-auto max-w-3xl text-base text-muted-foreground leading-relaxed mb-8">
              Any project that wants to use our plugins can implement the Arbix Plugin Engine. See our external projects
              here. Currently how Arbix Plugin Engine is used in the Arbix IDE and how it can be used in your project.
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Button variant="default">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </Button>
              <Button variant="outline">
                <GitBranch className="mr-2 h-4 w-4" />
                Arbix Plugin
              </Button>
            </div>
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Button size="lg" className="px-8">
              View All
              <span className="ml-2 text-xs bg-primary-foreground/20 px-2 py-1 rounded">
                View all plugins on GitHub
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
