"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef, useMemo } from "react"
import { Clock } from "lucide-react"
import Link from "next/link"
import type { NotionArticle } from "@/lib/notion"

interface ResourcesClientProps {
  articles: NotionArticle[]
}

export function ResourcesClient({ articles }: ResourcesClientProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  const categories = useMemo(() => {
    const types = new Set(articles.map((a) => a.type).filter(Boolean))
    return Array.from(types).sort()
  }, [articles])

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return articles
    return articles.filter((a) => a.type === selectedCategory)
  }, [articles, selectedCategory])

  const featuredArticle = useMemo(() => {
    return filteredArticles.length > 0 ? filteredArticles[0] : null
  }, [filteredArticles])

  const gridArticles = useMemo(() => {
    return filteredArticles.slice(1)
  }, [filteredArticles])

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

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
          {/* Compact Hero */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm text-foreground/60 mb-2 uppercase tracking-wide">Resources</p>
            <h1 className="mb-4 font-sans text-4xl tracking-tight text-foreground md:text-5xl font-semibold">
              Learn from our insights
            </h1>
            <p className="max-w-2xl text-foreground/70 text-base md:text-lg">
              Guides, strategies, and deep dives to help you scale creative performance.
            </p>
          </div>

          {/* Category Filters */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-foreground/20 text-foreground border border-foreground/30"
                    : "bg-foreground/5 text-foreground/70 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-foreground/20 text-foreground border border-foreground/30"
                      : "bg-foreground/5 text-foreground/70 border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <Link
              href={`/resources/${featuredArticle.slug}`}
              className="group mb-12 block animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
            >
              <article className="flex flex-col md:flex-row gap-6 overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10 p-6">
                {featuredArticle.imageUrl && (
                  <div className="md:w-2/5 flex-shrink-0">
                    <img
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="h-full w-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
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

          {/* Grid Articles */}
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
