"use client"

import type React from "react"

import { Shader, Swirl } from "shaders/react"
import { LandingHeader } from "@/components/landing-header"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import {
  Users,
  Share2,
  Layers,
  Brain,
  ArrowRight,
  Check,
  BarChart3,
  Sparkles,
  FolderOpen,
  MessageSquare,
  FileText,
} from "lucide-react"
import { LogoCarousel } from "@/components/logo-carousel"
import Image from "next/image"
import { submitToAttio } from "@/actions/submit-to-attio"
import { openWithUtm } from "@/lib/utm-utils"

const benefits = [
  {
    icon: Share2,
    title: "Share in Seconds",
    description: "Beautiful reports your clients will actually read",
  },
  {
    icon: Layers,
    title: "Multi-Account Magic",
    description: "Switch between clients without the chaos",
  },
  {
    icon: Brain,
    title: "AI That Gets Agencies",
    description: "Built for pace, pressure, and polish",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Everyone on the same page, always",
  },
]

export default function AgenciesPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agencyName: "",
    clientCount: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const [hubspotResponse, attioResult] = await Promise.allSettled([
        fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/146395595/65b93c55-13e1-46af-96e7-7105b891fbd6`,
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
                  name: "company_name",
                  value: formData.agencyName,
                },
                {
                  name: "number_of_clients",
                  value: formData.clientCount,
                },
                {
                  name: "business_type",
                  value: "Agency",
                },
              ],
            }),
          },
        ),
        submitToAttio({
          email: formData.email,
          name: formData.name,
          agencyName: formData.agencyName,
          clientCount: formData.clientCount,
          source: "agencies form",
        }),
      ])

      if (hubspotResponse.status === "fulfilled" && hubspotResponse.value.ok) {
        setSubmitSuccess(true)
      } else {
        throw new Error("Form submission failed")
      }

      // Log Attio errors but don't block user experience
      if (attioResult.status === "rejected") {
        console.error("[v0] Attio submission failed:", attioResult.reason)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative min-h-screen w-full bg-background">
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

      <LandingHeader isLoaded={isLoaded} />

      <div
        className={`relative z-10 flex flex-col w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section with Form */}
        <section className="flex min-h-screen w-full flex-col justify-center px-6 py-24 md:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-[1400px] flex flex-col lg:flex-row gap-12 lg:gap-16 flex-1 items-center justify-center">
            {/* Left side - Messaging */}
            <div className="max-w-2xl w-full flex-1">
              <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md duration-700">
                <p className="font-mono text-xs text-card-foreground font-semibold">BUILT FOR AGENCIES</p>
              </div>

              <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-semibold leading-[1.1] tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl">
                <span className="text-balance">A platform that thinks like an agency</span>
              </h1>

              <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-xl">
                Managing multiple ad accounts shouldn't be a hassle. Share data with clients in seconds, collaborate
                with your team effortlessly, and let AI handle the heavy lifting.
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
                <h2 className="text-2xl font-semibold text-foreground mb-2">Start Your Free Trial</h2>
                <p className="text-foreground/60 text-sm mb-6">
                  See why 100+ agencies trust Upspring to manage their creative analytics.
                </p>

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Welcome Aboard!</h3>
                    <p className="text-foreground/60 text-sm">
                      Check your email for next steps. We're excited to have you.
                    </p>
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
                      <label className="mb-2 block font-mono text-xs text-foreground/80">Work Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                        placeholder="you@agency.com"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs text-foreground/80">Agency Name</label>
                      <input
                        type="text"
                        value={formData.agencyName}
                        onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                        required
                        className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                        placeholder="Your agency name"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs text-foreground/80">Number of Clients</label>
                      <select
                        value={formData.clientCount}
                        onChange={(e) => setFormData({ ...formData, clientCount: e.target.value })}
                        required
                        className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground focus:border-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                      >
                        <option value="" className="bg-background">
                          Select...
                        </option>
                        <option value="1-5" className="bg-background">
                          1-5 clients
                        </option>
                        <option value="6-15" className="bg-background">
                          6-15 clients
                        </option>
                        <option value="16-30" className="bg-background">
                          16-30 clients
                        </option>
                        <option value="30+" className="bg-background">
                          30+ clients
                        </option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground/95 px-6 py-4 font-medium text-background transition-all duration-300 hover:bg-foreground disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Starting..."
                      ) : (
                        <>
                          Start Free Trial
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-foreground/40">
                      14-day free trial. No credit card required.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 py-8 md:px-12 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center mb-4">
              <p className="font-mono text-sm text-foreground/60">Trusted by leading agencies & brands</p>
            </div>
            <LogoCarousel />
          </div>
        </section>

        {/* Ad Analysis & Sharing Section */}
        <section className="w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center mb-16">
              <h2 className="mb-4 font-sans text-3xl font-semibold leading-tight text-foreground md:text-5xl">
                AI-Powered Creative Analysis
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Deep insights on every ad. One click to share with your clients. No more manual reporting or endless
                screenshots.
              </p>
            </div>

            {/* Analysis + Sharing Flow */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Ad Analysis Card */}
              <div className="relative rounded-2xl border border-foreground/20 bg-foreground/5 backdrop-blur-xl overflow-hidden p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="mb-4 h-8 w-8 text-blue-400" />
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
                    className="w-full aspect-[9/16] max-h-[400px] object-cover"
                  />
                </div>

                {/* AI Insights */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 mb-4">
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
                      Dynamic montage with thematic overlays creates urgency. Aspirational lifestyle positioning paired
                      with clear holiday gifting narrative drives action.
                    </p>
                  </div>
                  <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3">
                    <p className="text-xs text-foreground/50 mb-1">Recommendation</p>
                    <p className="text-sm text-foreground">
                      Test similar hook with Q1 product line. Consider A/B testing shorter 6s version for Stories.
                    </p>
                  </div>
                </div>
              </div>

              {/* Share Flow */}
              <div className="flex flex-col items-center gap-6">
                {/* Arrow */}
                <div className="hidden lg:flex items-center gap-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent to-foreground/30" />
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 border border-foreground/20">
                    <Share2 className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium text-foreground">Share in 1 Click</span>
                  </div>
                  <div className="h-px w-12 bg-gradient-to-l from-transparent to-foreground/30" />
                </div>

                {/* Client Report Preview */}
                <div className="w-full relative rounded-2xl border border-foreground/20 bg-foreground/5 backdrop-blur-xl overflow-hidden">
                  {/* Report Header */}
                  <div className="border-b border-foreground/10 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-sm">Weekly Creative Report</h3>
                        <p className="text-xs text-foreground/50">Prepared for: Marketing Team</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs text-foreground/50">Live Link</span>
                    </div>
                  </div>

                  {/* Report Content Preview */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3 text-center">
                        <p className="text-2xl font-bold text-foreground">47</p>
                        <p className="text-xs text-foreground/50">Ads Analyzed</p>
                      </div>
                      <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3 text-center">
                        <p className="text-2xl font-bold text-green-400">12</p>
                        <p className="text-xs text-foreground/50">Top Performers</p>
                      </div>
                      <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3 text-center">
                        <p className="text-2xl font-bold text-blue-400">5</p>
                        <p className="text-xs text-foreground/50">New Insights</p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-foreground/5 border border-foreground/10 p-3">
                      <p className="text-foreground/50 text-xs mb-2">Key Takeaway</p>
                      <p className="text-sm text-foreground">
                        Video ads with lifestyle hooks outperformed product-focused creatives by 34% this week.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-foreground/50">
                      <div className="h-4 w-4 rounded bg-foreground/10 flex items-center justify-center">
                        <span className="text-[10px]">✓</span>
                      </div>
                      <span>Client can view anytime. Auto-updates with new data.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Share with Clients Section */}
        <section className="w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              {/* Left - Report Preview */}
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl border border-foreground/20 bg-foreground/5 backdrop-blur-xl overflow-hidden">
                  {/* Report Header */}
                  <div className="flex items-center justify-between border-b border-foreground/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-foreground/70" />
                      <span className="font-semibold text-foreground">Monthly Creative Report</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                        Ready to Share
                      </div>
                    </div>
                  </div>

                  {/* Report Content */}
                  <div className="p-6 space-y-6">
                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Total Ads", value: "47", change: "+12" },
                        { label: "Avg ROAS", value: "3.2x", change: "+0.4" },
                        { label: "Top Performer", value: "Video #23", change: "" },
                      ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-lg bg-foreground/5 border border-foreground/10">
                          <p className="text-foreground/50 text-xs mb-1">{stat.label}</p>
                          <div className="flex items-baseline gap-2">
                            <span className="font-semibold text-foreground text-lg">{stat.value}</span>
                            {stat.change && <span className="text-green-400 text-xs">{stat.change}</span>}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chart Skeleton */}
                    <div className="h-32 rounded-lg bg-foreground/5 border border-foreground/10 flex items-end justify-around p-4 gap-2">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((height, i) => (
                        <div key={i} className="flex-1 bg-foreground/20 rounded-t" style={{ height: `${height}%` }} />
                      ))}
                    </div>

                    {/* Share Button */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-foreground/10 border border-foreground/20">
                      <div className="flex items-center gap-3">
                        <Share2 className="h-5 w-5 text-foreground/70" />
                        <div>
                          <p className="text-foreground text-sm font-medium">Share with client</p>
                          <p className="text-foreground/50 text-xs">Generate a beautiful, branded link</p>
                        </div>
                      </div>
                      <div className="px-4 py-2 rounded-full bg-foreground/20 text-foreground text-xs font-medium">
                        1-Click Share
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="flex-1 w-full max-w-lg">
                <h2 className="mb-4 font-sans text-3xl font-semibold leading-tight text-foreground md:text-4xl">
                  Reports Your Clients Will Actually Love
                </h2>
                <p className="text-lg text-foreground/70 mb-8">
                  Stop sending boring spreadsheets. Generate beautiful, visual reports in one click that make you look
                  enterprise-grade - even if you're a team of three.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Sparkles, text: "Auto-generated executive summaries" },
                    { icon: BarChart3, text: "Visual performance breakdowns" },
                    { icon: Share2, text: "One-click shareable links" },
                    { icon: FolderOpen, text: "White-label with your branding" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-foreground/10">
                        <item.icon className="h-4 w-4 text-foreground" />
                      </div>
                      <p className="text-foreground/80">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Agencies Are Saying Section */}
        <section className="w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center mb-16">
              <h2 className="mb-4 font-sans text-3xl font-semibold leading-tight text-foreground md:text-5xl">
                What Agencies Are Saying
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Andrew Watson Testimonial */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 bg-white/10">
                        <Image src="/images/andrew.jpg" alt="Andrew Watson" fill className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <div className="font-sans text-lg font-medium text-foreground">Andrew Watson</div>
                      <div className="font-mono text-sm text-popover">Co Founder at Igloo Media</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <blockquote className="font-sans text-lg font-light italic leading-relaxed text-foreground md:text-xl">
                      "Upspring has become a core part of Igloo's creative workflow. We've already landed five new
                      clients after showcasing Upspring in the pitch process, and internally we estimate it saves our
                      team 30%+ of the time we used to spend on manual analysis and pulling insights. It helps us move
                      faster, brief smarter, and make more confident creative decisions across accounts."
                    </blockquote>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1"></div>
                      <a
                        href="https://www.upspring.ai/resources/how-marketing-agency-igloo-media-accelerated-growth-with-upsprings-creative-intelligence"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-foreground/95 px-5 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground hover:scale-105"
                      >
                        Read Case Study
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matt Lowenthal Testimonial */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0">
                      <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/20 bg-white/10">
                        <Image src="/images/matt.png" alt="Matt Lowenthal" fill className="object-cover" />
                      </div>
                    </div>
                    <div>
                      <div className="font-sans text-lg font-medium text-foreground">Matt Lowenthal</div>
                      <div className="font-mono text-sm text-popover">Chief Strategy Officer at Brand.co</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <blockquote className="font-sans text-lg font-light italic leading-relaxed text-foreground md:text-xl">
                      "Upspring's smart UI makes it easy to parse performance data in real time, understand why an ad is
                      working, and get AI-powered suggestions on what to test next. Fantastic tool for any brand or team
                      running performance marketing"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI That Thinks Like an Agency */}
        <section className="w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-[1400px]">
            <div className="text-center mb-16">
              <h2 className="mb-4 font-sans text-3xl font-semibold leading-tight text-foreground md:text-5xl">
                AI That Actually Gets Agency Life
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Built for the pace, pressure, and polish agencies need. Your strategist, analyst, and creative
                researcher - all in one.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: MessageSquare,
                  title: "Talk to Your Data",
                  description: "Ask questions in plain English. Get insights that used to take hours - in seconds.",
                  example: '"Show me top hooks for athleisure brands this month"',
                },
                {
                  icon: Sparkles,
                  title: "Auto-Tag Everything",
                  description: "AI analyzes every creative automatically. Patterns surface. Strategies compound.",
                  example: "Hook types, CTAs, emotions, themes - all tagged",
                },
                {
                  icon: BarChart3,
                  title: "Competitive Intel",
                  description: "Track competitor ads in real-time. Pitch trends before your clients even ask.",
                  example: '"What\'s Nike doing differently this quarter?"',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-sm transition-colors hover:bg-foreground/10"
                >
                  <feature.icon className="mb-4 h-8 w-8 text-foreground/80" />
                  <h3 className="mb-3 font-sans text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-foreground/70 mb-4">{feature.description}</p>
                  <p className="text-xs text-foreground/50 italic">{feature.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 font-sans text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Ready to Scale Smarter?
            </h2>
            <p className="text-lg text-foreground/70 mb-8">
              Join top-tier agencies that replaced spreadsheet chaos with AI-powered clarity
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() =>
                  openWithUtm("https://app.upspring.ai/auth/register?utm_campaign=agencies&utm_source=bottom_cta")
                }
              >
                Start Free Trial
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="secondary"
                onClick={() => window.open("https://calendar.notion.so/meet/rdahan/4zrqx3rwm", "_blank")}
              >
                Book a Demo
              </MagneticButton>
            </div>
          </div>
        </section>

        <Footer id="contact" />
      </div>
    </main>
  )
}
