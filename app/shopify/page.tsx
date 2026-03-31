"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { Check } from "lucide-react"

export default function ShopifyPage() {
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
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`shader-fixed-height fixed inset-0 z-0 transition-opacity duration-700 pointer-events-none ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
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

      <div
        className={`relative z-10 flex flex-col w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="flex min-h-[80vh] w-full flex-col justify-center px-6 pt-32 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono leading-7 text-xs text-card-foreground font-semibold">Built for Shopify Brands</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance font-medium">Your Creative Edge, Built for Shopify</span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Your all-in-one, AI-powered creative workflow - now fully integrated into your store. From competitive
                ad research to product-linked ad ideas and creative analytics.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => window.open("https://apps.shopify.com/creative-ads-ai", "_blank")}
              >
                Get Started Now
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="mb-16 max-w-3xl">
            <h2 className="mb-6 font-sans text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Turn Ads You Love into Ideas You Can Use
            </h2>
            <p className="text-lg text-foreground/80 md:text-xl">
              Upspring gives Shopify merchants a smarter way to come up with high-performing ad ideas. Just connect your
              store — and our AI turns your product catalog, competitor landscape, and brand voice into tailored
              creative insights.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Auto-detect competitors",
                description: "Based on your brand's identity and catalog",
              },
              {
                title: "Browse competitor ads",
                description: "From across platforms — all in one place",
              },
              {
                title: "Get automatic ad transcripts",
                description: "To help you analyze and ideate faster",
              },
              {
                title: "Generate tailored ad ideas",
                description: "Linked directly to your Shopify products",
              },
              {
                title: "Visualize creative data",
                description: "Faster and make smarter decisions",
              },
              {
                title: "Uncover winning strategies",
                description: "With AI-powered insights",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm transition-colors hover:bg-foreground/10"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-sans text-xl font-medium text-foreground">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-12 text-center backdrop-blur-md md:p-24">
            <h2 className="mb-6 font-sans text-4xl font-semibold leading-tight text-foreground md:text-6xl">
              Built for the AI Era.
              <br />
              Driven by ROAS.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 md:text-xl">
              SpringAI automates the work, uncovers hidden opportunities, and maximizes ROAS like nothing you've seen
              before. And we stand behind it - 100% satisfaction guaranteed.
            </p>
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={() => window.open("https://apps.shopify.com/creative-ads-ai", "_blank")}
            >
              Get Started on Shopify
            </MagneticButton>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
