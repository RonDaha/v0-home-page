"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { LogoCarousel } from "@/components/logo-carousel"
import { useRef, useEffect, useState } from "react"
import { Check, BarChart3, Layers, ArrowRight, Shield, TrendingUp, Sparkles } from "lucide-react"
import Image from "next/image"
import Head from "next/head"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const features = [
  {
    icon: BarChart3,
    title: "Creative-Level Analysis",
    description: "Understand performance at the individual creative level",
  },
  {
    icon: Layers,
    title: "Creative-Set Analysis",
    description: "Analyze patterns across creative sets to identify winners",
  },
  {
    icon: Sparkles,
    title: "Unified Workflow",
    description: "Analyze AppLovin alongside Meta, TikTok, and other channels",
  },
  {
    icon: TrendingUp,
    title: "Pattern Detection",
    description: "Spot winning trends and creative directions instantly",
  },
  {
    icon: ArrowRight,
    title: "Signal-to-Decision",
    description: "Transform data into clear creative decisions",
  },
  {
    icon: Shield,
    title: "Secure Partnership",
    description: "Official AppLovin technology partner status",
  },
]

const testimonials = [
  {
    name: "Andrew Watson",
    title: "Co Founder at Igloo Media",
    image: "/images/andrew.jpg",
    quote:
      "Upspring has become a core part of Igloo's creative workflow. We've already landed five new clients after showcasing Upspring in the pitch process, and internally we estimate it saves our team 30%+ of the time we used to spend on manual analysis and pulling insights. It helps us move faster, brief smarter, and make more confident creative decisions across accounts.",
  },
  {
    name: "Matt Lowenthal",
    title: "Chief Strategy Officer at Brand.co",
    image: "/images/matt.png",
    quote:
      "Upspring's smart UI makes it easy to parse performance data in real time, understand why an ad is working, and get AI-powered suggestions on what to test next. Fantastic tool for any brand or team running performance marketing",
  },
]

