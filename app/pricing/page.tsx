"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { PricingCard } from "@/components/pricing-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef } from "react"

const pricingPlans = [
  {
    name: "Pro",
    monthlyPrice: 149,
    yearlyPrice: 119,
    description: "Everything in Lite, plus more power for growing teams.",
    features: [
      { text: "2 seats", included: true },
      { text: "Up to $50k monthly ad spend", included: true },
      { text: "1 ad account", included: true },
      { text: "15 brands to follow", included: true },
      { text: "Limited AI creative analysis", included: true },
      { text: "Video highlights", included: true },
      { text: "Custom group reports", included: true },
      { text: "Limited AI Chat & Insights", included: true },
      { text: "Email support", included: true },
    ],
    ctaLink: "https://app.upspring.ai/auth/register?utm_campaign=home&utm_source=pricing_pro",
  },
  {
    name: "Premium",
    monthlyPrice: 499,
    yearlyPrice: 399,
    description: "Everything in Pro, plus advanced features for scaling teams.",
    isPopular: true,
    features: [
      { text: "5 seats", included: true },
      { text: "Up to $1M monthly ad spend", included: true },
      { text: "5 ad accounts", included: true },
      { text: "50 brands to follow", included: true },
      { text: "Full AI creative analysis", included: true },
      { text: "Naming conventions", included: true },
      { text: "Full AI Chat & Insights", included: true },
      { text: "Slack support", included: true },
    ],
    ctaLink: "https://app.upspring.ai/auth/register?utm_campaign=home&utm_source=pricing_premium",
  },
  {
    name: "Enterprise",
    monthlyPrice: null,
    yearlyPrice: null,
    description: "For large organizations requiring tailored solutions.",
    features: [
      { text: "Custom limits on all features", included: true },
      { text: "Separate workspaces", included: true },
      { text: "Dedicated CSM", included: true },
      { text: "Custom AI summaries by Upspring", included: true },
      { text: "Enterprise-grade security & compliance", included: true },
    ],
    ctaLink: "#contact",
    ctaText: "Let's talk",
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setShaderHeight = () => {
      if (shaderContainerRef.current && window.innerWidth < 768) {
        shaderContainerRef.current.style.height = `${window.innerHeight * 1.2}px`
      } else if (shaderContainerRef.current) {
        shaderContainerRef.current.style.height = ""
      }
    }
    setShaderHeight()
    window.addEventListener("orientationchange", setShaderHeight)
    return () => window.removeEventListener("orientationchange", setShaderHeight)
  }, [])

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 pointer-events-none ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#71b6ee"
            colorB="#ee6464"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <Header isLoaded={isLoaded} />

      <div className="relative z-10 px-6 pt-32 pb-20 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="mb-6 font-sans text-5xl tracking-tight text-foreground md:text-7xl font-medium">Pricing</h1>
            <p className="text-lg text-foreground/80 md:text-xl">
              Choose the plan that fits your team's needs and scale your creative performance.
            </p>
          </div>

          <div className="mb-12 flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-4 rounded-full border border-foreground/10 bg-foreground/5 p-1.5 backdrop-blur-md">
              <button
                onClick={() => setIsYearly(false)}
                className={`rounded-full px-8 py-2.5 text-sm font-medium transition-all ${
                  !isYearly ? "bg-foreground text-background shadow-lg" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`rounded-full px-8 py-2.5 text-sm font-medium transition-all ${
                  isYearly ? "bg-foreground text-background shadow-lg" : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Yearly
                <span className="ml-2 text-xs opacity-80">(Save 20%)</span>
              </button>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className="h-full animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PricingCard {...plan} index={index} isYearly={isYearly} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Footer id="contact" />
      </div>
    </main>
  )
}
