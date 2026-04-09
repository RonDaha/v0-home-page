"use client"

import { Mail, ArrowRight } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import { submitToHubspot } from "@/actions/submit-to-hubspot"
import { submitToAttio } from "@/actions/submit-to-attio"

export function Footer({ id = "contact" }: { id?: string }) {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    adSpend: "",
    website: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [websiteError, setWebsiteError] = useState(false)

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return false

    const parts = email.split("@")
    if (parts.length !== 2) return false

    const domain = parts[1]
    const domainParts = domain.split(".")
    const tld = domainParts[domainParts.length - 1]

    return tld.length >= 2 && /^[a-zA-Z]+$/.test(tld)
  }

  const isValidWebsite = (url: string) => {
    if (!url) return true // Optional field
    const pattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/
    return pattern.test(url.trim())
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.businessType || !formData.adSpend || !formData.message) {
      return
    }

    if (!isValidEmail(formData.email)) {
      setSubmitError(true)
      setTimeout(() => setSubmitError(false), 5000)
      return
    }

    if (formData.website && !isValidWebsite(formData.website)) {
      setWebsiteError(true)
      return
    }

    setIsSubmitting(true)
    setSubmitError(false)
    setWebsiteError(false)

    const [hubspotResult, attioResult] = await Promise.allSettled([
      submitToHubspot(formData),
      submitToAttio({
        email: formData.email,
        name: formData.name,
        website: formData.website,
        businessType: formData.businessType,
        monthlySpend: formData.adSpend,
        message: formData.message,
      }),
    ])

    setIsSubmitting(false)

    const hubspotSuccess = hubspotResult.status === "fulfilled" && hubspotResult.value.success

    if (attioResult.status === "rejected") {
      console.log("[v0] Attio submission failed but continuing:", attioResult.reason)
    } else if (!attioResult.value.success) {
      console.log("[v0] Attio submission unsuccessful but continuing:", attioResult.value.error)
    }

    if (hubspotSuccess) {
      setSubmitSuccess(true)
      setFormData({ name: "", email: "", businessType: "", adSpend: "", website: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 5000)
    } else {
      setSubmitError(true)
      setTimeout(() => setSubmitError(false), 5000)
    }
  }

  return (
    <footer id={id} ref={ref} className="flex min-h-screen w-full items-center px-4 py-20 md:px-12 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center order-2 md:order-1">
            <div
              className={`mb-12 hidden transition-all duration-700 md:block ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-7xl font-light leading-[1.05] tracking-tight text-foreground lg:text-8xl">
                Unlock
                <br />
                potential
              </h2>
              <p className="font-mono text-base text-foreground/60">/ Start your journey</p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                <a
                  href="/for-agencies"
                  className="group flex items-center gap-2 text-base text-foreground transition-colors hover:text-foreground/70 md:text-xl"
                >
                  <span>Upspring for Agencies</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/shopify"
                  className="group mt-4 flex items-center gap-2 text-base text-foreground transition-colors hover:text-foreground/70 md:text-xl"
                >
                  <span>Upspring for Shopify</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/applovin"
                  className="group mt-4 flex items-center gap-2 text-base text-foreground transition-colors hover:text-foreground/70 md:text-xl"
                >
                  <span>Upspring for Applovin</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <a
                href="mailto:hello@upspring.ai"
                className={`group block transition-all duration-700 mt-8 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">Email</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  info@upspring.ai
                </p>
              </a>

              <a
                href="https://help.upspring.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "250ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="font-mono text-xs text-foreground/60">Support</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  Help center
                </p>
              </a>

              <div
                className={`flex flex-col gap-4 pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <div className="flex gap-4">
                  {[
                    { label: "Twitter", link: "https://x.com/upspringai" },
                    { label: "LinkedIn", link: "https://www.linkedin.com/company/upspring-ai" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href="/privacy-policy"
                    className="border-b border-transparent font-mono text-xs text-foreground/40 transition-all hover:border-foreground/40 hover:text-foreground/70"
                  >
                    Privacy Policy
                  </a>
                  <a
                    href="/terms-of-use"
                    className="border-b border-transparent font-mono text-xs text-foreground/40 transition-all hover:border-foreground/40 hover:text-foreground/70"
                  >
                    Terms of Use
                  </a>
                  <a
                    href="/refund-policy"
                    className="border-b border-transparent font-mono text-xs text-foreground/40 transition-all hover:border-foreground/40 hover:text-foreground/70"
                  >
                    Refund Policy
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center order-1 md:order-2">
            <div
              className={`mb-6 block transition-all duration-700 md:hidden ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground">
                Unlock
                <br />
                potential
              </h2>
              <p className="font-mono text-xs text-foreground/60">/ Start your journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <label className="mb-1 block font-mono text-xs md:mb-2 text-card-foreground">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base border-card-foreground"
                    placeholder="Your name"
                  />
                </div>

                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "250ms" }}
                >
                  <label className="mb-1 block font-mono text-xs md:mb-2 text-card-foreground">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base border-card-foreground"
                    placeholder="your@email.com"
                  />
                </div>

                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <label className="mb-1 block font-mono text-xs md:mb-2 text-card-foreground">Business Type</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    required
                    className="w-full border-b bg-transparent py-1.5 text-sm text-foreground focus:border-foreground/50 focus:outline-none md:py-2 md:text-base border-card-foreground"
                  >
                    <option value="" disabled>
                      Select business type
                    </option>
                    <option value="Brand">Brand</option>
                    <option value="Agency">Agency</option>
                    <option value="SaaS">SaaS</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div
                  className={`transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "350ms" }}
                >
                  <label className="mb-1 block font-mono text-xs md:mb-2 text-card-foreground">Monthly Ad Spend</label>
                  <select
                    value={formData.adSpend}
                    onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                    required
                    className="w-full border-b bg-transparent py-1.5 text-sm text-foreground focus:border-foreground/50 focus:outline-none md:py-2 md:text-base border-card-foreground"
                  >
                    <option value="" disabled>
                      Select monthly ad spend
                    </option>
                    <option value="under-50k">Under $50K</option>
                    <option value="50k-100k">$50K - $100K</option>
                    <option value="100k-500k">$100K - $500K</option>
                    <option value="500k-1m">$500K - $1M</option>
                    <option value="over-1m">Over $1M</option>
                  </select>
                </div>

                <div
                  className={`md:col-span-2 transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <label className="mb-1 block font-mono text-xs md:mb-2 text-card-foreground">Website URL</label>
                  <input
                    type="text"
                    value={formData.website}
                    onChange={(e) => {
                      setFormData({ ...formData, website: e.target.value })
                      if (websiteError) setWebsiteError(false)
                    }}
                    className={`w-full border-b bg-transparent py-1.5 text-sm placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base text-foreground ${
                      websiteError ? "border-red-400" : "border-card-foreground"
                    }`}
                    placeholder="yourwebsite.com"
                  />
                  {websiteError && (
                    <p className="mt-1 font-mono text-xs text-red-400">
                      Please enter a valid website (e.g., yourwebsite.com)
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                <label className="mb-1 block font-mono text-xs md:mb-2 text-card-foreground">Message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b bg-transparent py-1.5 text-sm placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base text-foreground border-card-foreground"
                  placeholder="Tell us about your business..."
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50"
                  onClick={isSubmitting ? undefined : undefined}
                >
                  {isSubmitting ? "Sending..." : "Book a Demo"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-foreground/80">Message sent successfully!</p>
                )}
                {submitError && (
                  <p className="mt-3 text-center font-mono text-sm text-red-400">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        <div
          className={`mt-16 pt-8 border-t border-foreground/10 text-center transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <p className="font-mono text-xs text-foreground/40">
            Copyright © {new Date().getFullYear()} Upspring.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
