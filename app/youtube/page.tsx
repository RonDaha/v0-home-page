"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { Check, Play, Film, Image as ImageIcon, Package, Copy, Target, Zap, MessageCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const faqs = [
  {
    question: "What is Upspring's YouTube Ads integration?",
    answer:
      "Upspring's YouTube Ads integration connects directly to your Google Ads account and brings your YouTube video creatives into Upspring's AI-powered creative analytics platform. You can analyze hooks, thumbnails, video length, CTAs, and creative patterns alongside your other paid social channels.",
  },
  {
    question: "How do I connect YouTube Ads to Upspring?",
    answer:
      "To connect YouTube Ads, go to Settings → Data Connections inside Upspring, select YouTube Ads (Google Ads), and authorize your account. Your video creatives will sync automatically and appear alongside your other channels immediately.",
  },
  {
    question: "What YouTube creative metrics can I analyze in Upspring?",
    answer:
      "With Upspring's YouTube integration, you can analyze individual video performance, hook effectiveness, thumbnail performance, intro and CTA patterns, video length trends, creative-set patterns, and overall what creative elements are driving watch time, clicks, and conversions.",
  },
  {
    question: "Does Upspring support YouTube alongside other ad platforms?",
    answer:
      "Yes. Upspring supports YouTube Ads, Meta, TikTok, AppLovin (Axon), Shopify, and more — all within the same unified creative analytics workflow. You can compare creative performance across channels without switching tools or exporting data.",
  },
  {
    question: "What makes Upspring's YouTube analytics different from Google Ads native reporting?",
    answer:
      "Google Ads shows you what happened — views, clicks, and conversions. Upspring shows you why it happened — which creative elements, patterns, hooks, and formats are driving results — so you can make strategic decisions about what to scale, refresh, or test next.",
  },
  {
    question: "Is the YouTube Ads integration available now?",
    answer:
      "Yes. The YouTube Ads integration is already live for all Upspring users. Head to Settings → Data Connections to connect your account and start analyzing your YouTube creatives immediately.",
  },
  {
    question: "Who is Upspring's YouTube integration designed for?",
    answer:
      "Upspring's YouTube integration is built for performance marketing teams, DTC brands, and agencies that run YouTube ad campaigns and want to go beyond surface-level metrics to understand what creative decisions are actually driving results.",
  },
  {
    question: "Do I need a separate Upspring plan to access YouTube Ads?",
    answer:
      "No separate plan is required. YouTube Ads is available as a data connection within your existing Upspring account. Connect it via Settings → Data Connections.",
  },
]

const features = [
  {
    icon: Film,
    title: "Creative-Level Video Analysis",
    description:
      "Go beyond views and clicks. Understand which specific videos, edits, and creative choices are driving results — and which ones are silently killing performance.",
  },
  {
    icon: ImageIcon,
    title: "Hook & Thumbnail Intelligence",
    description:
      "Analyze which hooks, opening frames, and thumbnails consistently capture attention and drive watch time across your YouTube campaigns.",
  },
  {
    icon: Package,
    title: "Creative-Set Pattern Detection",
    description:
      "Identify winning and losing patterns across intros, video lengths, CTAs, and formats — so you know exactly what to scale and what to cut.",
  },
  {
    icon: Copy,
    title: "Unified Cross-Channel Workflow",
    description:
      "Analyze YouTube alongside Meta, TikTok, AppLovin, and Shopify — inside the single Upspring workflow your team already uses daily. No exports, no extra dashboards.",
  },
  {
    icon: Target,
    title: "Signal-to-Brief Engine",
    description:
      "Transform YouTube performance signals into sharper creative briefs, faster iteration cycles, and clear double-down vs. kill decisions for your team.",
  },
  {
    icon: Zap,
    title: "Instant Integration",
    description:
      "Already live. Connect your Google Ads account in seconds via Settings → Data Connections and your YouTube creatives appear immediately.",
  },
]

