"use client"

import { Button } from "@/components/ui/button"
import { Globe, Menu, ChevronDown } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <div className="h-4 w-4 rounded-sm bg-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-primary">ARBIX</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#start" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("nav.start")}
          </a>
          <a href="#plugins" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("nav.plugins")}
          </a>
          <a href="#libraries" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("nav.libraries")}
          </a>
          <a href="#events" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("nav.events")}
          </a>
          <a href="#rewards" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("nav.rewards")}
          </a>
          <a href="#team" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            {t("nav.team")}
          </a>
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#about"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.about")}
            </a>
            <a
              href="#documentation"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.documentation")}
            </a>
            <a
              href="#git"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.git")}
            </a>
            <a
              href="#learn"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("nav.learn")}
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{language.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("es")}>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
