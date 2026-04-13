"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { Check, Zap, BarChart3, Layers, ArrowRight, Shield, TrendingUp, Sparkles, ChevronRight } from "lucide-react"
import Image from "next/image"
import Head from "next/head"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LogoCarousel } from "@/components/logo-carousel"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const features = [
  {
    icon: BarChart3,
    title: "Creative-Level Analysis",
    description: "Understand the performance of each individual AppLovin creative to identify what drives results.",
  },
  {
    icon: Layers,
    title: "Creative-Set Analysis",
    description: "Analyze performance patterns across creative sets to uncover winning themes and optimize campaigns.",
  },
  {
    icon: Sparkles,
    title: "Unified Workflow",
    description: "Analyze AppLovin creatives inside the same workflow you use for Meta, TikTok, Google, and more.",
  },
  {
    icon: TrendingUp,
    title: "Pattern Detection",
    description: "Spot trends across creatives to inform your next AppLovin tests and optimization opportunities.",
  },
  {
    icon: ArrowRight,
    title: "Signal-to-Decision",
    description: "Transform raw AppLovin performance data into clear, actionable insights and next steps.",
  },
  {
    icon: Shield,
    title: "Secure Official Partnership",
    description: "Official AppLovin technology partner status ensures secure, reliable access to your analytics data.",
  },
]

const testimonials = [
  {
    name: "Andrew Watson",
    title: "Co Founder at Igloo Media",
    image: "/images/andrew.jpg",
    quote:
      "Upspring has become a core part of Igloo's creative workflow. We've already landed five new clients after showcasing Upspring in the pitch process, and internally we estimate it saves our team 30% of the time we used to spend on manual analysis and pulling insights. It helps us move faster, brief smarter, and make more confident creative decisions across accounts.",
  },
  {
    name: "Matt Lowenthal",
    title: "Chief Strategy Officer at Brand.co",
    image: "/images/matt.png",
    quote:
      "Upspring's smart UI makes it easy to parse performance data in real time, understand why an ad is working, and get AI-powered suggestions on what to test next. Fantastic tool for any brand or team running performance marketing.",
  },
  {
    name: "Tomer Arzoan",
    title: "Co-Founder at Maëlys",
    image:
      "https://cdn.prod.website-files.com/6767cd956661bd59e5a74391/67db09945cb20a822e894199_tomer-profile.jpeg?height=64&width=64",
    quote:
      "Being able to analyze AppLovin alongside our other channels in one place has been incredibly valuable for our team. Upspring gives us the clarity we needed to scale our winning creatives with confidence.",
  },
]

