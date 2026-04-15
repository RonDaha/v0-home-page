"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MagneticButton } from "@/components/magnetic-button"
import Image from "next/image"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState, useEffect } from "react"
import { openWithUtm } from "@/lib/utm-utils"

interface HeaderProps {
  isLoaded: boolean
  currentSection?: number
  hideContactLink?: boolean
}

export function Header({ isLoaded, currentSection, hideContactLink = false }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Resources", href: "/resources" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", action: scrollToContact },
  ].filter((item) => !hideContactLink || item.name !== "Contact")

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Link href="/" onClick={scrollToTop} className="flex items-center gap-2 transition-transform cursor-pointer">
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

      <div
        className={`hidden items-center gap-8 md:flex rounded-full px-8 py-3 transition-all duration-300 absolute left-1/2 -translate-x-1/2 ${
          hasScrolled ? "bg-foreground/15 backdrop-blur-sm" : ""
        }`}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href

          if (item.action) {
            return (
              <button
                key={item.name}
                onClick={item.action}
                className="group relative font-sans text-sm font-medium text-foreground/80 transition-colors hover:text-foreground cursor-pointer"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </button>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href!}
              onClick={item.name === "Home" ? scrollToTop : undefined}
              className={`group relative font-sans text-sm font-medium transition-colors cursor-pointer ${
                isActive ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-4">
          <MagneticButton
            variant="secondary"
            onClick={() => openWithUtm("https://app.upspring.ai/auth/register?utm_campaign=home&utm_source=header")}
          >
            Start Free
          </MagneticButton>
          <MagneticButton variant="primary" onClick={scrollToContact}>
            Book a Demo
          </MagneticButton>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" className="text-foreground hover:bg-foreground/10 !h-12 !w-12 !p-0">
              <Menu style={{ width: 28, height: 28 }} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full border-l border-white/10 bg-background/50 backdrop-blur-2xl p-0">
            <div className="flex h-full flex-col items-center justify-center gap-12 p-8">
              <div className="flex flex-col items-center gap-8">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href || "#"}
                    onClick={(e) => {
                      if (item.action) {
                        e.preventDefault()
                        item.action()
                      } else if (item.name === "Home") {
                        scrollToTop()
                      }
                      setIsOpen(false)
                    }}
                    className="text-3xl font-light text-foreground/80 hover:text-foreground transition-all duration-300 hover:scale-110"
                    style={{
                      animation: isOpen ? `fadeIn 0.5s ease-out ${index * 0.1}s both` : "none",
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div
                className="flex flex-col gap-4 w-full max-w-xs"
                style={{
                  animation: isOpen ? "fadeIn 0.5s ease-out 0.4s both" : "none",
                }}
              >
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    openWithUtm("https://app.upspring.ai/auth/register?utm_campaign=home&utm_source=header_mobile")
                    setIsOpen(false)
                  }}
                  className="w-full justify-center text-base"
                >
                  Start Free
                </Button>
                <Button
                  size="lg"
                  onClick={() => {
                    scrollToContact()
                    setIsOpen(false)
                  }}
                  className="w-full justify-center bg-white text-black hover:bg-white/90 text-base"
                >
                  Book a Demo
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
