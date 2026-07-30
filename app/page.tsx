"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { MagneticButton } from "@/components/magnetic-button"
import { AdAnalysisRoller } from "@/components/ad-analysis-roller"
import { useRef, useEffect, useState } from "react"
import { openWithUtm } from "@/lib/utm-utils"
import { ArrowUpRight } from "lucide-react"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const setShaderHeight = () => {
      if (shaderContainerRef.current && window.innerWidth < 768) {
        // Lock to initial viewport height on mobile
        shaderContainerRef.current.style.height = `${window.innerHeight}px`
      } else if (shaderContainerRef.current) {
        // Reset on desktop
        shaderContainerRef.current.style.height = ""
      }
    }

    // Set initial height
    setShaderHeight()

    // Only update on orientation change, not on scroll
    window.addEventListener("orientationchange", setShaderHeight)

    return () => {
      window.removeEventListener("orientationchange", setShaderHeight)
    }
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
    if (isLoaded && window.location.hash === "#contact") {
      const timer = setTimeout(() => {
        const contactElement = document.getElementById("contact")
        if (contactElement) {
          contactElement.scrollIntoView({ behavior: "smooth" })
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      const sections = document.querySelectorAll("section[id^='section-']")

      sections.forEach((section, index) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen w-full bg-background overflow-x-hidden">
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

      <Header isLoaded={isLoaded} currentSection={currentSection} />

      <div
        className={`relative z-10 flex flex-col w-full transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <section
          id="section-0"
          className="flex min-h-screen w-full flex-col px-6 pb-16 pt-20 md:pt-24 md:px-12 md:pb-24"
        >
          <div className="mx-auto w-full max-w-[1800px] flex flex-col lg:flex-row justify-between gap-4 md:gap-12 lg:gap-8 flex-1 lg:items-end min-[1600px]:items-center justify-center lg:justify-between">
            <div className="max-w-3xl w-full flex-shrink pb-2 lg:pb-0">
              <a
                href="https://claude.ai/directory/connectors/upspring"
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-5 inline-flex animate-in fade-in slide-in-from-bottom-4 items-center gap-2 rounded-full bg-white/95 py-1.5 pl-2 pr-4 shadow-sm backdrop-blur-md transition-all duration-300 delay-100 hover:bg-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D97757]/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/icons/claude.svg" alt="" aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-black">
                  Official Claude Connector
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-black/60 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-black" />
              </a>
              <h1 className="mb-4 md:mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-6xl lg:text-7xl">
                <span className="text-balance font-semibold leading-6">The Creative Intelligence platform</span>
              </h1>
              <p className="mb-6 md:mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
                <span className="text-pretty">
                  Unlock growth from your paid ads with powerful AI-driven creative intelligence
                </span>
              </p>
              <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
                <MagneticButton
                  size="lg"
                  variant="primary"
                  onClick={() => {
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  Book a Demo
                </MagneticButton>
                <MagneticButton
                  size="lg"
                  variant="secondary"
                  onClick={() => openWithUtm("https://app.upspring.ai/auth/register?utm_campaign=home&utm_source=hero")}
                >
                  Start Free
                </MagneticButton>
              </div>
            </div>
            <AdAnalysisRoller />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500"></div>
        </section>
        <ServicesSection id="section-1" />
        <AboutSection id="section-2" scrollToSection={scrollToSection} />
        <WorkSection id="section-3" />
        <Footer id="contact" />
      </div>
    </main>
  )
}
