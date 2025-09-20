import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Download, ExternalLink } from "lucide-react"

export function IdeSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">ARBIX IDE</h2>
            <h3 className="text-2xl font-semibold text-primary mb-6">START HERE!</h3>
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
              Arbix IDE is a no-setup tool with a GUI for developing smart contracts. Used by experts and beginners
              alike, Arbix will get you going in double time. Arbix plays well with other tools, and allows for a simple
              deployment process to the chain of your choice. Arbix is famous for its visual debugger. Arbix is the
              place everyone comes to learn Ethereum.
            </p>
          </div>

          {/* IDE Options Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Arbix Online IDE */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-primary">Arbix Online IDE</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Web-based Development</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Arbix Online IDE is a powerful toolset for developing, deploying and administering smart contracts.
                  Features a rich debugger, Solidity static analysis, a test runner and much more.
                </p>
                <Button className="w-full" variant="default">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Start coding online
                </Button>
              </CardContent>
            </Card>

            {/* Arbix Desktop IDE */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                  <Download className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl font-bold text-secondary">Arbix Desktop IDE</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Electron App</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  For users who prefer the performance of a native application, or who want to use Arbix in desktop app.
                  Your files are saved directly to your computer's filesystem.
                </p>
                <Button className="w-full" variant="secondary">
                  <Download className="mr-2 h-4 w-4" />
                  Get desktop App
                </Button>
              </CardContent>
            </Card>

            {/* Arbixd */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                    <span className="text-accent-foreground font-mono text-sm font-bold">CLI</span>
                  </div>
                </div>
                <CardTitle className="text-xl font-bold text-accent">Arbixd</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Our CLI Tool</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Arbixd connects Arbix Online with a folder on your computer, allowing you to edit files in your
                  favorite editor while taking advantage of all of Arbix's features.
                </p>
                <Button className="w-full bg-transparent" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open CLI Tool
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              All versions of Arbix IDE support the same features and are constantly updated with the latest tools and
              plugins.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
