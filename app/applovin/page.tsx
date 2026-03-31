"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { Check, Zap, BarChart3, Layers, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ApplovinPage() {
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

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

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
              <p className="font-mono leading-7 text-xs text-card-foreground font-semibold">Official AppLovin Partner</p>
            </div>
            <div className="mb-6 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <Zap className="h-5 w-5 text-foreground" />
              <p className="text-base font-medium text-foreground md:text-lg">
                First platform to offer official AppLovin integration for full creative analysis
              </p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance font-medium">Upspring Now Integrates with AppLovin</span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                We&apos;re excited to announce our official integration with AppLovin. As a strategic technology partner, we deliver richer analysis and stronger creative intelligence for teams running on AppLovin.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={scrollToContact}
              >
                Get Started
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Partnership Image Section */}
        <section className="w-full px-6 py-16 md:px-12 lg:px-16">
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-foreground/10 shadow-2xl">
            <Image
              src="/images/applovin-partnership.png"
              alt="Upspring x AppLovin Partnership"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        </section>

        

        {/* Features Section */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="mb-16 max-w-3xl">
            <h2 className="mb-6 font-sans text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Creative-Level and Creative-Set Analysis
            </h2>
            <p className="text-lg text-foreground/80 md:text-xl">
              With the new integration, teams can analyze performance at both the creative level and the creative-set level, making it easier to understand what is driving results, identify winning patterns, and uncover new creative directions to test.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                icon: BarChart3,
                title: "Analyze AppLovin creatives",
                description: "Inside the same workflow you already use across channels",
              },
              {
                icon: Layers,
                title: "Understand what is working and why",
                description: "Get deep insights into your top-performing creatives",
              },
              {
                icon: Check,
                title: "Spot patterns across creatives",
                description: "Identify trends across creatives and creative sets",
              },
              {
                icon: ArrowRight,
                title: "Turn signals into decisions",
                description: "Transform performance data into clearer decisions and next steps",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm transition-colors hover:bg-foreground/10"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-sans text-xl font-medium text-foreground">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Get Started Section */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-md md:p-12">
              <h2 className="mb-6 font-sans text-3xl font-semibold text-foreground md:text-4xl">
                How to Get Started
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 font-mono text-sm font-semibold text-foreground">
                    1
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">Navigate to Settings</h3>
                    <p className="text-foreground/70">Go to Settings → Space → Data Sources</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 font-mono text-sm font-semibold text-foreground">
                    2
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">Connect AppLovin</h3>
                    <p className="text-foreground/70">Select Axon (AppLovin) to connect your account</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 font-mono text-sm font-semibold text-foreground">
                    3
                  </div>
                  <div>
                    <h3 className="mb-1 font-medium text-foreground">Start Analyzing</h3>
                    <p className="text-foreground/70">Begin analyzing your AppLovin creatives immediately</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ad Credits Section */}
        <section className="w-full px-6 py-12 md:px-12 lg:px-16">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-foreground/20 bg-foreground/10 p-8 text-center backdrop-blur-md">
              <h3 className="mb-3 font-sans text-2xl font-semibold text-foreground">
                AppLovin Ad Credits Available
              </h3>
              <p className="mb-6 text-foreground/80">
                As part of our partnership, eligible Upspring clients may have access to AppLovin ad credits. Reach out to learn more about this exclusive benefit.
              </p>
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={scrollToContact}
              >
                Contact Us
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-12 text-center backdrop-blur-md md:p-24">
            <h2 className="mb-6 font-sans text-4xl font-semibold leading-tight text-foreground md:text-6xl">
              The teams winning aren&apos;t louder.
              <br />
              They&apos;re sharper.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 md:text-xl">
              Early access teams are already analyzing their AppLovin creatives with Upspring. Join them and see what smarter creative intelligence looks like in practice.
            </p>
            <MagneticButton
              size="lg"
              variant="primary"
              onClick={scrollToContact}
            >
              Get Started with AppLovin
            </MagneticButton>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
