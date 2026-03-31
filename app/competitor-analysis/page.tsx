"use client"

import type React from "react"
import type { FormEvent } from "react"
import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { LandingHeader } from "@/components/landing-header"
import { MagneticButton } from "@/components/magnetic-button"
import { LogoCarousel } from "@/components/logo-carousel"
import { useRef, useEffect, useState } from "react"
import {
  Check,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Eye,
  Sparkles,
  MessageSquare,
  Layout,
  TrendingUp,
  Users,
} from "lucide-react"
import { submitToAttio } from "@/actions/submit-to-attio"

export default function CompetitorAnalysisPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({ name: "", email: "", brandUrl: "", competitorUrl: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [urlError, setUrlError] = useState("")
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const sceneCardsRef = useRef<HTMLDivElement>(null)
  const [videoContainerHeight, setVideoContainerHeight] = useState(480)
  const [videoProgress, setVideoProgress] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)

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

  useEffect(() => {
    const updateHeight = () => {
      if (videoContainerRef.current) {
        setVideoContainerHeight(videoContainerRef.current.offsetHeight)
      }
    }
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => window.removeEventListener("resize", updateHeight)
  }, [])

  const sceneAnalysis = [
    {
      startTime: 0,
      endTime: 3,
      label: "Hook",
      color: "bg-orange-400",
      title: "Performance Montage",
      description:
        "Group choreography with dramatic lighting creates immediate visual interest and shared athleticism.",
      insight: "Why it works: Instantly grabs attention with dynamic energy",
    },
    {
      startTime: 3,
      endTime: 5,
      label: "Benefits",
      color: "bg-blue-400",
      title: "Sky-High Stretch & Seamless Strides",
      description:
        "Aspirational poses showcase flexibility and fluidity, directly linking product to physical benefits.",
      insight: "Why it works: Tangible benefit demonstration",
    },
    {
      startTime: 5,
      endTime: 9,
      label: "Performance",
      color: "bg-green-400",
      title: "Unwavering Drive & Effortless Flow",
      description: "Intense training and graceful figure skating show versatility across athletic disciplines.",
      insight: "Why it works: Connects brand to mental fortitude",
    },
    {
      startTime: 9,
      endTime: 11,
      label: "Precision",
      color: "bg-purple-400",
      title: "Unmatched Focus",
      description: "Close-ups and dramatic framing highlight meticulous athleticism and control.",
      insight: "Why it works: Appeals to desire for mastery",
    },
    {
      startTime: 11,
      endTime: 14,
      label: "CTA",
      color: "bg-pink-400",
      title: "Holiday Gift Messaging",
      description: "Powerful athletic leap followed by ensemble shot and clear call to action for gifting.",
      insight: "Why it works: Strong finish with purchase guidance",
    },
  ]

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      const currentTime = videoRef.current.currentTime
      const duration = videoRef.current.duration || 14
      const progress = (currentTime / duration) * 100
      setVideoProgress(progress)

      // Find active scene based on current time
      const activeIndex = sceneAnalysis.findIndex(
        (scene) => currentTime >= scene.startTime && currentTime < scene.endTime,
      )
      if (activeIndex !== -1) {
        setActiveSceneIndex(activeIndex)
      }
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setVideoProgress(value)
    if (videoRef.current) {
      const duration = videoRef.current.duration || 14
      const newTime = (value / 100) * duration
      videoRef.current.currentTime = newTime

      // Find active scene based on slider position
      const activeIndex = sceneAnalysis.findIndex((scene) => newTime >= scene.startTime && newTime < scene.endTime)
      if (activeIndex !== -1) {
        setActiveSceneIndex(activeIndex)
      }
    }
  }

  const handleSliderRelease = () => {
    setIsDragging(false)
    if (videoRef.current && videoProgress > 0) {
      videoRef.current.play()
    }
  }

  const validateUrl = (url: string) => {
    if (!url) return true
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i
    const hasDot = url.includes(".")
    return hasDot && urlPattern.test(url)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateUrl(formData.brandUrl)) {
      setUrlError("Please enter a valid website URL")
      return
    }

    if (!formData.name || !formData.email || !formData.brandUrl) {
      return
    }

    setIsSubmitting(true)

    try {
      const portalId = "146395595"
      const formId = "161da8b0-f9f5-4d37-93bd-63843675a2e2"

      const hubspotData = {
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
            objectTypeId: "0-1",
            name: "website_registration_1766247596",
            value: formData.brandUrl,
          },
          ...(formData.competitorUrl
            ? [
                {
                  objectTypeId: "0-1",
                  name: "competitor_website_1766247375",
                  value: formData.competitorUrl,
                },
              ]
            : []),
        ],
      }

      const [hubspotResponse, attioResult] = await Promise.all([
        fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hubspotData),
        }),
        submitToAttio({
          email: formData.email,
          name: formData.name,
          website: formData.brandUrl,
          competitorUrl: formData.competitorUrl,
          source: "competitor analysis form",
        }),
      ])

      if (!hubspotResponse.ok) {
        throw new Error("Form submission failed")
      }

      setIsSubmitting(false)
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", brandUrl: "", competitorUrl: "" })

      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: Eye,
      title: "Competitor Creative Insights",
      description: "See exactly what ad creatives your competitors are running and how they perform",
    },
    {
      icon: BarChart3,
      title: "Performance Benchmarks",
      description: "Understand how your ads stack up against industry leaders",
    },
    {
      icon: Target,
      title: "Strategic Recommendations",
      description: "Get actionable insights to improve your creative strategy",
    },
    {
      icon: Zap,
      title: "AI-Powered Analysis",
      description: "Our AI analyzes thousands of data points in seconds",
    },
    {
      icon: TrendingUp,
      title: "Industry Trends",
      description: "Stay ahead of the curve with insights into current industry trends",
    },
    {
      icon: Users,
      title: "Audience Insights",
      description: "Understand your target audience better through competitor analysis",
    },
  ]

  return (
    <main className="relative min-h-screen w-full bg-background overflow-x-hidden">
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-1000 pointer-events-none ${isLoaded ? "opacity-100" : "opacity-0"}`}
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

      <LandingHeader isLoaded={isLoaded} currentSection={0} />

      <div
        className={`relative z-10 flex flex-col w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-full flex-col px-6 pb-16 pt-24 md:pt-32 md:px-12 md:pb-24">
          <div className="mx-auto w-full max-w-[1400px] flex flex-col lg:flex-row gap-12 lg:gap-16 flex-1 items-center justify-center">
            {/* Left side - Messaging */}
            <div className="max-w-2xl w-full flex-1">
              <div className="mb-6 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md duration-700">
                <p className="font-mono text-xs text-card-foreground font-semibold">Free Competitor Analysis</p>
              </div>

              <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-semibold leading-[1.1] tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl">
                <span className="text-balance">Know what your competitors are doing</span>
              </h1>

              <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-xl">
                Provide your brand and get a detailed AI-powered analysis of your competitors' ad creatives. Discover
                their strategies, messaging, and creative patterns.
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                {benefits.map((benefit, index) => (
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
                <h2 className="text-2xl font-semibold text-foreground mb-2">Get Your Free Analysis</h2>
                <p className="text-foreground/60 text-sm mb-6">
                  Enter your details and we'll send you a comprehensive competitor report.
                </p>

                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                      <Check className="h-8 w-8 text-green-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Request Submitted!</h3>
                    <p className="text-foreground/60 text-sm">
                      We'll analyze your competitors and send the report to your email within 24-48 hours.
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

                    <div>
                      <label className="mb-2 block font-mono text-xs text-foreground/80">Competitor Website</label>
                      <input
                        type="text"
                        value={formData.competitorUrl}
                        onChange={(e) => setFormData({ ...formData, competitorUrl: e.target.value })}
                        className="w-full rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none focus:ring-1 focus:ring-foreground/30"
                        placeholder="competitor.com (optional)"
                      />
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
                          Get Free Analysis
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-foreground/40">
                      No credit card required. Results within 24-48 hours.
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

        {/* How We Analyze Section */}
        <section className="w-full px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">See How We Analyze Ads</h2>
              <p className="text-foreground/60 mb-8 max-w-2xl mx-auto">
                Our AI breaks down every element of competitor creatives to give you actionable insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Best Hooks Card */}
              <div className="bg-foreground/10 backdrop-blur-xl border border-foreground/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Best Hooks</h3>
                </div>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="text-foreground/80 text-sm">Aspirational & Empowering Statement Openers</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold flex items-center justify-center">
                      2
                    </span>
                    <span className="text-foreground/80 text-sm">Influencer-Led Personal Endorsements</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 text-sm font-bold flex items-center justify-center">
                      3
                    </span>
                    <span className="text-foreground/80 text-sm">Dynamic Movement Captures</span>
                  </li>
                </ol>
              </div>

              {/* Creative Themes Card */}
              <div className="bg-foreground/10 backdrop-blur-xl border border-foreground/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Creative Themes</h3>
                </div>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="text-foreground/80 text-sm">Performance Meets Lifestyle & Comfort</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold flex items-center justify-center">
                      2
                    </span>
                    <span className="text-foreground/80 text-sm">Emotional & Aspirational Gifting Narrative</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-sm font-bold flex items-center justify-center">
                      3
                    </span>
                    <span className="text-foreground/80 text-sm">Community & Shared Athletic Experience</span>
                  </li>
                </ol>
              </div>

              {/* Format Patterns Card */}
              <div className="bg-foreground/10 backdrop-blur-xl border border-foreground/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Layout className="h-5 w-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Format Patterns</h3>
                </div>
                <ol className="space-y-4">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="text-foreground/80 text-sm">Consistent Studio Product Isolation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">
                      2
                    </span>
                    <span className="text-foreground/80 text-sm">Dynamic Video Montages with Overlays</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-sm font-bold flex items-center justify-center">
                      3
                    </span>
                    <span className="text-foreground/80 text-sm">37% Video / 63% Image Split</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="w-full px-6 py-16 md:px-12 md:py-24 border-t border-foreground/10">
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">You vs Your Competitor</h2>
              <p className="text-foreground/60 text-lg">
                See how your creative strategy stacks up against the competition
              </p>
            </div>

            <div className="bg-foreground/10 backdrop-blur-xl border border-foreground/20 rounded-2xl overflow-hidden">
              {/* Header Row */}
              <div className="grid grid-cols-3 border-b border-foreground/10">
                <div className="p-4 md:p-6">
                  <p className="text-foreground/50 text-xs font-mono uppercase tracking-wider">Metric</p>
                </div>
                <div className="p-4 md:p-6 text-center border-x border-foreground/10 bg-foreground/5">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-foreground/60" />
                    <p className="text-foreground font-semibold">Your Brand</p>
                  </div>
                </div>
                <div className="p-4 md:p-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Target className="h-4 w-4 text-red-400" />
                    <p className="text-foreground font-semibold">Competitor</p>
                  </div>
                </div>
              </div>

              {/* Comparison Rows */}
              {[
                { metric: "Active Ads", yours: "?", competitor: "393", highlight: true },
                { metric: "Video Ratio", yours: "?", competitor: "37%", highlight: false },
                { metric: "Avg. Hook Length", yours: "?", competitor: "2.8s", highlight: false },
                { metric: "Top Theme", yours: "?", competitor: "Performance + Lifestyle", highlight: true },
                { metric: "Format Diversity", yours: "?", competitor: "High", highlight: false },
              ].map((row, index) => (
                <div
                  key={row.metric}
                  className={`grid grid-cols-3 ${index < 4 ? "border-b border-foreground/10" : ""}`}
                >
                  <div className="p-4 md:p-6">
                    <p className="text-foreground/80 text-sm">{row.metric}</p>
                  </div>
                  <div className="p-4 md:p-6 text-center border-x border-foreground/10 bg-foreground/5">
                    <p className="text-foreground/40 text-sm font-mono">{row.yours}</p>
                  </div>
                  <div className="p-4 md:p-6 text-center">
                    <p className={`text-sm font-semibold ${row.highlight ? "text-green-400" : "text-foreground"}`}>
                      {row.competitor}
                    </p>
                  </div>
                </div>
              ))}

              {/* CTA Row */}
              <div className="p-6 bg-foreground/5 border-t border-foreground/10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-foreground font-semibold">Unlock your creative analysis</p>
                    <p className="text-foreground/60 text-sm">
                      Get detailed AI insights on your brand's ad performance
                    </p>
                  </div>
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  >
                    <span className="inline-flex items-center gap-2">
                      Analyze My Brand
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </MagneticButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="w-full px-6 py-16 md:px-12 md:py-24">
          <div className="mx-auto w-full max-w-[800px] text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Ready to Outperform Your Competitors?
            </h2>
            <p className="text-foreground/60 text-lg mb-8">Get your personalized competitive analysis today</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <span className="inline-flex items-center gap-2">
                  Get Free Analysis
                  <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
              <MagneticButton
                variant="primary"
                size="lg"
                onClick={() => window.open("https://calendar.notion.so/meet/rdahan/4zrqx3rwm", "_blank")}
              >
                <span className="inline-flex items-center gap-2">
                  Book a Demo
                  <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
