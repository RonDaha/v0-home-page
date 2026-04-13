"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { Check, Zap, BarChart3, Layers, ArrowRight, Shield, TrendingUp, Sparkles, Star, ChevronRight } from "lucide-react"
import Image from "next/image"
import Head from "next/head"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const features = [
  {
    icon: BarChart3,
    title: "Creative-Level Analysis",
    description: "Understand the performance of each individual AppLovin creative to identify what drives results and which assets perform best",
  },
  {
    icon: Layers,
    title: "Creative-Set Analysis",
    description: "Analyze performance patterns across creative sets to uncover winning themes and optimize your AppLovin campaign performance",
  },
  {
    icon: Sparkles,
    title: "Unified Workflow",
    description: "Analyze AppLovin creatives inside the same workflow you use for Meta, TikTok, Google, and other channels",
  },
  {
    icon: TrendingUp,
    title: "Pattern Detection",
    description: "Spot trends and patterns across creatives to inform your next AppLovin creative tests and optimization opportunities",
  },
  {
    icon: ArrowRight,
    title: "Signal-to-Decision",
    description: "Transform raw AppLovin performance data into clear, actionable insights and next steps for creative optimization",
  },
  {
    icon: Shield,
    title: "Secure Official Partnership",
    description: "Official AppLovin technology partner status ensures secure, reliable access to your AppLovin analytics data",
  },
]

const testimonials = [
  {
    quote: "Upspring's AppLovin integration has completely transformed how we analyze creative performance. We're making decisions in hours, not days.",
    author: "Sarah Chen",
    role: "Head of Growth",
    company: "Mobile Gaming Studio",
    rating: 5,
  },
  {
    quote: "The creative-set analysis is a game changer. We can finally see patterns across our entire AppLovin portfolio.",
    author: "Marcus Johnson",
    role: "Performance Marketing Director",
    company: "DTC Brand",
    rating: 5,
  },
  {
    quote: "Being able to analyze AppLovin alongside our other channels in one place has been incredibly valuable for our team.",
    author: "Emily Rodriguez",
    role: "Creative Strategy Lead",
    company: "Growth Agency",
    rating: 5,
  },
]