const faqs = [
  {
    question: "What is the AppLovin integration?",
    answer: "Upspring offers an official AppLovin integration for creative analysis. Analyze performance at both creative and creative-set levels to identify winning patterns and optimize your campaigns.",
  },
  {
    question: "How do I connect AppLovin?",
    answer: "Navigate to Settings in your Upspring dashboard, then select Data Sources and connect Axon (AppLovin). Setup takes minutes.",
  },
  {
    question: "What data can I analyze?",
    answer: "You can analyze creative-level performance, creative-set patterns, and get AI-powered recommendations for your next tests.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. As an official AppLovin partner, we maintain enterprise-grade security. Your data is encrypted and never shared with third parties.",
  },
  {
    question: "Are AppLovin ad credits available?",
    answer: "Yes. Eligible teams may have access to exclusive AppLovin credits. Contact us to learn more.",
  },
  {
    question: "Can I use this with other channels?",
    answer: "Absolutely. One of the core benefits is unified analysis across AppLovin, Meta, TikTok, Google, and more in one workflow.",
  },
]

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
}

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

  const scrollToForm = () => {
    const formSection = document.getElementById("demo-form")
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <Head>
        <title>AppLovin Creative Analytics Integration | Upspring</title>
        <meta
          name="description"
          content="Official AppLovin integration for unified creative analytics. Analyze creative-level performance and identify winning patterns across your campaigns."
        />
        <link rel="canonical" href="https://www.upspring.ai/applovin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

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
          {/* Strategic Partnership Banner */}
          <section className="w-full border-b border-foreground/10 bg-foreground/8 px-6 py-4 md:px-12 lg:px-16">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <div className="flex flex-col gap-0.5">
                  <p className="font-sans text-sm font-semibold text-foreground md:text-base">Strategic Technology Partnership</p>
                  <p className="font-mono text-xs text-foreground/60 md:text-sm">Upspring x AppLovin: Official Integration Live Now</p>
                </div>
              </div>
              <button
                onClick={() => scrollToForm()}
                className="text-foreground/70 hover:text-foreground text-sm font-medium transition-colors whitespace-nowrap"
              >
                Learn More <ArrowRight className="inline ml-1 h-4 w-4" />
              </button>
            </div>
          </section>

          {/* Hero Section */}
          <section className="flex min-h-[70vh] w-full flex-col justify-center px-6 pt-20 pb-16 md:px-12 md:pt-24 md:pb-20 lg:px-16">
            <div className="max-w-4xl">
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-4 md:gap-6">
                  <h1 className="font-sans text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
                    <span className="text-balance">AppLovin Creative Analytics</span>
                  </h1>
                  <div className="h-16 w-16 md:h-20 md:w-20 flex-shrink-0">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZBSxu0dyGucLPID8YnpczitN4eMYuE.png"
                      alt="AppLovin"
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>

              <p className="mb-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-xl">
                Analyze AppLovin creatives at the creative and creative-set level inside your unified Upspring workflow. No new dashboards. No guesswork.
              </p>

              <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
                <MagneticButton size="lg" variant="primary" onClick={scrollToForm}>
                  Book a Demo
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary">
                  Talk to Sales <ArrowRight className="ml-2 h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          </section>

          {/* Trusted By Section from Homepage */}
          <section className="w-full px-6 py-16 md:px-12 md:py-20 lg:px-16 border-t border-foreground/10">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 md:mb-16">
                <h2 className="mb-2 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  Trusted By
                </h2>
                <p className="font-mono text-sm text-foreground/60 md:text-base">/ Industry Leaders</p>
              </div>

              <div className="mb-12 md:mb-16">
                <LogoCarousel />
              </div>

              <div className="grid gap-6 md:gap-8 md:grid-cols-2">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm md:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-foreground/20 bg-foreground/10">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-sans text-sm font-medium text-foreground">{testimonial.name}</div>
                        <div className="font-mono text-xs text-foreground/60">{testimonial.title}</div>
                      </div>
                    </div>
                    <blockquote className="font-sans text-base leading-relaxed text-foreground/80 italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full px-6 py-16 md:px-12 md:py-20 lg:px-16 border-t border-foreground/10">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12 md:mb-16">
                <h2 className="mb-2 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  What You Get
                </h2>
                <p className="font-mono text-sm text-foreground/60 md:text-base">/ Core Features</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <div key={index} className="flex flex-col gap-3">
                      <Icon className="h-6 w-6 text-foreground" />
                      <h3 className="font-sans text-lg font-medium text-foreground">{feature.title}</h3>
                      <p className="text-sm text-foreground/70">{feature.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* AppLovin Ad Credits Section */}
          <section className="w-full px-6 py-16 md:px-12 md:py-20 lg:px-16 border-t border-foreground/10">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-500/10 to-red-500/5 border border-red-500/20 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="mb-4 font-sans text-2xl font-semibold text-foreground md:text-3xl">
                Exclusive AppLovin Ad Credits
              </h2>
              <p className="mb-8 text-lg text-foreground/80">
                Eligible teams unlock exclusive AppLovin ad credits as part of our strategic partnership.
              </p>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 font-sans font-medium text-foreground hover:text-foreground/80 transition-colors"
              >
                Check Eligibility <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full px-6 py-16 md:px-12 md:py-20 lg:px-16 border-t border-foreground/10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="mb-2 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  FAQ
                </h2>
                <p className="font-mono text-sm text-foreground/60">/ Common Questions</p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-foreground/10 rounded-lg overflow-hidden">
                    <details className="group cursor-pointer">
                      <summary className="flex items-center justify-between px-6 py-4 bg-foreground/5 hover:bg-foreground/10 transition-colors">
                        <h3 className="font-sans font-medium text-foreground">{faq.question}</h3>
                        <span className="text-foreground/60 group-open:rotate-180 transition-transform">
                          <ArrowRight className="h-5 w-5 -rotate-90" />
                        </span>
                      </summary>
                      <div className="px-6 py-4 border-t border-foreground/10">
                        <p className="text-foreground/70">{faq.answer}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="w-full px-6 py-16 md:px-12 md:py-20 lg:px-16 border-t border-foreground/10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="mb-6 font-sans text-4xl font-semibold text-foreground md:text-5xl">
                Ready to Analyze AppLovin Creatively
              </h2>
              <p className="mb-8 text-lg text-foreground/80 md:text-xl">
                Join early access teams using Upspring to optimize their AppLovin performance today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <MagneticButton size="lg" variant="primary" onClick={scrollToForm}>
                  Request Demo
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary">
                  Learn More
                </MagneticButton>
              </div>
            </div>
          </section>

          <Footer id="demo-form" />
        </div>
      </main>
    </>
  )
}
