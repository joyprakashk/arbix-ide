"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Twitter } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const team = [
  {
    name: "Alex Thompson",
    role: "Founder & CEO",
    bio: "Former Ethereum core developer with 8+ years in blockchain",
    image: "/male-ceo-headshot.png",
    social: {
      twitter: "@alexthompson",
      linkedin: "alexthompson",
      github: "alexthompson",
    },
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    bio: "Smart contract security expert and former Google engineer",
    image: "/female-cto-headshot.png",
    social: {
      twitter: "@sarahchen",
      linkedin: "sarahchen",
      github: "sarahchen",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack developer specializing in DeFi protocols",
    image: "/male-developer-headshot.png",
    social: {
      twitter: "@marcusdev",
      linkedin: "marcusrodriguez",
      github: "marcusrodriguez",
    },
  },
  {
    name: "Emily Wang",
    role: "Product Manager",
    bio: "Product strategist with experience at leading fintech companies",
    image: "/professional-headshot-female-product-manager.jpg",
    social: {
      twitter: "@emilywang",
      linkedin: "emilywang",
      github: "emilywang",
    },
  },
  {
    name: "David Kumar",
    role: "DevOps Engineer",
    bio: "Infrastructure expert ensuring scalable and secure deployments",
    image: "/professional-headshot-male-devops-engineer.jpg",
    social: {
      twitter: "@davidkumar",
      linkedin: "davidkumar",
      github: "davidkumar",
    },
  },
  {
    name: "Lisa Park",
    role: "UX Designer",
    bio: "Design leader focused on creating intuitive developer experiences",
    image: "/professional-headshot-female-ux-designer.jpg",
    social: {
      twitter: "@lisapark",
      linkedin: "lisapark",
      github: "lisapark",
    },
  },
]

export function TeamSection() {
  const { t } = useLanguage()

  return (
    <section id="team" className="py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t("team.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("team.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card key={member.name} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                </div>
                <div className="flex justify-center gap-3">
                  <a
                    href={`https://twitter.com/${member.social.twitter.replace("@", "")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://linkedin.com/in/${member.social.linkedin}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href={`https://github.com/${member.social.github}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
