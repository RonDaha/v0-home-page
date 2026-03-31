"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import type { NotionArticle } from "@/lib/notion"
import { appendUtmParams } from "@/lib/utm-utils"

interface ArticleClientProps {
  article: NotionArticle
}

export function ArticleClient({ article }: ArticleClientProps) {
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
      month: "long",
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

      <div className="relative z-10 px-6 pt-32 pb-20 md:px-12 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row lg:gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <Link
                href="/resources"
                className="mb-8 inline-flex items-center gap-2 text-foreground/60 transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Link>

              <article className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="mb-6 flex items-center gap-4 text-sm text-foreground/60">
                  <span className="rounded-full bg-foreground/10 px-3 py-1">{article.type}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                  <span>{formatDate(article.date)}</span>
                </div>

                <h1 className="mb-8 font-sans text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  {article.title}
                </h1>

                {article.imageUrl && (
                  <div className="mb-10 overflow-hidden rounded-2xl">
                    <img
                      src={article.imageUrl || "/placeholder.svg"}
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div
                  className="prose prose-invert max-w-none prose-headings:font-medium prose-headings:text-foreground prose-p:text-foreground/80 prose-a:text-foreground prose-a:underline prose-strong:text-foreground prose-li:text-foreground/80 prose-blockquote:border-foreground/20 prose-blockquote:text-foreground/70 prose-code:text-foreground/90 prose-pre:bg-foreground/10 prose-pre:backdrop-blur-md"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </article>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:w-80 xl:w-96">
              <div className="sticky top-32">
                <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-6">
                  <h3 className="mb-4 text-xl font-semibold text-foreground">
                    Your Top Creatives Insights Are Waiting
                  </h3>
                  <img
                    src="/images/top-creatives-preview.png"
                    alt="Top Creatives Analytics Preview"
                    className="mb-4 w-full rounded-lg"
                  />
                  <p className="mb-6 text-sm text-foreground/70">
                    Discover which ads are driving your best results. Analyze your creative performance for free.
                  </p>
                  <a
                    href={appendUtmParams(
                      "https://app.upspring.ai/auth/register?utm_campaign=home&utm_source=article_sidebar",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-full bg-foreground py-3 text-center font-medium text-background transition-all hover:bg-foreground/90"
                  >
                    Start Free
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}