const faqs = [
  {
    question: "What is the Upspring AppLovin integration?",
    answer: "Upspring is the first platform to offer an official AppLovin integration for full creative analysis. This allows you to analyze performance at both the creative level and creative-set level, helping you understand what drives results and identify winning patterns.",
  },
  {
    question: "How do I connect my AppLovin account?",
    answer: "Simply navigate to Settings, select your Space, then Data Sources in your Upspring dashboard, then select Axon (AppLovin) to connect your account. The setup takes just a few minutes.",
  },
  {
    question: "What data can I analyze with this integration?",
    answer: "You can analyze creative-level performance metrics, creative-set performance, identify winning patterns across your campaigns, and get AI-powered insights to inform your next creative tests.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. As an official AppLovin technology partner, Upspring maintains the highest security standards. Your data is encrypted in transit and at rest, and we never share your data with third parties.",
  },
  {
    question: "Are there AppLovin ad credits available?",
    answer: "Yes. As part of our strategic partnership, eligible Upspring clients may have access to AppLovin ad credits. Contact us to learn more about this exclusive benefit.",
  },
  {
    question: "Can I analyze AppLovin alongside other channels?",
    answer: "Absolutely. One of the key benefits of Upspring is the unified workflow. Analyze your AppLovin creatives alongside Meta, TikTok, Google, and other channels all in one place.",
  },
  {
    question: "How quickly can I get started?",
    answer: "Most teams are up and running within minutes. Once you connect your AppLovin account, you can immediately start analyzing your creatives and uncovering insights.",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.upspring.ai",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AppLovin Integration",
      item: "https://www.upspring.ai/applovin",
    },
  ],
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
      if (checkShaderReady()) clearInterval(intervalId)
    }, 100)

    const fallbackTimer = setTimeout(() => setIsLoaded(true), 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToFooter = () => {
    const footer = document.querySelector("footer")
    if (footer) footer.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <Head>
        <title>AppLovin Creative Analytics Integration | Upspring.ai</title>
        <meta
          name="description"
          content="Upspring is the first platform to offer official AppLovin integration for full creative analysis. Analyze creative-level and creative-set performance to uncover winning patterns."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.upspring.ai/applovin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
          {/* Hero Section */}
          <section className="flex min-h-[90vh] w-full flex-col justify-center px-6 pt-32 md:px-12 lg:px-16">
            <div className="max-w-5xl">

              {/* Strategic Partnership Banner - replaces "Official AppLovin Partner" badge */}
              <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-flex items-center gap-4 rounded-2xl bg-[#4F8EF7]/20 border border-[#4F8EF7]/30 px-5 py-3 backdrop-blur-md">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F8EF7]/30">
                    <Sparkles className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground leading-tight">Official Strategic Technology Partnership</p>
                    <p className="text-xs text-foreground/70">Upspring x AppLovin - Official Integration Live Now</p>
                  </div>
                  <button
                    onClick={scrollToFooter}
                    className="ml-2 flex items-center gap-1 rounded-full bg-foreground/10 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/20"
                  >
                    Learn More
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>

              {/* First platform line */}
              <div className="mb-6 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <Zap className="h-4 w-4 text-foreground/70" />
                <p className="text-sm font-medium text-foreground/80 md:text-base">
                  First platform to offer official AppLovin integration for full creative analysis
                </p>
              </div>

              {/* H1 with AppLovin logo inline */}
              <div className="mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <h1 className="font-sans text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  <span className="text-balance">Creative Analytics for</span>
                  <span className="mt-3 flex flex-wrap items-center gap-4">
                    <Image
                      src="/images/applovin-logo.svg"
                      alt="AppLovin"
                      width={220}
                      height={40}
                      className="h-10 w-auto object-contain brightness-0 invert md:h-12"
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                    <span className="font-light text-foreground/80">teams</span>
                  </span>
                </h1>
              </div>

              <p className="mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-lg">
                As an official AppLovin technology partner, we deliver richer analysis and stronger creative intelligence for teams running on AppLovin.
              </p>

              <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
                <MagneticButton
                  size="lg"
                  variant="primary"
                  onClick={scrollToFooter}
                >
                  Request a Demo
                </MagneticButton>
                <MagneticButton
                  size="lg"
                  variant="secondary"
                  onClick={() => window.open("mailto:hello@upspring.ai", "_blank")}
                >
                  Contact Sales
                </MagneticButton>
              </div>

              <p className="mt-6 animate-in fade-in slide-in-from-bottom-4 text-sm text-foreground/50 duration-1000 delay-400">
                Trusted by performance marketers, DTC brands, and agencies worldwide
              </p>
            </div>
          </section>

          {/* Trusted By Section - logo carousel + testimonials */}
          <section className="w-full px-6 py-20 md:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-7xl">
              <div className="mb-8 md:mb-12">
                <h2 className="mb-2 font-sans text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                  Trusted By
                </h2>
                <p className="font-mono text-sm text-foreground/60 md:text-base">/ Industry Leaders</p>
              </div>

              <div className="mb-16 md:mb-24">
                <LogoCarousel />
              </div>

              {/* Testimonials Carousel */}
              <Carousel
                opts={{ align: "start", loop: true }}
                className="mx-auto w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[1400px]"
              >
                <CarouselContent className="-ml-4">
                  {testimonials.map((testimonial, index) => (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-[48%]">
                      <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8 lg:p-10">
                        <div className="flex flex-col gap-6">
                          <div className="flex items-start gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <div className="font-sans text-lg font-medium text-foreground">{testimonial.name}</div>
                              <div className="font-mono text-sm text-popover">{testimonial.title}</div>
                            </div>
                          </div>
                          <blockquote className="font-sans text-lg font-light italic leading-relaxed text-foreground md:text-xl">
                            &ldquo;{testimonial.quote}&rdquo;
                          </blockquote>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-8 flex justify-center gap-2">
                  <CarouselPrevious className="relative left-0 translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                  <CarouselNext className="relative right-0 translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* Features Grid Section */}
          <section className="w-full px-6 py-24 md:px-12 lg:px-16">
            <div className="mb-12 max-w-2xl">
              <h2 className="mb-4 font-sans text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                AppLovin Creative Analysis
              </h2>
              <p className="text-base text-foreground/70 md:text-lg">
                Analyze performance at both the creative and creative-set level. Understand what drives AppLovin campaign success, identify winning patterns, and uncover new directions to test.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <article
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm transition-colors hover:bg-foreground/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground/10 text-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-sans text-lg font-medium text-foreground">{feature.title}</h3>
                  <p className="text-sm text-foreground/70">{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Ad Credits Callout */}
          <section className="w-full px-6 py-12 md:px-12 lg:px-16">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-3xl border-2 border-[#4F8EF7]/30 bg-[#4F8EF7]/10 p-8 text-center backdrop-blur-md md:p-12">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4F8EF7]/20">
                  <Zap className="h-8 w-8 text-foreground" />
                </div>
                <h3 className="mb-4 font-sans text-2xl font-semibold text-foreground md:text-3xl">
                  AppLovin Ad Credits Available
                </h3>
                <p className="mx-auto mb-8 max-w-2xl text-foreground/80">
                  As part of our strategic partnership, eligible Upspring clients may have access to AppLovin ad credits. This exclusive benefit helps you maximize your creative testing and scale your winning ads.
                </p>
                <MagneticButton
                  size="lg"
                  variant="primary"
                  onClick={scrollToFooter}
                >
                  Check Eligibility
                </MagneticButton>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full px-6 py-24 md:px-12 lg:px-16">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-sans text-4xl font-semibold text-foreground md:text-5xl">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-foreground/70">
                  Everything you need to know about the AppLovin integration
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="border-foreground/10"
                  >
                    <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-foreground/70">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Final CTA Section */}
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
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <MagneticButton
                  size="lg"
                  variant="primary"
                  onClick={scrollToFooter}
                >
                  Get Started with AppLovin
                </MagneticButton>
                <MagneticButton
                  size="lg"
                  variant="secondary"
                  onClick={() => window.open("mailto:hello@upspring.ai", "_blank")}
                >
                  Talk to Sales
                </MagneticButton>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </main>
    </>
  )
}
