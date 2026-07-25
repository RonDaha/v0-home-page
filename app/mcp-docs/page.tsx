"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useRef, useEffect, useState } from "react"
import { Search, Layers, GitCompare, FileText, Sparkles, BarChart3, Plus } from "lucide-react"

const setupSteps = [
  {
    title: "Have an Upspring account",
    body: "The connector uses your existing Upspring login and workspace — sign up at upspring.ai if you're new.",
  },
  {
    title: "Add the connector in Claude",
    body: "In Claude, open Settings → Connectors, find Upspring in the directory, and click Connect.",
  },
  {
    title: "Approve access",
    body: "You'll be sent to Upspring to sign in and approve the connection on a consent screen, then choose which workspace to connect.",
  },
  {
    title: "Ask away",
    body: "Claude now has the Upspring tools available in your conversations — it uses them automatically when your question calls for ad intelligence.",
  },
]

const capabilities = [
  {
    icon: Search,
    title: "Research any market's creative",
    body: "Search and filter analyzed ads by market, category, format, and creative dimensions; see what's winning by real audience signals; get share-of-market distributions.",
  },
  {
    icon: Layers,
    title: "Break down any brand's strategy",
    body: "A full creative playbook per advertiser: their signature angles, personas, hook themes with verbatim examples, top ads — plus what people say about the brand on Reddit, when available.",
  },
  {
    icon: GitCompare,
    title: "Compare brands head-to-head",
    body: "Divergences, whitespace (what one brand does that the other doesn't), and shared cultural trends between any two advertisers.",
  },
  {
    icon: FileText,
    title: "Deep-dive individual ads",
    body: "The complete textual record of any analyzed ad: scene-by-scene narration, claims, voice, hook, offer, and landing-page context — everything needed to understand a creative without watching it.",
  },
  {
    icon: Sparkles,
    title: "Find similar ads",
    body: "From a reference ad, a description, or an image/video URL — surface lookalikes from the corpus.",
  },
  {
    icon: BarChart3,
    title: "Read your own performance",
    body: "With connected ad accounts: account summaries, per-ad performance sortable by any metric (spend, ROAS, CTR, CPA, hook rate…), your top ads, your creative patterns, and your brand profile.",
  },
  {
    icon: Plus,
    title: "Extend coverage",
    body: "If a brand isn't analyzed yet, Claude can find it and request onboarding — new brands are typically ready within minutes.",
  },
]

const examplePrompts = [
  "What hooks are winning in skincare ads right now?",
  "Break down Tatcha's creative strategy.",
  "Compare Rippling and Deel's ad approaches — where's the whitespace?",
  "Show our top 10 ads by ROAS last quarter and what they have in common.",
  "How does our creative style compare to what's working in our market?",
  "Find ads similar to this one and tell me what they share.",
  "We're launching a greens powder — what creative patterns should we test?",
]

const faqs = [
  {
    q: "Do I need a paid Claude plan?",
    a: "The connector works wherever Claude supports connectors. You need an Upspring account.",
  },
  {
    q: "What can Claude see?",
    a: "Only what your Upspring account can see: the analyzed ad-intelligence corpus, plus your own advertising data if your workspace has connected ad accounts. Claude's requests reach Upspring as structured tool calls — Upspring never receives your Claude conversations.",
  },
  {
    q: "Does the connector change anything in my ad accounts?",
    a: "No. The connector is read-only toward your advertising — it cannot create, edit, or launch campaigns.",
  },
  {
    q: "Which ad platforms are covered?",
    a: "The competitive corpus covers Meta ads. Own-ads performance covers the ad accounts you've connected in Upspring.",
  },
  {
    q: "Something's not working.",
    a: "Contact us at info@upspring.ai — include what you asked Claude and roughly when.",
  },
]

