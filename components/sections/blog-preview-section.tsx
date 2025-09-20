"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const featuredPosts = [
  {
    slug: "arbitrum-gas-optimization-guide",
    title: "Advanced Gas Optimization Techniques for Arbitrum Smart Contracts",
    excerpt: "Learn how to minimize gas costs and optimize your smart contracts for Arbitrum's Layer 2 environment.",
    author: "Arbix Development Team",
    date: "2024-01-15",
    readTime: "12 min read",
    category: "Development",
  },
  {
    slug: "arbitrum-stylus-introduction",
    title: "Getting Started with Arbitrum Stylus: Rust-Based Smart Contracts",
    excerpt: "Explore the power of Arbitrum Stylus and learn how to write high-performance smart contracts using Rust.",
    author: "Technical Documentation Team",
    date: "2024-01-10",
    readTime: "8 min read",
    category: "Tutorial",
  },
  {
    slug: "cross-chain-bridge-security",
    title: "Cross-Chain Bridge Security: Best Practices and Implementation",
    excerpt:
      "Understand the security considerations and implementation patterns for building secure cross-chain bridges.",
    author: "Security Research Team",
    date: "2024-01-05",
    readTime: "15 min read",
    category: "Security",
  },
]

export function BlogPreviewSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-balance">Latest from Our Blog</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Stay updated with the latest developments, tutorials, and best practices for Arbitrum blockchain
            development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <CardTitle className="text-lg leading-tight">
                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="text-sm">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span className="truncate">{post.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
                <Button asChild size="sm" variant="outline" className="w-full bg-transparent">
                  <Link href={`/blog/${post.slug}`}>Read Article</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link href="/blog">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
