"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Clock, User, Search, Filter } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const blogPosts = [
  {
    id: 1,
    slug: "arbitrum-gas-optimization-guide",
    title: "Advanced Gas Optimization Techniques for Arbitrum Smart Contracts",
    excerpt:
      "Learn how to minimize gas costs and optimize your smart contracts for Arbitrum's Layer 2 environment with proven techniques and best practices.",
    content: "Comprehensive guide covering gas optimization strategies...",
    author: "Arbix Development Team",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "Development",
    tags: ["Gas Optimization", "Smart Contracts", "Arbitrum", "Layer 2"],
    featured: true,
  },
  {
    id: 2,
    slug: "arbitrum-stylus-introduction",
    title: "Getting Started with Arbitrum Stylus: Rust-Based Smart Contracts",
    excerpt:
      "Explore the power of Arbitrum Stylus and learn how to write high-performance smart contracts using Rust programming language.",
    content: "Introduction to Arbitrum Stylus development...",
    author: "Technical Documentation Team",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Tutorial",
    tags: ["Stylus", "Rust", "Smart Contracts", "Performance"],
    featured: false,
  },
  {
    id: 3,
    slug: "cross-chain-bridge-security",
    title: "Cross-Chain Bridge Security: Best Practices and Implementation",
    excerpt:
      "Understand the security considerations and implementation patterns for building secure cross-chain bridges on Arbitrum.",
    content: "Security best practices for cross-chain development...",
    author: "Security Research Team",
    date: "2024-01-05",
    readTime: "15 min read",
    category: "Security",
    tags: ["Security", "Cross-Chain", "Bridges", "Best Practices"],
    featured: true,
  },
  {
    id: 4,
    slug: "arbitrum-orbit-deployment",
    title: "Deploying Custom Chains with Arbitrum Orbit",
    excerpt:
      "Step-by-step guide to deploying your own custom blockchain using Arbitrum Orbit technology and infrastructure.",
    content: "Complete deployment guide for Arbitrum Orbit...",
    author: "Infrastructure Team",
    date: "2024-01-01",
    readTime: "20 min read",
    category: "Infrastructure",
    tags: ["Orbit", "Deployment", "Custom Chains", "Infrastructure"],
    featured: false,
  },
  {
    id: 5,
    slug: "defi-protocol-development",
    title: "Building DeFi Protocols on Arbitrum: Architecture and Patterns",
    excerpt:
      "Learn the architectural patterns and development strategies for building scalable DeFi protocols on Arbitrum.",
    content: "DeFi protocol development patterns and strategies...",
    author: "DeFi Development Team",
    date: "2023-12-28",
    readTime: "18 min read",
    category: "DeFi",
    tags: ["DeFi", "Protocols", "Architecture", "Development"],
    featured: false,
  },
  {
    id: 6,
    slug: "arbitrum-nitro-deep-dive",
    title: "Arbitrum Nitro: Technical Deep Dive into Layer 2 Architecture",
    excerpt:
      "Explore the technical architecture of Arbitrum Nitro and understand how it achieves high performance and low costs.",
    content: "Technical deep dive into Arbitrum Nitro architecture...",
    author: "Core Development Team",
    date: "2023-12-25",
    readTime: "25 min read",
    category: "Architecture",
    tags: ["Nitro", "Architecture", "Layer 2", "Performance"],
    featured: true,
  },
]

const categories = ["All", "Development", "Tutorial", "Security", "Infrastructure", "DeFi", "Architecture"]

export function BlogSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-balance">Arbix Development Blog</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          Stay updated with the latest developments, tutorials, and best practices for Arbitrum blockchain development.
          Learn from our team of experts and the community.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles, topics, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Filter className="h-4 w-4 mt-2 text-muted-foreground" />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Featured Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <Badge variant="outline">Featured</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-sm">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/blog/${post.slug}`}>Read Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                  <Link href={`/blog/${post.slug}`}>Read Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
