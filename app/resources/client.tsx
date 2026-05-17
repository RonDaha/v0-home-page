"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMemo, Suspense } from "react"
import { Clock, FileQuestion, ChevronDown } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import type { NotionArticle } from "@/lib/notion"
import { cn } from "@/lib/utils"

interface ResourcesClientProps {
  articles: NotionArticle[]
}

type FilterValue = "all" | "blog" | "case-study"

const METRICS = [
  { label: "Cut on Creative Testing (Q1 2026)", value: "25%", hero: true },
  { label: "Happy Customers", value: "+100" },
  { label: "Brands Analyzed", value: "2000+" },
  { label: "Sharable Reports Generated", value: "1744" },
]

const PILLS: { label: string; value: FilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Blog", value: "blog" },
  { label: "Case Studies", value: "case-study" },
]

function ResourcesInner({ articles }: ResourcesClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

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

  const filteredArticles = useMemo(() => {
    if (filter === "blog") return articles.filter((a) => a.type !== "Case Study")
    if (filter === "case-study") return articles.filter((a) => a.type === "Case Study")
    return articles
  }, [articles, filter])

  const featuredArticle = useMemo(() => {
    if (filteredArticles.length === 0) return null
    const flagged = filteredArticles.find((a) => (a as any).featured === true)
    return flagged ?? filteredArticles[0]
  }, [filteredArticles])

  const gridArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles
    return filteredArticles.filter((a) => a.id !== featuredArticle.id)
  }, [filteredArticles, featuredArticle])

  const heading =
    filter === "case-study" ? "Real results from real brands" : "Learn from our insights"
  const subheading =
    filter === "case-study"
      ? "See how teams like yours leverage Upspring to scale their creative performance."
      : "Guides, strategies, and deep dives to help you scale creative performance."
  const emptyLabel =
    filter === "blog" ? "blog posts" : filter === "case-study" ? "case studies" : "resources"

  const activeLabel = PILLS.find((p) => p.value === filter)?.label ?? "All"

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })

  return (
    <main className="relative min-h-screen w-full bg-background">
      {/* ── Header ── */}
      <Header isLoaded />

      {/* ── Hero band — gradient fades to bg-background ── */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
        {/* Radial gradient constrained to this band */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, var(--hero-gradient-from), var(--hero-gradient-to))",
          }}
        />
        <div className="relative container mx-auto px-4">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-foreground/70 mb-4">
            Resources
          </p>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] text-foreground max-w-3xl">
            {heading}
          </h1>
          <p className="text-base md:text-xl text-foreground/70 max-w-2xl mt-6">
            {subheading}
          </p>
        </div>
      </section>

      {/* ── Content band — solid bg-background ── */}
      <div className="bg-background">

        {/* ── Sticky filter pills ── */}
        <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {PILLS.map((pill) => (
              <button
                key={pill.value}
                onClick={() => handleFilterChange(pill.value)}
                className={cn(
                  "flex-shrink-0 snap-start rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  filter === pill.value
                    ? "bg-foreground text-background"
                    : "bg-transparent text-muted-foreground border border-border hover:text-foreground hover:border-foreground/40"
                )}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Metrics (case-study only) ── */}
        {filter === "case-study" && (
          <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
              {/* Hero metric */}
              <div className="md:col-span-5">
                <div className="text-6xl md:text-9xl font-bold tracking-tight leading-none text-foreground">
                  {METRICS[0].value}
                </div>
                <div className="text-sm uppercase tracking-wider text-muted-foreground mt-4">
                  {METRICS[0].label}
                </div>
              </div>
              {/* Supporting metrics */}
              <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6">
                {METRICS.slice(1).map((m) => (
                  <div
                    key={m.label}
                    className="border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6"
                  >
                    <div className="text-3xl md:text-4xl font-semibold text-foreground">
                      {m.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mt-2">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Empty state ── */}
        {filteredArticles.length === 0 && (
          <div className="container mx-auto px-4 py-24 text-center">
            <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="text-lg font-medium mt-4 text-foreground">
              No {emptyLabel} yet
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Check back soon for new content.
            </p>
          </div>
        )}

        {/* ── Featured card — full-bleed 21:9 ── */}
        {featuredArticle && (
          <div className="container mx-auto px-4 mt-12">
            <Link
              href={`/resources/${featuredArticle.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-border
                aspect-[4/5] sm:aspect-[21/9]"
            >
              {featuredArticle.imageUrl && (
                <Image
                  src={featuredArticle.imageUrl}
                  alt={featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Featured</Badge>
                  <Badge>{featuredArticle.type}</Badge>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold leading-tight text-foreground max-w-3xl">
                  {featuredArticle.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{featuredArticle.readTime}</span>
                  <span>·</span>
                  <span>{formatDate(featuredArticle.date)}</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* ── Card grid ── */}
        {gridArticles.length > 0 && (
          <section className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/resources/${article.slug}`}
                  className="group"
                >
                  <Card className="h-full cursor-pointer transition-colors hover:border-foreground/20 overflow-hidden">
                    {article.imageUrl && (
                      <CardHeader className="p-0">
                        <div className="aspect-video relative overflow-hidden rounded-t-lg">
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      </CardHeader>
                    )}
                    <CardContent className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <p className="text-lg font-semibold leading-tight line-clamp-2 text-foreground transition-colors group-hover:text-foreground/80">
                        {article.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(article.date)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      {/* ── Footer ── */}
      <Footer />
    </main>
  )
}

export function ResourcesClient({ articles }: ResourcesClientProps) {
  return (
    <Suspense fallback={null}>
      <ResourcesInner articles={articles} />
    </Suspense>
  )
}
