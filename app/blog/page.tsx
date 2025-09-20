import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogSection } from "@/components/sections/blog-section"
import { ArbitrumChatbot } from "@/components/arbitrum-chatbot"

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BlogSection />
      </main>
      <Footer />
      <ArbitrumChatbot />
    </div>
  )
}
