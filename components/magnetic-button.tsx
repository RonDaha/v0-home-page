"use client"

import type React from "react"
import { useRef } from "react"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "lg"
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = "",
  variant = "primary",
  size = "default",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const variants = {
    primary:
      "bg-foreground/95 text-background hover:bg-background hover:text-foreground border border-transparent hover:border-foreground/20 backdrop-blur-md",
    secondary:
      "bg-foreground/5 text-foreground hover:bg-foreground hover:text-background backdrop-blur-xl border border-foreground/10",
    ghost: "bg-transparent text-foreground hover:bg-foreground/5 backdrop-blur-sm",
  }

  const sizes = {
    default: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-full font-medium
        transition-all duration-300 ease-out
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      <span className="relative z-10">{children}</span>
    </button>
  )
}
