"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, Star, GitFork, Download, ExternalLink } from "lucide-react"

const repositories = [
  {
    name: "arbix-core",
    description: "Core Arbix IDE and compiler infrastructure",
    language: "TypeScript",
    stars: 15420,
    forks: 2340,
    issues: 45,
    lastUpdate: "2 hours ago",
  },
  {
    name: "arbix-plugins",
    description: "Official plugin collection for Arbix IDE",
    language: "JavaScript",
    stars: 8760,
    forks: 1250,
    issues: 23,
    lastUpdate: "1 day ago",
  },
  {
    name: "arbix-contracts",
    description: "Smart contract templates and libraries",
    language: "Solidity",
    stars: 12300,
    forks: 3400,
    issues: 67,
    lastUpdate: "3 hours ago",
  },
  {
    name: "arbix-docs",
    description: "Documentation and examples",
    language: "Markdown",
    stars: 3450,
    forks: 890,
    issues: 12,
    lastUpdate: "5 hours ago",
  },
]

const contributors = [
  { name: "alexthompson", avatar: "/github-avatar-1.jpg", commits: 1240 },
  { name: "sarahchen", avatar: "/github-avatar-2.jpg", commits: 890 },
  { name: "marcusdev", avatar: "/github-avatar-3.jpg", commits: 670 },
  { name: "emilywang", avatar: "/github-avatar-4.jpg", commits: 450 },
  { name: "davidkumar", avatar: "/github-avatar-5.jpg", commits: 320 },
]

export function GitSection() {
  return (
    <section id="git" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Open Source</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Arbix is built in the open. Contribute to our repositories and help shape the future of blockchain
            development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6">Repositories</h3>
            <div className="space-y-4">
              {repositories.map((repo) => (
                <Card key={repo.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <GitBranch className="h-5 w-5 text-primary" />
                          {repo.name}
                        </CardTitle>
                        <CardDescription className="mt-2">{repo.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{repo.language}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {repo.stars.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          {repo.forks.toLocaleString()}
                        </div>
                        <span>{repo.issues} issues</span>
                        <span>Updated {repo.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View on GitHub
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                        <Download className="h-4 w-4" />
                        Clone
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Top Contributors</h3>
            <Card>
              <CardHeader>
                <CardTitle>Community Heroes</CardTitle>
                <CardDescription>Our most active contributors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributors.map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <img
                        src={contributor.avatar || "/placeholder.svg"}
                        alt={contributor.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="font-medium">{contributor.name}</div>
                        <div className="text-sm text-muted-foreground">{contributor.commits} commits</div>
                      </div>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Contribute</CardTitle>
                <CardDescription>Join our open source community</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    View Contributing Guide
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Report an Issue
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Request a Feature
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