const faqs = [
  {
    question: "What is the Upspring AppLovin integration?",
    answer: "Upspring is the first platform to offer an official AppLovin integration for full creative analysis. This allows you to analyze performance at both the creative level and creative-set level, helping you understand what drives results and identify winning patterns.",
  },
  {
    question: "How do I connect my AppLovin account?",
    answer: "Simply navigate to Settings → Space → Data Sources in your Upspring dashboard, then select Axon (AppLovin) to connect your account. The setup takes just a few minutes.",
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
    answer: "Yes! As part of our strategic partnership, eligible Upspring clients may have access to AppLovin ad credits. Contact us to learn more about this exclusive benefit.",
  },
  {
    question: "Can I analyze AppLovin alongside other channels?",
    answer: "Absolutely. One of the key benefits of Upspring is the unified workflow - analyze your AppLovin creatives alongside Meta, TikTok, Google, and other channels all in one place.",
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    monthlySpend: "",
    website: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

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

  const scrollToDemo = () => {
    const demoSection = document.getElementById("demo-form")
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({
      name: "",
      email: "",
      businessType: "",
      monthlySpend: "",
      website: "",
      message: "",
    })
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
        <meta property="og:title" content="AppLovin Creative Analytics Integration | Upspring.ai" />
        <meta
          property="og:description"
          content="Upspring is the first platform to offer official AppLovin integration for full creative analysis."
        />
        <meta property="og:url" content="https://www.upspring.ai/applovin" />
        <meta property="og:type" content="website" />
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
                <span className="text-balance font-medium">AppLovin Creative Analytics, Unified</span>
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
                  onClick={scrollToDemo}
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
              <p className="mt-6 animate-in fade-in slide-in-from-bottom-4 text-sm text-foreground/60 duration-1000 delay-400">
                Trusted by performance marketers, DTC brands, and agencies worldwide
              </p>
            </div>
          </section>

          {/* Partner Announcement Banner */}
          <section className="w-full px-6 py-8 md:px-12 lg:px-16">
            <div className="mx-auto max-w-5xl rounded-2xl bg-[#4F8EF7]/20 border border-[#4F8EF7]/30 p-6 backdrop-blur-md">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4F8EF7]/30">
                    <Sparkles className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Strategic Technology Partnership</p>
                    <p className="text-sm text-foreground/70">Upspring x AppLovin - Official Integration Live Now</p>
                  </div>
                </div>
                <button
                  onClick={scrollToDemo}
                  className="flex items-center gap-2 rounded-full bg-foreground/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/20"
                >
                  Learn More
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </section>

          {/* Partnership Image Section */}
          <section className="w-full px-6 py-12 md:px-12 lg:px-16">
            <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-foreground/10 shadow-2xl">
              <Image
                src="/images/applovin-partnership.png"
                alt="Upspring x AppLovin Partnership - Official creative analytics integration"
                width={1200}
                height={675}
                className="w-full h-auto"
                priority
              />
            </div>
          </section>

          {/* Features Grid Section */}
          <section className="w-full px-6 py-24 md:px-12 lg:px-16">
            <div className="mb-16 max-w-3xl">
              <h2 className="mb-6 font-sans text-4xl font-semibold leading-tight text-foreground md:text-5xl">
                AppLovin Creative Analysis: Creative-Level and Creative-Set Insights
              </h2>
              <p className="text-lg text-foreground/80 md:text-xl">
                Upspring is the first platform to offer official AppLovin integration for full creative analysis. With our AppLovin creative analytics platform, performance teams can analyze performance at both the creative level and creative-set level, making it easier to understand what drives AppLovin campaign success, identify winning patterns, and uncover new creative directions to test.
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
                  <h3 className="mb-2 font-sans text-xl font-medium text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="w-full px-6 py-24 md:px-12 lg:px-16">
            <div className="mx-auto max-w-4xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 font-sans text-4xl font-semibold text-foreground md:text-5xl">
                  How to Get Started with AppLovin Integration
                </h2>
                <p className="text-lg text-foreground/70">
                  Connect your AppLovin account and start analyzing creative performance in minutes
                </p>
              </div>
              
              <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-foreground/20 md:block" />
                
                <div className="space-y-8">
                  {[
                    {
                      step: 1,
                      title: "Navigate to Data Sources",
                      description: "Go to Settings, select your Space, then Data Sources in your Upspring dashboard",
                    },
                    {
                      step: 2,
                      title: "Connect AppLovin (Axon)",
                      description: "Select the Axon (AppLovin) integration and authorize the connection with your AppLovin account",
                    },
                    {
                      step: 3,
                      title: "Begin Creative Analysis",
                      description: "Start analyzing your AppLovin creatives with full creative-level and creative-set analytics",
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-6">
                      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground/10 border-2 border-foreground/20 font-mono text-lg font-bold text-foreground backdrop-blur-sm">
                        {item.step}
                      </div>
                      <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm flex-1">
                        <h3 className="mb-2 font-sans text-xl font-medium text-foreground">{item.title}</h3>
                        <p className="text-foreground/70">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Ad Credits Callout Section */}
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
                  onClick={scrollToDemo}
                >
                  Check Eligibility
                </MagneticButton>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="w-full px-6 py-24 md:px-12 lg:px-16">
            <div className="mb-12 text-center">
              <h2 className="mb-4 font-sans text-4xl font-semibold text-foreground md:text-5xl">
                Trusted by Performance Teams
              </h2>
              <p className="text-lg text-foreground/70">
                See what teams are saying about Upspring&apos;s creative intelligence
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm"
                >
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 fill-foreground text-foreground" />
                    ))}
                  </div>
                  <blockquote className="mb-6 text-foreground/90">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-foreground/60">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </article>
              ))}
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

          {/* Demo Request Form Section */}
          <section id="demo-form" className="w-full px-6 py-24 md:px-12 lg:px-16">
            <div className="mx-auto max-w-2xl">
              <div className="rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-md md:p-12">
                <div className="mb-8 text-center">
                  <h2 className="mb-4 font-sans text-3xl font-semibold text-foreground md:text-4xl">
                    Request a Demo
                  </h2>
                  <p className="text-foreground/70">
                    See how Upspring&apos;s AppLovin integration can transform your creative analysis
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                      <Check className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="mb-2 text-xl font-medium text-foreground">Thank you!</h3>
                    <p className="text-foreground/70">
                      We&apos;ll be in touch shortly to schedule your demo.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor="businessType" className="mb-2 block text-sm font-medium text-foreground">
                          Business Type
                        </label>
                        <select
                          id="businessType"
                          value={formData.businessType}
                          onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                          className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-foreground focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                        >
                          <option value="">Select type</option>
                          <option value="dtc-brand">DTC Brand</option>
                          <option value="agency">Agency</option>
                          <option value="mobile-gaming">Mobile Gaming</option>
                          <option value="app-developer">App Developer</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="monthlySpend" className="mb-2 block text-sm font-medium text-foreground">
                          Monthly Ad Spend
                        </label>
                        <select
                          id="monthlySpend"
                          value={formData.monthlySpend}
                          onChange={(e) => setFormData({ ...formData, monthlySpend: e.target.value })}
                          className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-foreground focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                        >
                          <option value="">Select range</option>
                          <option value="under-10k">Under $10k</option>
                          <option value="10k-50k">$10k - $50k</option>
                          <option value="50k-100k">$50k - $100k</option>
                          <option value="100k-500k">$100k - $500k</option>
                          <option value="500k-plus">$500k+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="website" className="mb-2 block text-sm font-medium text-foreground">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-xl border border-foreground/20 bg-foreground/5 px-4 py-3 text-foreground placeholder:text-foreground/40 focus:border-foreground/40 focus:outline-none focus:ring-2 focus:ring-foreground/10 resize-none"
                        placeholder="Tell us about your creative analysis needs..."
                      />
                    </div>

                    <MagneticButton
                      size="lg"
                      variant="primary"
                      className="w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Request Demo"}
                    </MagneticButton>
                  </form>
                )}
              </div>
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
                  onClick={scrollToDemo}
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
