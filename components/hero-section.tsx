"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/hooks/use-language"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

      <div className="container relative px-4">
        <div className="mx-auto max-w-6xl">
          {/* Main heading */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6">
              <span className="text-primary">ARBIX PROJECT</span>
              <br />
              <span className="text-2xl sm:text-3xl lg:text-4xl font-normal text-muted-foreground">JUMP INTO WEB3</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed mb-8">
              Professional Arbitrum development environment with advanced smart contract tools, real-time compilation,
              and seamless deployment to Arbitrum networks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                {t("hero.getStarted")}
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                {t("hero.learnMore")}
              </Button>
            </div>
          </div>

          <div className="relative mx-auto max-w-5xl">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-W1DTZqZT5KB3slPIldJM9n0dilfAjn.png"
                alt="Arbix IDE - Professional Arbitrum Development Environment"
                className="w-full h-auto"
              />
            </Card>

            {/* Floating decoration */}
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/10 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
