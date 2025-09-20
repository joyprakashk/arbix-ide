import { Button } from "@/components/ui/button"
import { Github, Twitter, Diamond as Discord } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Main Footer Content */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <div className="h-4 w-4 rounded-sm bg-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-primary">ARBIX</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A comprehensive blockchain development platform with IDE, plugins, and developer tools for Web3
                development.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Discord className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#online-ide"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Online IDE
                  </a>
                </li>
                <li>
                  <a
                    href="#desktop-ide"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Desktop IDE
                  </a>
                </li>
                <li>
                  <a href="#cli-tool" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    CLI Tool
                  </a>
                </li>
                <li>
                  <a href="#plugins" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Plugins
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#documentation"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#tutorials"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Examples
                  </a>
                </li>
                <li>
                  <a
                    href="#api-reference"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API Reference
                  </a>
                </li>
              </ul>
            </div>

            {/* Community */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#discord" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="#github" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="#twitter" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>© 2024 Arbix Project. All rights reserved.</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="#privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
                <a href="#cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
