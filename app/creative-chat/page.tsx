"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { LandingHeader } from "@/components/landing-header"
import { MagneticButton } from "@/components/magnetic-button"
import { LogoCarousel } from "@/components/logo-carousel"
import { useRef, useEffect, useState, type FormEvent } from "react"
import {
  Check,
  ArrowRight,
  MessageSquare,
  Sparkles,
  BarChart3,
  Zap,
  Send,
  Bot,
  User,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react"
import { submitToAttio } from "@/actions/submit-to-attio"

export default function CreativeChatPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: "", email: "", brandUrl: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [urlError, setUrlError] = useState("")

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

  const validateUrl = (url: string): boolean => {
    if (!url) return false
    const urlPattern = /^(https?:\/\/)?(www\.)?[\w-]+(\.[\w-]+)+\/?.*$/i
    const simpleDomainPattern = /^[\w-]+(\.[\w-]+)+\/?.*$/i
    return urlPattern.test(url) || simpleDomainPattern.test(url)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateUrl(formData.brandUrl)) {
      setUrlError("Please enter a valid website URL (e.g., yourbrand.com)")
      return
    }

    setIsSubmitting(true)

    try {
      const [hubspotResponse, attioResult] = await Promise.allSettled([
        fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/146395595/5871c3b6-9d9f-424a-90b4-a9c823b7409a`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fields: [
                {
                  name: "firstname",
                  value: formData.name,
                },
                {
                  name: "email",
                  value: formData.email,
                },
                {
                  name: "website_registration",
                  value: formData.brandUrl,
                },
              ],
            }),
          },
        ),
        submitToAttio({
          email: formData.email,
          name: formData.name,
          website: formData.brandUrl,
          source: "creative chat form",
        }),
      ])

      if (hubspotResponse.status === "fulfilled" && hubspotResponse.value.ok) {
        setSubmitSuccess(true)
      } else {
        if (hubspotResponse.status === "fulfilled") {
          console.error("HubSpot submission failed:", await hubspotResponse.value.text())
        } else {
          console.error("HubSpot submission failed:", hubspotResponse.reason)
        }
        alert("Something went wrong. Please try again.")
      }

      if (attioResult.status === "rejected") {
        console.error("[v0] Attio submission failed:", attioResult.reason)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Ask questions in plain English about your ads, performance, and creative strategy.",
    },
    {
      icon: BarChart3,
      title: "Performance Insights",
      description: "Get instant answers about ROAS, CTR, spend, and what's driving your results.",
    },
    {
      icon: Sparkles,
      title: "Creative Intelligence",
      description: "Understand which hooks, visuals, and formats are working best for your brand.",
    },
    {
      icon: Zap,
      title: "Instant Answers",
      description: "No more digging through dashboards. Get the insights you need in seconds.",
    },
  ]

  const chatMessages = [
    {
      type: "user",
      message: "What are my top performing ads this month?",
    },
    {
      type: "ai",
      message: "Based on your Meta ad account, here are your top 3 performers by ROAS:",
      hasData: true,
    },
    {
      type: "user",
      message: "What hooks are working best?",
    },
    {
      type: "ai",
      message: "Your best performing hooks share these patterns:",
      hasList: true,
    },
  ]

  const capabilities = [
    {
      icon: TrendingUp,
      title: "Performance Analysis",
      description: "Ask about ROAS, CTR, CPM, spend, and any metric across your campaigns.",
    },
    {
      icon: Target,
      title: "Creative Breakdown",
      description: "Understand which creative elements drive conversions - hooks, formats, messaging.",
    },
    {
      icon: Lightbulb,
      title: "Actionable Recommendations",
      description: "Get AI-powered suggestions on what to test next based on your data.",
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Shader Background */}
      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
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

      <GrainOverlay />

      <div
        className={`relative z-10 flex min-h-screen flex-col transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
      >
        <LandingHeader isLoaded={isLoaded} />

        {/* Hero Section */}
        <section className="relative flex flex-1 flex-col px-6 py-12 md:py-20">
          <div className="mx-auto w-full max-w-[1400px] flex flex-col lg:flex-row gap-12 lg:gap-16 flex-1 items-center justify-center">
            {/* Left side - Messaging */}
            <div className="max-w-2xl w-full flex-1">
              <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md duration-700">
                <p className="font-mono text-xs text-card-foreground font-semibold">Creative Chat</p>
              </div>

              <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-semibold leading-[1.1] tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl">
                <span className="text-balance">Time to talk to your data</span>
              </h1>

              <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-xl">
                An AI chat fully integrated with your Meta ad account. Understand both creative and performance in
                natural conversation. Ask anything, get instant insights.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="flex items-start gap-3 p-4 rounded-xl bg-foreground/5 backdrop-blur-sm border border-foreground/10"
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-foreground/10">
                      <benefit.icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm mb-1">{benefit.title}</h3>
                      <p className="text-foreground/60 text-xs leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full max-w-md flex-shrink-0 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="rounded-2xl bg-foreground/10 backdrop-blur-xl border border-foreground/20 p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Get Early Access</h2>
                <p className="text-foreground/60 text-sm mb-6">
                  Be among the first to chat with your ad data. Limited spots available.
                </p>

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">You're in!</h3>
                    <p className="text-foreground/60 text-sm">We'll reach out soon with your early access details.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="mb-2 block font-mono text-xs text-foreground/80">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs text-foreground/80">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs text-foreground/80">Your Brand Website</label>
                      <input
                        type="text"
                        value={formData.brandUrl}
                        onChange={(e) => {
                          setFormData({ ...formData, brandUrl: e.target.value })
                          setUrlError("")
                        }}
                        required
                        className={`w-full rounded-lg border ${urlError ? "border-red-500" : "border-foreground/20"} bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/30`}
                        placeholder="yourbrand.com"
                      />
                      {urlError && <p className="mt-1 text-xs text-red-400">{urlError}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground/95 px-6 py-4 font-medium text-background transition-all duration-300 hover:bg-foreground disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Get Early Access
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-foreground/40">
                      Early access members get priority onboarding.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Logo Carousel Section */}
        <section className="relative w-full py-12 md:py-16">
          <div className="mx-auto w-full max-w-[1400px] px-6">
            <p className="text-center text-foreground/40 text-sm mb-8 font-mono uppercase tracking-wider">
              Trusted by leading brands & agencies
            </p>
            <LogoCarousel />
          </div>
        </section>

        {/* Chat Demo Section */}
        <section className="relative px-6 py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">See Creative Chat in Action</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Ask questions about your ads and get instant, actionable insights powered by AI.
              </p>
            </div>

            {/* Chat UI Mockup */}
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl bg-foreground/10 backdrop-blur-xl border border-foreground/20 overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-foreground/10">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">Creative Chat</h3>
                    <p className="text-foreground/50 text-xs">Connected to your Meta account</p>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-6 space-y-6 min-h-[400px]">
                  {/* User Message 1 */}
                  <div className="flex items-start gap-3 justify-end animate-in fade-in slide-in-from-right-4 duration-700">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-foreground/20 px-4 py-3">
                      <p className="text-foreground text-sm">What are my top performing ads this month?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-foreground/60" />
                    </div>
                  </div>

                  {/* AI Response 1 with skeleton */}
                  <div className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="max-w-[80%] space-y-3">
                      <div className="rounded-2xl rounded-tl-md bg-foreground/10 px-4 py-3 border border-foreground/10">
                        <p className="text-foreground text-sm mb-3">
                          Based on your Meta ad account, here are your top 3 performers by ROAS:
                        </p>

                        {/* Skeleton data cards */}
                        <div className="space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5 border border-foreground/10"
                            >
                              <div className="w-12 h-12 rounded-lg bg-foreground/10 animate-pulse" />
                              <div className="flex-1 space-y-2">
                                <div
                                  className="h-3 bg-foreground/10 rounded animate-pulse w-3/4"
                                  style={{ animationDelay: `${i * 100}ms` }}
                                />
                                <div className="flex gap-4">
                                  <div
                                    className="h-2 bg-foreground/10 rounded animate-pulse w-16"
                                    style={{ animationDelay: `${i * 100 + 50}ms` }}
                                  />
                                  <div
                                    className="h-2 bg-green-500/30 rounded animate-pulse w-12"
                                    style={{ animationDelay: `${i * 100 + 100}ms` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* User Message 2 */}
                  <div className="flex items-start gap-3 justify-end animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-foreground/20 px-4 py-3">
                      <p className="text-foreground text-sm">What hooks are working best?</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-foreground/60" />
                    </div>
                  </div>

                  {/* AI Response 2 with skeleton list */}
                  <div className="flex items-start gap-3 animate-in fade-in slide-in-from-left-4 duration-700 delay-700">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="max-w-[80%] space-y-3">
                      <div className="rounded-2xl rounded-tl-md bg-foreground/10 px-4 py-3 border border-foreground/10">
                        <p className="text-foreground text-sm mb-3">Your best performing hooks share these patterns:</p>

                        {/* Skeleton list items */}
                        <div className="space-y-2">
                          {["Question-based openers", "Problem-agitation hooks", "Social proof leads"].map(
                            (item, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                  <Check className="h-3 w-3 text-green-400" />
                                </div>
                                <div
                                  className="h-3 bg-foreground/10 rounded animate-pulse flex-1"
                                  style={{ animationDelay: `${i * 150}ms`, maxWidth: `${70 + i * 10}%` }}
                                />
                              </div>
                            ),
                          )}
                        </div>

                        <div className="mt-3 pt-3 border-t border-foreground/10">
                          <div className="flex items-center gap-2 text-xs text-foreground/50">
                            <Sparkles className="h-3 w-3" />
                            <span>Based on 47 ads analyzed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex items-start gap-3 animate-in fade-in duration-500 delay-1000">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <div className="rounded-2xl rounded-tl-md bg-foreground/10 px-4 py-3 border border-foreground/10">
                      <div className="flex gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="px-6 py-4 border-t border-foreground/10">
                  <div className="flex items-center gap-3 rounded-xl bg-foreground/5 border border-foreground/10 px-4 py-3">
                    <input
                      type="text"
                      placeholder="Ask anything about your ads..."
                      disabled
                      className="flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
                    />
                    <button disabled className="p-2 rounded-lg bg-foreground/10 text-foreground/40">
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="relative px-6 py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">What You Can Ask</h2>
              <p className="text-foreground/60 max-w-2xl mx-auto">
                Creative Chat understands both your creative assets and performance metrics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {capabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="p-6 rounded-2xl bg-foreground/5 backdrop-blur-sm border border-foreground/10"
                >
                  <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center mb-4">
                    <capability.icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{capability.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{capability.description}</p>
                </div>
              ))}
            </div>

            {/* Example Questions */}
            <div className="mt-12 p-6 rounded-2xl bg-foreground/5 backdrop-blur-sm border border-foreground/10">
              <h3 className="text-lg font-semibold text-foreground mb-4 text-center">Example Questions</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "What's my best ROAS this week?",
                  "Show me ads with hooks under 3 seconds",
                  "Which creative format converts best?",
                  "Compare my UGC vs studio ads",
                  "What should I test next?",
                ].map((question) => (
                  <div
                    key={question}
                    className="px-4 py-2 rounded-full bg-foreground/10 border border-foreground/10 text-foreground/80 text-sm"
                  >
                    "{question}"
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="relative px-6 py-16 md:py-24">
          <div className="mx-auto w-full max-w-[800px] text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">Ready to chat with your data?</h2>
            <p className="text-foreground/60 mb-8 max-w-lg mx-auto">
              Join the waitlist and be among the first to experience AI-powered creative intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => window.open("https://calendar.notion.so/meet/rdahan/4zrqx3rwm", "_blank")}
              >
                <span className="flex items-center gap-2">
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="flex items-center gap-2">
                  Get Early Access
                  <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