export default function YouTubePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    adSpend: "",
    website: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false
    const parts = email.split("@")
    if (parts.length !== 2) return false
    const domain = parts[1]
    const domainParts = domain.split(".")
    const tld = domainParts[domainParts.length - 1]
    return tld.length >= 2 && /^[a-zA-Z]+$/.test(tld)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.businessType || !formData.adSpend || !formData.message) {
      return
    }

    if (!isValidEmail(formData.email)) {
      setSubmitError(true)
      setTimeout(() => setSubmitError(false), 5000)
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)

    try {
      // Form submission logic here (submit to HubSpot/Attio if integrated)
      setSubmitSuccess(true)
      setFormData({
        name: "",
        email: "",
        businessType: "",
        adSpend: "",
        website: "",
        message: "",
      })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
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
        <section className="flex min-h-[90vh] w-full flex-col justify-center px-6 pt-32 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <div className="flex items-center gap-2">
                <div className="flex h-1.5 w-1.5 items-center justify-center rounded-full bg-red-500" />
                <p className="font-mono leading-7 text-xs text-card-foreground font-semibold">YouTube Ads Integration — Now Live</p>
              </div>
            </div>

            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance font-medium">YouTube Ads Creative Analytics — Powered by Upspring</span>
            </h1>

            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Analyze your YouTube video creatives — hooks, thumbnails, intros, CTAs, and formats — inside the same Upspring workflow you already use. No new dashboards. No guesswork. Just clarity on what&apos;s actually working and why.
              </span>
            </p>

            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton size="lg" variant="primary">
                Connect YouTube Ads
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary">
                Book a Demo
              </MagneticButton>
            </div>

            <p className="mt-8 animate-in fade-in slide-in-from-bottom-4 max-w-2xl text-sm text-foreground/70 duration-1000 delay-400 md:text-base">
              Already live — early access teams are running YouTube campaigns through Upspring today
            </p>
          </div>
        </section>

        {/* Announcement Banner */}
        <section className="w-full border-l-4 border-red-500 bg-foreground/5 px-6 py-12 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h2 className="mb-4 font-sans text-3xl font-semibold text-foreground md:text-4xl">
              YouTube Ads Integration Is Now Live
            </h2>
            <p className="mb-6 text-lg text-foreground/80 md:text-xl">
              Connect your Google Ads account and your YouTube creatives automatically appear alongside Meta, TikTok, AppLovin, and more — enriched with the same AI analysis and creative workflows.
            </p>
            <Link href="#demo-form">
              <MagneticButton variant="secondary">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </MagneticButton>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="mb-16 max-w-3xl">
            <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-foreground/60">What You Can Do Now</p>
            <h2 className="mb-6 font-sans text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Finally Understand What&apos;s Driving Performance on YouTube
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm transition-colors hover:bg-foreground/10"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 text-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-sans text-xl font-medium text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h2 className="mb-16 font-sans text-4xl font-semibold text-foreground md:text-5xl">
              How to Connect YouTube Ads to Upspring
            </h2>

            <div className="flex flex-col gap-8 md:gap-12">
              {[
                {
                  step: "1",
                  title: "Go to Settings",
                  description: "Navigate to Settings → Data Connections inside your Upspring account.",
                },
                {
                  step: "2",
                  title: "Connect YouTube Ads",
                  description: "Select YouTube Ads (Google Ads) and authorize your account. Your creatives sync automatically.",
                },
                {
                  step: "3",
                  title: "Start Analyzing",
                  description: "Your YouTube video creatives are immediately available for analysis alongside your other channels inside Upspring.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-8">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-foreground/30 text-foreground font-semibold">
                      {item.step}
                    </div>
                    <div className="mt-4 h-12 w-0.5 bg-foreground/20 md:h-24" />
                  </div>
                  <div className="pb-8">
                    <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">{item.title}</h3>
                    <p className="text-foreground/70 text-lg">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <MagneticButton size="lg" variant="primary">
                Connect YouTube Ads Now
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h2 className="mb-12 font-sans text-4xl font-semibold text-foreground md:text-5xl">
              Remove the Blind Spots. Ship Better Creative Every Week.
            </h2>

            <div className="grid gap-12 md:grid-cols-2">
              <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
                Early access teams are already running their YouTube campaigns through Upspring and using these insights to tighten hooks, refresh winning concepts, and ship better tests every week. For the first time, you can see video performance at both the creative and creative-set level in one place — so you actually understand which edits, hooks, and thumbnails are moving the needle.
              </p>

              <div className="space-y-4">
                {[
                  "No new dashboards or complex exports",
                  "Understand what works at the creative element level",
                  "Spot patterns across intros, lengths, CTAs, and formats",
                  "Turn data into clear 'scale vs. kill' decisions",
                  "Works inside your existing Upspring workflow",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <Check className="h-6 w-6 text-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-foreground/80 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="max-w-4xl">
            <h2 className="mb-12 font-sans text-4xl font-semibold text-foreground md:text-5xl">
              Frequently Asked Questions About YouTube Ads on Upspring
            </h2>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border border-foreground/10 rounded-lg px-6 py-4 data-[state=open]:bg-foreground/5"
                >
                  <AccordionTrigger className="text-left font-sans text-lg font-semibold text-foreground hover:text-foreground/80">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 text-base pt-4">
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
              The Teams Winning on YouTube Aren&apos;t Guessing.
              <br />
              They&apos;re Analyzing.
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-foreground/80 md:text-xl">
              Early access teams are already analyzing their YouTube creatives with Upspring. See what smarter video creative intelligence looks like — without adding a single new dashboard.
            </p>
            <div className="flex flex-col gap-4 justify-center sm:flex-row sm:items-center">
              <MagneticButton size="lg" variant="primary">
                Connect YouTube Ads →
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary">
                Book a Demo
              </MagneticButton>
            </div>
          </div>
        </section>

        {/* Demo Form Section */}
        <section id="demo-form" className="w-full px-6 py-24 md:px-12 lg:px-16">
          <div className="max-w-2xl">
            <h2 className="mb-12 font-sans text-4xl font-semibold text-foreground md:text-5xl">Book a Demo</h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-foreground">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 font-sans text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:bg-foreground/10"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 font-sans text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:bg-foreground/10"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-foreground">Business Type</label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 font-sans text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:bg-foreground/10"
                >
                  <option value="">Select your business type</option>
                  <option value="Brand">Brand</option>
                  <option value="Agency">Agency</option>
                  <option value="SaaS">SaaS</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-foreground">Monthly Ad Spend</label>
                <select
                  required
                  value={formData.adSpend}
                  onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                  className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 font-sans text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:bg-foreground/10"
                >
                  <option value="">Select monthly ad spend</option>
                  <option value="Under $50K">Under $50K</option>
                  <option value="$50K–$100K">$50K–$100K</option>
                  <option value="$100K–$500K">$100K–$500K</option>
                  <option value="$500K–$1M">$500K–$1M</option>
                  <option value="Over $1M">Over $1M</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-foreground">Website URL</label>
                <input
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 font-sans text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:bg-foreground/10"
                  placeholder="yoursite.com"
                />
              </div>

              <div>
                <label className="block mb-2 font-sans text-sm font-medium text-foreground">Message</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 font-sans text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:bg-foreground/10 resize-none"
                  placeholder="Tell us more about your YouTube advertising goals..."
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-sm">Please check your information and try again.</p>
              )}
              {submitSuccess && (
                <p className="text-green-500 text-sm">Thank you! We&apos;ll be in touch soon.</p>
              )}

              <MagneticButton size="lg" variant="primary" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Book a Demo"}
              </MagneticButton>
            </form>
          </div>
        </section>

        <Footer />
      </div>

      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://upspring.ai",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "YouTube Ads Integration",
                item: "https://upspring.ai/youtube",
              },
            ],
          }),
        }}
      />
    </main>
  )
}

import { ArrowRight } from "lucide-react"
