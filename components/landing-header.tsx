"use client"

import Link from "next/link"
import Image from "next/image"
import { MagneticButton } from "@/components/magnetic-button"

interface LandingHeaderProps {
  isLoaded?: boolean
}

export function LandingHeader({ isLoaded = true }: LandingHeaderProps) {
  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 transition-transform cursor-pointer">
        <div className="relative h-8 w-auto">
          <Image
            src="https://storage.googleapis.com/spring-assets-prod/website/logo.svg"
            alt="Upspring"
            width={140}
            height={32}
            className="h-full w-auto object-contain"
            priority
          />
        </div>
      </Link>

      <MagneticButton
        variant="primary"
        onClick={() => window.open("https://calendar.notion.so/meet/rdahan/4zrqx3rwm", "_blank")}
      >
        Book a Demo
      </MagneticButton>
    </nav>
  )
}
