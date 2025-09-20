"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Trophy, BookOpen, Code, Presentation, Coffee, Clock, DollarSign } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

const events = [
  {
    title: "Arbix Developer Summit 2024",
    description:
      "Premier annual conference featuring cutting-edge blockchain development techniques, enterprise case studies, and networking opportunities with industry leaders",
    date: "March 15-17, 2024",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    type: "Conference",
    attendees: "500+",
    status: "upcoming",
    price: "$299",
    duration: "3 days",
    icon: Presentation,
    highlights: ["Keynote Speakers", "Technical Workshops", "Networking Events", "Product Demos"],
    speakers: ["Vitalik Buterin", "Ed Felten", "Steven Goldfeder"],
    tracks: ["DeFi Innovation", "Enterprise Blockchain", "Security & Auditing", "Layer 2 Scaling"],
  },
  {
    title: "Smart Contract Security Masterclass",
    description:
      "Intensive hands-on workshop covering advanced security patterns, vulnerability assessment, and audit methodologies for production smart contracts",
    date: "February 28, 2024",
    location: "Online",
    venue: "Virtual Platform",
    type: "Workshop",
    attendees: "150",
    status: "upcoming",
    price: "$149",
    duration: "8 hours",
    icon: BookOpen,
    highlights: ["Live Coding", "Security Tools", "Audit Techniques", "Best Practices"],
    speakers: ["Trail of Bits Team", "OpenZeppelin Experts"],
    tracks: ["Vulnerability Analysis", "Formal Verification", "Gas Optimization", "Testing Strategies"],
  },
  {
    title: "Arbix Hackathon: DeFi Innovation Challenge",
    description:
      "48-hour intensive hackathon focused on building innovative DeFi protocols with mentorship from industry experts and substantial prize pool",
    date: "January 20-22, 2024",
    location: "New York, NY",
    venue: "Brooklyn Navy Yard",
    type: "Hackathon",
    attendees: "200+",
    status: "completed",
    price: "Free",
    duration: "48 hours",
    icon: Trophy,
    highlights: ["$50K Prize Pool", "Expert Mentors", "API Access", "Demo Day"],
    speakers: ["DeFi Protocol Founders", "VC Partners"],
    tracks: ["Lending Protocols", "DEX Innovation", "Yield Strategies", "Cross-chain DeFi"],
  },
  {
    title: "Arbitrum Developer Meetup - Berlin",
    description:
      "Monthly community gathering for Arbitrum developers featuring technical presentations, project showcases, and collaborative discussions",
    date: "Every 2nd Thursday",
    location: "Berlin, Germany",
    venue: "Rocket Internet Campus",
    type: "Meetup",
    attendees: "30-50",
    status: "recurring",
    price: "Free",
    duration: "3 hours",
    icon: Coffee,
    highlights: ["Tech Talks", "Project Demos", "Networking", "Food & Drinks"],
    speakers: ["Community Members", "Local Developers"],
    tracks: ["Technical Discussions", "Project Showcases", "Q&A Sessions", "Networking"],
  },
  {
    title: "Enterprise Blockchain Certification Program",
    description:
      "Comprehensive 6-week certification program covering enterprise blockchain development, architecture patterns, and deployment strategies",
    date: "April 1 - May 15, 2024",
    location: "Online + In-Person",
    venue: "Hybrid Format",
    type: "Certification",
    attendees: "100",
    status: "upcoming",
    price: "$1,299",
    duration: "6 weeks",
    icon: Code,
    highlights: ["Official Certification", "Hands-on Projects", "Industry Mentors", "Job Placement"],
    speakers: ["Enterprise Architects", "Blockchain Consultants"],
    tracks: ["Architecture Design", "Security Implementation", "Deployment Strategies", "Compliance & Governance"],
  },
  {
    title: "Arbitrum Ecosystem Demo Day",
    description:
      "Quarterly showcase event featuring the latest projects built on Arbitrum, investor presentations, and partnership announcements",
    date: "March 8, 2024",
    location: "Austin, TX",
    venue: "Austin Convention Center",
    type: "Demo Day",
    attendees: "300+",
    status: "upcoming",
    price: "$99",
    duration: "1 day",
    icon: Presentation,
    highlights: ["Project Pitches", "Investor Panel", "Partnership Announcements", "Awards Ceremony"],
    speakers: ["Project Founders", "Investor Panel"],
    tracks: ["DeFi Projects", "Gaming & NFTs", "Infrastructure", "Developer Tools"],
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
    case "completed":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
    case "recurring":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Hackathon":
      return Trophy
    case "Conference":
      return Presentation
    case "Workshop":
      return BookOpen
    case "Meetup":
      return Coffee
    case "Certification":
      return Code
    case "Demo Day":
      return Presentation
    default:
      return Calendar
  }
}

export function EventsSection() {
  const { t } = useLanguage()

  return (
    <section id="events" className="py-24">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-6">{t("events.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t("events.subtitle")}. Join our global community of developers through comprehensive learning experiences,
            networking opportunities, and hands-on technical workshops designed for professional growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {events.map((event) => {
            const IconComponent = getTypeIcon(event.type)
            return (
              <Card
                key={event.title}
                className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg leading-tight">{event.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(event.status)} variant="secondary">
                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{event.description}</CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  {/* Event Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                      <Clock className="h-4 w-4 ml-2" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {event.location} • {event.venue}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                      <DollarSign className="h-4 w-4 ml-2" />
                      <span>{event.price}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Event Highlights:</h4>
                    <div className="grid grid-cols-2 gap-1">
                      {event.highlights.map((highlight) => (
                        <div key={highlight} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-primary" />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Speakers */}
                  {event.speakers.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold mb-2">Featured Speakers:</h4>
                      <div className="flex flex-wrap gap-1">
                        {event.speakers.map((speaker) => (
                          <Badge key={speaker} variant="outline" className="text-xs">
                            {speaker}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-auto">
                    <Button size="sm" className="flex-1" disabled={event.status === "completed"}>
                      {event.status === "completed" ? "View Recap" : "Register Now"}
                    </Button>
                    <Button size="sm" variant="outline">
                      Learn More
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
            <h3 className="text-2xl font-semibold mb-4">Host an Event with Arbix</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Partner with us to organize developer events, workshops, or hackathons in your city. We provide technical
              expertise, promotional support, and resources to make your event successful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Propose an Event</Button>
              <Button size="lg" variant="outline">
                Event Partnership Program
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
