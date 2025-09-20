"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Coins, Gift, Star, Zap } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const rewards = [
  {
    title: "Plugin Developer",
    description: "Create and maintain plugins for the Arbix ecosystem",
    reward: "500-2000 ARB",
    difficulty: "Medium",
    category: "Development",
    icon: Zap,
  },
  {
    title: "Bug Bounty Hunter",
    description: "Find and report security vulnerabilities",
    reward: "100-5000 ARB",
    difficulty: "Hard",
    category: "Security",
    icon: Star,
  },
  {
    title: "Community Ambassador",
    description: "Help grow the Arbix community through content and events",
    reward: "200-800 ARB",
    difficulty: "Easy",
    category: "Community",
    icon: Gift,
  },
  {
    title: "Documentation Writer",
    description: "Improve and expand Arbix documentation",
    reward: "150-600 ARB",
    difficulty: "Easy",
    category: "Content",
    icon: Coins,
  },
]

const leaderboard = [
  { name: "Alex Chen", points: 15420, rank: 1 },
  { name: "Sarah Johnson", points: 12890, rank: 2 },
  { name: "Mike Rodriguez", points: 11250, rank: 3 },
  { name: "Emma Wilson", points: 9870, rank: 4 },
  { name: "David Kim", points: 8640, rank: 5 },
]

export function RewardsSection() {
  const { t } = useLanguage()

  return (
    <section id="rewards" className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("rewards.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("rewards.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-6">Available Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rewards.map((reward) => {
                const IconComponent = reward.icon
                return (
                  <Card key={reward.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <IconComponent className="h-5 w-5 text-primary" />
                            {reward.title}
                          </CardTitle>
                          <CardDescription className="mt-2">{reward.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{reward.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-lg font-semibold text-primary">{reward.reward}</div>
                        <Badge
                          variant={
                            reward.difficulty === "Easy"
                              ? "secondary"
                              : reward.difficulty === "Medium"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {reward.difficulty}
                        </Badge>
                      </div>
                      <Button size="sm" className="w-full">
                        Start Task
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Leaderboard</h3>
            <Card>
              <CardHeader>
                <CardTitle>Top Contributors</CardTitle>
                <CardDescription>This month's top performers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <div key={user.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            user.rank === 1
                              ? "bg-yellow-100 text-yellow-800"
                              : user.rank === 2
                                ? "bg-gray-100 text-gray-800"
                                : user.rank === 3
                                  ? "bg-orange-100 text-orange-800"
                                  : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {user.rank}
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{user.points.toLocaleString()} pts</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
