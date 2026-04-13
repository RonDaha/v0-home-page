"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { Check, Film, Image as ImageIcon, Package, Copy, Target, Zap, Sparkles, ChevronRight, Star } from "lucide-react"
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
    icon: Film,
    title: "Creative-Level Video Analysis",
    description: "Analyze individual video performance and creative decisions. Understand which videos drive watch time and conversions.",
  },
  {
    icon: ImageIcon,
    title: "Hook and Thumbnail Intelligence",
    description: "Identify which hooks and thumbnails consistently capture attention and drive YouTube performance.",
  },
  {
    icon: Package,
    title: "Creative-Set Pattern Detection",
    description: "Spot winning patterns across intros, video lengths, CTAs, and formats.",
  },
  {
    icon: Copy,
    title: "Unified Cross-Channel Workflow",
    description: "Analyze YouTube alongside Meta, TikTok, AppLovin inside your single Upspring workflow.",
  },
  {
    icon: Target,
    title: "Signal-to-Brief Engine",
    description: "Transform YouTube performance signals into sharper creative briefs and faster iteration cycles.",
  },
  {
    icon: Zap,
    title: "Instant Integration",
    description: "Connect your Google Ads account in seconds and your YouTube creatives appear immediately.",
  },
]

const testimonials = [
  {
    name: "Andrew Watson",
    title: "Co Founder at Igloo Media",
    image: "/images/andrew.jpg",
    quote:
      "Upspring has become a core part of Igloo's creative workflow. We've already landed five new clients after showcasing Upspring in the pitch process, and internally we estimate it saves our team 30% of the time we used to spend on manual analysis.",
  },
  {
    name: "Matt Lowenthal",
    title: "Chief Strategy Officer at Brand.co",
    image: "/images/matt.png",
    quote:
      "Upspring's smart UI makes it easy to parse performance data in real time, understand why an ad is working, and get AI-powered suggestions on what to test next.",
  },
  {
    name: "Tomer Arzoan",
    title: "Co-Founder at Maëlys",
    image:
      "https://cdn.prod.website-files.com/6767cd956661bd59e5a74391/67db09945cb20a822e894199_tomer-profile.jpeg?height=64&width=64",
    quote:
      "Being able to analyze YouTube alongside our other channels in one place has been incredibly valuable for our team.",
  },
]

const faqs = [
  {
    question: "What is the Upspring YouTube Ads integration?",
    answer: "Upspring connects directly to your Google Ads account to analyze your YouTube video creatives. This allows you to understand performance at both the creative level and creative-set level, helping you identify winning hooks, thumbnails, and formats.",
  },
  {
    question: "How do I connect my YouTube Ads account?",
    answer: "Simply navigate to Settings, select your Space, then Data Connections in your Upspring dashboard, then select YouTube Ads (Google Ads) to connect your account. The setup takes just a few minutes.",
  },
  {
    question: "What data can I analyze with this integration?",
    answer: "You can analyze individual video performance, hook effectiveness, thumbnail performance, intro and CTA patterns, video length trends, and get AI-powered insights to inform your next creative tests.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. Upspring maintains the highest security standards as an official Google partner. Your data is encrypted in transit and at rest, and we never share your data with third parties.",
  },
  {
    question: "Can I analyze YouTube alongside other channels?",
    answer: "Absolutely. One of the key benefits of Upspring is the unified workflow. Analyze your YouTube creatives alongside Meta, TikTok, AppLovin, and other channels all in one place.",
  },
  {
    question: "What types of YouTube campaigns are supported?",
    answer: "Upspring supports all YouTube ad formats including in-stream ads, discovery ads, bumper ads, and more. Any video creative running through Google Ads can be analyzed.",
  },
  {
    question: "How quickly can I get started?",
    answer: "Most teams are up and running within minutes. Once you connect your Google Ads account, you can immediately start analyzing your YouTube creatives and uncovering insights.",
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
      name: "YouTube Integration",
      item: "https://www.upspring.ai/youtube",
    },
  ],
}

