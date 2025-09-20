import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { IdeSection } from "@/components/ide-section"
import { PluginsSection } from "@/components/plugins-section"
import { Footer } from "@/components/footer"
import { LibrariesSection } from "@/components/sections/libraries-section"
import { EventsSection } from "@/components/sections/events-section"
import { RewardsSection } from "@/components/sections/rewards-section"
import { AboutSection } from "@/components/sections/about-section"
import { DocumentationSection } from "@/components/sections/documentation-section"
import { GitSection } from "@/components/sections/git-section"
import { LearnSection } from "@/components/sections/learn-section"
import { ArbitrumChatbot } from "@/components/arbitrum-chatbot"
import { BlogPreviewSection } from "@/components/sections/blog-preview-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section id="start">
          <HeroSection />
          <IdeSection />
        </section>
        <PluginsSection />
        <LibrariesSection />
        <EventsSection />
        <RewardsSection />
        <AboutSection />
        <DocumentationSection />
        <BlogPreviewSection />
        <GitSection />
        <LearnSection />
      </main>
      <Footer />
      <ArbitrumChatbot />
    </div>
  )
}
