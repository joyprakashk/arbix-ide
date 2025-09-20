"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Play, Clock, Users, Award } from "lucide-react"

const courses = [
  {
    title: "Blockchain Fundamentals",
    description: "Learn the basics of blockchain technology and smart contracts",
    duration: "4 hours",
    level: "Beginner",
    students: 12500,
    rating: 4.8,
    lessons: 12,
  },
  {
    title: "Smart Contract Development",
    description: "Master Solidity and build your first smart contracts",
    duration: "8 hours",
    level: "Intermediate",
    students: 8900,
    rating: 4.9,
    lessons: 24,
  },
  {
    title: "DeFi Protocol Design",
    description: "Advanced course on building decentralized finance applications",
    duration: "12 hours",
    level: "Advanced",
    students: 3400,
    rating: 4.7,
    lessons: 36,
  },
  {
    title: "Security Best Practices",
    description: "Learn to write secure smart contracts and avoid common pitfalls",
    duration: "6 hours",
    level: "Intermediate",
    students: 5600,
    rating: 4.9,
    lessons: 18,
  },
]

const tutorials = [
  {
    title: "Building Your First DApp",
    description: "Step-by-step guide to creating a decentralized application",
    type: "Video",
    duration: "45 min",
  },
  {
    title: "Token Economics 101",
    description: "Understanding tokenomics and designing token systems",
    type: "Article",
    duration: "15 min",
  },
  {
    title: "NFT Marketplace Workshop",
    description: "Live coding session building an NFT marketplace",
    type: "Workshop",
    duration: "2 hours",
  },
  {
    title: "Gas Optimization Techniques",
    description: "Advanced techniques to reduce gas costs in smart contracts",
    type: "Video",
    duration: "30 min",
  },
]

export function LearnSection() {
  return (
    <section id="learn" className="py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Learn Blockchain Development</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Master blockchain development with our comprehensive courses and tutorials
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6">Featured Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <Card key={course.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                        <CardDescription>{course.description}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          course.level === "Beginner"
                            ? "secondary"
                            : course.level === "Intermediate"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {course.level}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {course.lessons} lessons
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                      <Button size="sm">Start Course</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Quick Tutorials</h3>
            <div className="space-y-4">
              {tutorials.map((tutorial) => (
                <Card key={tutorial.title} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{tutorial.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {tutorial.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{tutorial.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {tutorial.duration}
                      </div>
                      <Button size="sm" variant="ghost" className="h-8 px-2">
                        <Play className="h-3 w-3 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Learning Path</CardTitle>
                <CardDescription>Structured learning for all levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full bg-transparent" variant="outline">
                    Beginner Path
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Developer Path
                  </Button>
                  <Button className="w-full bg-transparent" variant="outline">
                    Expert Path
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