export default function YouTubePage() {
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
        <title>YouTube Ads Creative Analytics Integration | Upspring.ai</title>
        <meta
          name="description"
          content="Upspring integrates directly with YouTube Ads (Google Ads) to analyze your video creatives in one unified workflow."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.upspring.ai/youtube" />
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
            <div className="mx-auto w-full max-w-[1400px] flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {/* Left side - Messaging */}
              <div className="flex-1 max-w-2xl">
                {/* Official Partners Banner */}
                <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <div className="inline-flex items-center gap-4 rounded-2xl bg-[#4F8EF7]/40 border-2 border-[#4F8EF7]/60 px-5 py-3 backdrop-blur-md">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F8EF7]/50">
                      <Sparkles className="h-4 w-4 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground leading-tight">YouTube Ads Integration - Now Live</p>
                      <p className="text-xs text-foreground/80">Official Google Partners</p>
                    </div>
                    <button
                      onClick={scrollToFooter}
                      className="ml-2 flex items-center gap-1 rounded-full bg-foreground/20 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-foreground/30"
                    >
                      Book a Demo
                      <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                {/* H1 - same structure as AppLovin */}
                <div className="mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <h1 className="font-sans text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
                    <span className="block mb-2">Creative intelligence</span>
                    <span className="block mb-2 font-semibold">for your</span>
                    <span className="flex items-center gap-4">
                      <Image
                        src="/images/youtube-logo.png"
                        alt="YouTube"
                        width={80}
                        height={56}
                        className="h-14 w-auto md:h-16 lg:h-20"
                      />
                      <span className="text-foreground">YouTube Ads</span>
                    </span>
                  </h1>
                </div>

                <p className="mb-8 max-w-lg animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-lg">
                  Analyze hooks, thumbnails, intros, CTAs, and formats inside your existing Upspring workflow. No new dashboards. Just clarity on what works.
                </p>

                <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
                  <MagneticButton
                    size="lg"
                    variant="primary"
                    onClick={scrollToFooter}
                  >
                    Connect YouTube Ads
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

              {/* Right side - AI Analysis Card */}
              <div className="w-full max-w-md flex-shrink-0 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 hidden lg:block">
                <div className="relative rounded-2xl border border-foreground/20 backdrop-blur-xl overflow-hidden p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-6 w-6 text-blue-400" />
                    <span className="text-sm font-medium text-foreground/70">AI Analysis</span>
                  </div>

                  {/* Video Ad */}
                  <div className="rounded-xl overflow-hidden mb-6">
                    <video
                      src="https://storage.googleapis.com/spring-assets/videos/0f7843ab-412c-47f8-9aac-887c5f3fe357_AQNyJSQ-2QZ007n8ue4TrpAoc3ei-Vkpt4_ge6OzF9LScOdwtGj5ewbETTRB1_oqGTgaFUEHG5xAUkpE_QUbq-FRP_19VnpqNjApKzKxYg.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full aspect-[9/16] max-h-[280px] object-cover"
                    />
                  </div>

                  {/* AI Insights */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-sm text-foreground/70">Score: 9.2/10</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                        <span className="text-sm text-foreground/70">Hook: Strong</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-400" />
                        <span className="text-sm text-foreground/70">CTA: Excellent</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3">
                      <p className="text-xs text-foreground/50 mb-1">Why It Works</p>
                      <p className="text-sm text-foreground">
                        Strong hook in first 3 seconds captures attention. Clean product shots with lifestyle context drive engagement.
                      </p>
                    </div>
                    <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3">
                      <p className="text-xs text-foreground/50 mb-1">Recommendation</p>
                      <p className="text-sm text-foreground">
                        Test shorter 6s bumper version. Consider adding text overlay for sound-off viewers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-sans text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                  YouTube Creative Analysis
                </h2>
                <p className="mx-auto max-w-2xl text-base text-foreground/70 md:text-lg">
                  Analyze performance at both the creative and creative-set level.
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
            </div>
          </section>

          {/* Trusted by Performance Teams - second review component */}
          <section className="relative w-full px-6 py-24 md:px-12 lg:px-16">
            <div className="relative z-10 mx-auto max-w-5xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 font-sans text-4xl font-semibold text-foreground md:text-5xl">
                  Trusted by Performance Teams
                </h2>
                <p className="text-lg text-foreground/70">
                  See what teams are saying about Upspring&apos;s creative intelligence
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    name: "Ives Rocher",
                    company: "Ron Rotter",
                    quote: "Upspring's YouTube integration has transformed how we analyze video creative performance. We're iterating on hooks faster than ever.",
                  },
                  {
                    name: "FansLegacy",
                    company: "Tomar Arzoan",
                    quote: "The thumbnail and hook intelligence is a game changer. We finally understand what drives watch time on YouTube.",
                  },
                  {
                    name: "Rotem Avizohar",
                    company: "Interaction",
                    quote: "Being able to analyze YouTube alongside our other channels in one place has been incredibly valuable.",
                  },
                  {
                    name: "Roni Trocky Polonio",
                    company: "",
                    quote: "Upspring gives us the clarity we needed to scale our winning YouTube creatives with confidence.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 rounded-2xl bg-foreground/5 p-6 backdrop-blur-md transition-all hover:bg-foreground/10"
                  >
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className="h-4 w-4 fill-foreground text-foreground"
                        />
                      ))}
                    </div>
                    <p className="flex-grow text-sm italic text-foreground/80">
                      &quot;{item.quote}&quot;
                    </p>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      {item.company && (
                        <p className="text-sm text-foreground/60">{item.company}</p>
                      )}
                    </div>
                  </div>
                ))}
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
                  Everything you need to know about the YouTube Ads integration
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

          <Footer />
        </div>
      </main>
    </>
  )
}
