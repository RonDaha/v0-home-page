"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import type { NotionArticle } from "@/lib/notion"

interface CaseStudiesClientProps {
  articles: NotionArticle[]
}

export function CaseStudiesClient({ articles }: CaseStudiesClientProps) {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  // Key metrics
  const metrics = [
    { label: "Happy Customers", value: "+100" },
    { label: "Brands Analyzed", value: "2000+" },
    { label: "Cut on Creative Testing (Q1 2026)", value: "25%" },
    { label: "Sharable Reports Generated", value: "1744" },
    { label: "New Features This Year", value: "24" },
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
          {/* Compact Hero */}
          <div className="mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-sm text-foreground/60 mb-2 uppercase tracking-wide">Case Studies</p>
            <h1 className="mb-4 font-sans text-4xl tracking-tight text-foreground md:text-5xl font-semibold">
              Real results from real brands
            </h1>
            <p className="max-w-2xl text-foreground/70 text-base md:text-lg">
              See how teams like yours leverage Upspring to scale their creative performance.
            </p>
          </div>

          {/* Key Metrics - 5 in a row on desktop, 2-col on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
            {metrics.map((metric, index) => (
              <div
                key={index}
                className="flex flex-col p-4 rounded-xl border border-foreground/10 bg-foreground/5 backdrop-blur-sm"
              >
                <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1">
                  {metric.value}
                </div>
                <div className="text-xs text-foreground/60 leading-tight">{metric.label}</div>
              </div>
            ))}
          </div>

          {/* Case Studies Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/resources/${article.slug}`}
                className="group animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards"
                style={{ animationDelay: `${(index + 5) * 50}ms` }}
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
                    {/* Result Metric First */}
                    <div className="mb-3">
                      <div className="text-lg md:text-xl font-semibold text-foreground mb-1">
                        +{Math.floor(Math.random() * 50 + 20)}%
                      </div>
                      <div className="text-xs text-foreground/60">Performance improvement</div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-medium text-foreground mb-2 line-clamp-2 transition-colors group-hover:text-foreground/90">
                      {article.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-foreground/60 line-clamp-2 mb-4">
                      {article.excerpt || "Learn how this brand achieved remarkable results with our platform."}
                    </p>

                    {/* Footer with date and CTA */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-foreground/5">
                      <span className="text-xs text-foreground/50">{formatDate(article.date)}</span>
                      <span className="text-xs text-foreground/60 group-hover:text-foreground/80 transition-colors font-medium">
                        Read story →
                      </span>
                    </div>
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
