import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogPostSection } from "@/components/sections/blog-post-section"
import { ArbitrumChatbot } from "@/components/arbitrum-chatbot"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <BlogPostSection slug={params.slug} />
      </main>
      <Footer />
      <ArbitrumChatbot />
    </div>
  )
}
