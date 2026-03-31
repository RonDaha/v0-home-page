"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { Check } from "lucide-react"
import { openWithUtm } from "@/lib/utm-utils"

interface PricingFeature {
  text: string
  included: boolean
}

interface PricingCardProps {
  name: string
  monthlyPrice: number | null
  yearlyPrice: number | null
  description: string
  features: PricingFeature[]
  isPopular?: boolean
  ctaText?: string
  ctaLink?: string
  index: number
  isYearly: boolean
}

export function PricingCard({
  name,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  isPopular = false,
  ctaText = "Get Started",
  ctaLink = "#",
  index,
  isYearly,
}: PricingCardProps) {
  const displayPrice = monthlyPrice === null ? "Custom" : `$${isYearly ? yearlyPrice : monthlyPrice}`

  const handleClick = () => {
    if (ctaLink === "#contact") {
      const contactSection = document.getElementById("contact")
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      openWithUtm(ctaLink)
    }
  }

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
        isPopular
          ? "border-foreground/40 bg-foreground/20 shadow-xl backdrop-blur-xl"
          : "border-foreground/25 bg-foreground/15 backdrop-blur-lg hover:bg-foreground/20"
      }`}
    >
      {isPopular && (
        <div className="absolute -right-8 top-6 rotate-45 bg-gradient-to-r from-[#ee6464] to-[#f59e0b] px-10 py-1 text-xs font-semibold text-white">
          POPULAR
        </div>
      )}

      <div className="mb-8">
        <h3 className="mb-2 font-sans text-xl font-semibold text-foreground">{name}</h3>
        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="font-sans text-4xl font-bold text-foreground">{displayPrice}</span>
            {displayPrice !== "Custom" && <span className="text-sm text-foreground">/mo</span>}
          </div>
          {displayPrice !== "Custom" && (
            <p className="text-xs text-foreground/70">(billed {isYearly ? "yearly" : "monthly"})</p>
          )}
        </div>
        <p className="text-sm leading-relaxed text-foreground">{description}</p>
      </div>

      <div className="mb-8 flex-1">
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
              <div
                className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                  feature.included ? "bg-foreground text-background" : "bg-foreground/20 text-foreground/40"
                }`}
              >
                <Check className="h-2.5 w-2.5" />
              </div>
              <span className={feature.included ? "" : "text-foreground"}>{feature.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <MagneticButton
        variant={isPopular ? "primary" : "secondary"}
        className="mt-auto w-full justify-center"
        onClick={handleClick}
      >
        {ctaText}
      </MagneticButton>
    </div>
  )
}