export default function McpDocsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

      <Header isLoaded={isLoaded} currentSection={0} />

      <div
        className={`relative z-10 flex flex-col w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <article className="mx-auto w-full max-w-4xl px-4 py-24 md:px-12 md:py-32 lg:px-16">
          {/* Hero */}
          <p className="mb-4 font-mono text-sm uppercase tracking-widest text-foreground/60">Upspring for Claude</p>
          <h1 className="mb-6 font-sans text-4xl font-semibold tracking-tight text-balance text-foreground md:text-5xl lg:text-6xl">
            Bring ad creative intelligence into every Claude conversation
          </h1>
          <p className="mb-12 max-w-2xl text-lg text-pretty text-foreground/80">
            Research what competitors run and why it works, map winning creative patterns in any market, and — with your
            ad accounts connected — put your own performance next to the market&apos;s. All grounded in real ads, already
            analyzed into text Claude can reason about.
          </p>

          <div className="prose prose-invert max-w-none space-y-16 text-foreground/80">
            {/* What it is */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">What it is</h2>
              <p>
                Upspring analyzes Meta ads into structured, readable intelligence: labeled creative dimensions (hook
                archetype, persona, persuasion mechanism), verbatim hooks, full creative narrations, and landing-page
                context. The Upspring connector gives Claude direct access to that intelligence — so instead of Claude
                guessing about advertising, it answers from analyzed creative.
              </p>
              <p className="text-foreground">Two kinds of questions, one connector:</p>
              <ul className="list-disc space-y-2 pl-6">
                <li>
                  <strong className="text-foreground">Market questions</strong> — &ldquo;What&apos;s winning in skincare
                  ads right now?&rdquo; Claude searches the analyzed corpus, ranks by real audience signals, and explains
                  the creative patterns with verbatim examples.
                </li>
                <li>
                  <strong className="text-foreground">Your questions</strong> — &ldquo;How did our ads do last month,
                  and how do we compare?&rdquo; With your ad accounts connected in Upspring, Claude reads your actual
                  performance (spend, ROAS, CPA) and your creative patterns alongside the market&apos;s.
                </li>
              </ul>
            </section>

            {/* Setup */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Setup (2 minutes)</h2>
              <ol className="grid gap-4 sm:grid-cols-2">
                {setupSteps.map((step, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md"
                  >
                    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-background">
                      {i + 1}
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-foreground/70">{step.body}</p>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-foreground/70">
                To disconnect at any time: remove the connector in Claude&apos;s settings — this immediately revokes
                Upspring&apos;s access tokens.
              </p>
            </section>

            {/* Capabilities */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">What Claude can do with Upspring</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {capabilities.map((cap, i) => {
                  const Icon = cap.icon
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-md"
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/10">
                        <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                      </div>
                      <h3 className="mb-2 font-semibold text-foreground">{cap.title}</h3>
                      <p className="text-sm leading-relaxed text-foreground/70">{cap.body}</p>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Example prompts */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">Example prompts</h2>
              <ul className="space-y-3">
                {examplePrompts.map((prompt, i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-foreground/10 bg-foreground/5 px-5 py-4 font-mono text-sm text-foreground/90 backdrop-blur-md"
                  >
                    &ldquo;{prompt}&rdquo;
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ */}
            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground md:text-3xl">FAQ</h2>
              <dl className="space-y-6">
                {faqs.map((faq, i) => (
                  <div key={i} className="border-b border-foreground/10 pb-6 last:border-b-0">
                    <dt className="mb-2 font-semibold text-foreground">{faq.q}</dt>
                    <dd className="text-foreground/70">
                      {faq.q === "What can Claude see?" ? (
                        <>
                          {faq.a}{" "}
                          <a
                            href="/privacy-policy"
                            className="text-foreground underline hover:text-foreground/70"
                          >
                            Privacy Policy
                          </a>
                          .
                        </>
                      ) : faq.q === "Something's not working." ? (
                        <>
                          Contact us at{" "}
                          <a
                            href="mailto:info@upspring.ai"
                            className="text-foreground underline hover:text-foreground/70"
                          >
                            info@upspring.ai
                          </a>{" "}
                          — include what you asked Claude and roughly when.
                        </>
                      ) : (
                        faq.a
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </article>

        <Footer id="contact" />
      </div>
    </main>
  )
}
