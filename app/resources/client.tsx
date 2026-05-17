"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef, useMemo } from "react"
import { Clock } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import type { NotionArticle } from "@/lib/notion"

interface ResourcesClientProps {
  articles: NotionArticle[]
}

// Pill filter values as a const for safety
type FilterValue = "all" | "blog" | "case-study"

const METRICS = [
  { label: "Happy Customers", value: "+100" },
  { label: "Brands Analyzed", value: "2000+" },
  { label: "Cut on Creative Testing (Q1 2026)", value: "25%" },
  { label: "Sharable Reports Generated", value: "1744" },
  { label: "New Features This Year", value: "24" },
]

export function ResourcesClient({ articles }: ResourcesClientProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // URL is the single source of truth — no local state mirror
  const rawFilter = searchParams.get("filter")
  const filter: FilterValue =
    rawFilter === "blog" ? "blog" : rawFilter === "case-study" ? "case-study" : "all"

  const handleFilterChange = (value: FilterValue) => {
    if (value === "all") {
      router.push("/resources", { scroll: false })
    } else {
      router.push(`/resources?filter=${value}`, { scroll: false })
    }
  }

  // Filter articles by active pill
  const filteredArticles = useMemo(() => {
    if (filter === "blog") return articles.filter((a) => a.type !== "Case Study")
    if (filter === "case-study") return articles.filter((a) => a.type === "Case Study")
    return articles
  }, [articles, filter])

  // Featured article rule:
  // - filter=blog: first non-Case Study article
  // - filter=case-study: first Case Study article
  // - filter=all: first article flagged as featured, or fall back to the first article
  const featuredArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null
    const flagged = filteredArticles.find((a) => (a as any).featured === true)
    return flagged ?? filteredArticles[0]
  }, [filteredArticles])

  const gridArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles
    return filteredArticles.filter((a) => a.id !== featuredArticle.id)
  }, [filteredArticles, featuredArticle])

  // Headline / subhead per filter
  const heading =
    filter === "case-study"
      ? "Real results from real brands"
      : "Learn from our insights"
  const subheading =
    filter === "case-study"
      ? "See how teams like yours leverage Upspring to scale their creative performance."
      : "Guides, strategies, and deep dives to help you scale creative performance."

  // Empty-state label per filter
  const emptyLabel =
    filter === "blog"
      ? "blog posts"
      : filter === "case-study"
      ? "case studies"
      : "resources"

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const pills: { label: string; value: FilterValue }[] = [
    { label: "All", value: "all" },
    { label: "Blog", value: "blog" },
    { label: "Case Studies", value: "case-study" },
  ]

  return (
    <main className="relative min-h-screen w-full bg-background">
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`shader-fixed-height fixed inset-0 z-0 transition-opacity duration-700 pointer-events-none ${isLoaded ? "opacity-100" : "opacity-0"}`}
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

      <div className="relative z-10 px-6 pt-24 pb-20 md:px-12 md:pt-32">
        <div className="mx-auto max-w-6xl">

          {/* Compact Hero — headline changes with filter */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm text-foreground/60 mb-2 uppercase tracking-wide">Resources</p>
            <h1 className="mb-3 font-sans text-4xl tracking-tight text-foreground md:text-5xl font-semibold">
              {heading}
            </h1>
            <p className="max-w-2xl text-foreground/70 text-base md:text-lg">
              {subheading}
            </p>
          </div>

          {/* Filter pills — always visible, horizontal scroll on mobile */}
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            <div
              className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory md:flex-wrap md:overflow-visible md:pb-0"
              style={{ scrollbarWidth: "none" }}
            >
              {pills.map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => handleFilterChange(pill.value)}
                  className={`flex-shrink-0 snap-start px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === pill.value
                      ? "bg-foreground/20 text-foreground border border-foreground/30"
                      : "bg-foreground/5 text-foreground/70 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10"
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics row — only for case-study filter */}
          {filter === "case-study" && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="flex flex-col p-4 rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm"
                >
                  <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs text-foreground/60 leading-tight">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {filteredArticles.length === 0 && (
            <p className="py-24 text-center text-foreground/50 text-base">
              No {emptyLabel} yet.
            </p>
          )}

          {/* Featured Article */}
          {featuredArticle && (
            <Link
              href={`/resources/${featuredArticle.slug}`}
              className="group mb-10 block animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
            >
              <article className="flex flex-col md:flex-row gap-6 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10 p-6">
                {featuredArticle.imageUrl && (
                  <div className="md:w-2/5 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-foreground/60 uppercase tracking-wide">Featured</span>
                      <span className="text-xs text-foreground/60 bg-foreground/5 px-2 py-1 rounded-full">
                        {featuredArticle.type}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2 transition-colors group-hover:text-foreground/90">
                      {featuredArticle.title}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 mt-4 text-sm text-foreground/60">
                    <Clock className="h-4 w-4" />
                    <span>{featuredArticle.readTime}</span>
                    <span>•</span>
                    <span>{formatDate(featuredArticle.date)}</span>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Article Grid */}
          {gridArticles.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {gridArticles.map((article, index) => (
                <Link
                  key={article.id}
                  href={`/resources/${article.slug}`}
                  className="group animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                  style={{ animationDelay: `${(index + 3) * 50}ms` }}
                >
                  <article className="h-full flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10">
                    {article.imageUrl && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-2 mb-3 text-xs text-foreground/60">
                        <span className="rounded-full bg-foreground/10 px-2 py-1">{article.type}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2 line-clamp-2 transition-colors group-hover:text-foreground/90">
                        {article.title}
                      </h3>
                      <div className="mt-auto text-xs text-foreground/50">{formatDate(article.date)}</div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
