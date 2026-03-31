"use client"

import { Shader, Swirl } from "shaders/react"
import { GrainOverlay } from "@/components/grain-overlay"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useRef, useEffect, useState } from "react"

export default function RefundPolicyPage() {
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
        <section className="flex w-full items-center px-4 py-32 md:px-12 md:py-40 lg:px-16">
          <div className="mx-auto w-full max-w-4xl">
            <h1 className="mb-4 font-sans text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-6xl">
              Refund Policy
            </h1>
            <p className="mb-12 font-mono text-sm text-foreground/60">Effective Date: Feb 25th, 2025</p>

            <div className="prose prose-invert max-w-none space-y-8">
              <p className="text-foreground/80 leading-relaxed">
                At SPRING AI TECH LTD, we strive to ensure our customers are satisfied with our Service. However, we
                understand that circumstances may require refunds. This policy outlines our refund terms:
              </p>

              {/* General Refund Conditions */}
              <div className="space-y-4">
                <h2 className="font-sans text-2xl font-semibold text-foreground">General Refund Conditions</h2>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>
                    Refunds are only available for first-time subscribers who cancel within 7 days of their initial
                    purchase.
                  </li>
                  <li>Refund requests must be submitted to info@upspring.ai within the eligible period.</li>
                </ul>
              </div>

              {/* Non-Refundable Cases */}
              <div className="space-y-4">
                <h2 className="font-sans text-2xl font-semibold text-foreground">Non-Refundable Cases</h2>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Subscription renewals are not eligible for refunds.</li>
                  <li>No refunds for accounts terminated due to a breach of our Terms of Service.</li>
                  <li>Partial refunds are not available for downgrades or unused portions of the Service.</li>
                </ul>
              </div>

              {/* Processing Refunds */}
              <div className="space-y-4">
                <h2 className="font-sans text-2xl font-semibold text-foreground">Processing Refunds</h2>
                <ul className="list-disc pl-6 space-y-2 text-foreground/80">
                  <li>Approved refunds will be processed within 10 business days.</li>
                  <li>Refunds will be issued to the original payment method.</li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4 pt-8 border-t border-foreground/10">
                <p className="text-foreground/80 leading-relaxed">
                  If you have any questions about these Terms or the Refund Policy, or any refund inquiries, please
                  contact{" "}
                  <a
                    href="mailto:info@upspring.ai"
                    className="text-foreground underline hover:text-foreground/70 transition-colors"
                  >
                    info@upspring.ai
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer id="contact" />
      </div>
    </main>
  )
}
