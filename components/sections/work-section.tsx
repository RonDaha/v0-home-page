"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection({ id }: { id?: string }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section id={id} ref={ref} className="flex min-h-screen w-full items-center px-6 py-20 md:px-12 md:py-24 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Features
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Data-Driven Insights</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {[
            {
              number: "01",
              title: "AI-First Creative Analytics",
              category: "Performance Data",
              sketchType: "analytics",
              direction: "left",
              description:
                "Upspring analyzes every image and video with deep AI to reveal what drives performance. Get stunning, real-time creative reports that surface patterns, hooks, and winning ideas instantly.",
            },
            {
              number: "02",
              title: "AI-Powered Creative Research",
              category: "Ads Research",
              sketchType: "research",
              direction: "left",
              description:
                "Explore an endless ad library with AI that analyzes every creative for you. Quickly discover winners across any brand, category, or format — and turn insights into inspiration.",
            },
            {
              number: "03",
              title: "Competitor Creative Intelligence",
              category: "Deep Understanding",
              sketchType: "intelligence",
              direction: "left",
              description:
                "Track your competitors' ads and see exactly what's working for them. AI highlights their winning concepts, trends, and opportunities you can use to stay ahead.",
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: {
    number: string
    title: string
    category: string
    sketchType: string
    direction: string
    description: string
  }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group flex flex-col md:flex-row md:items-center md:justify-between border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
        marginLeft: "0",
        maxWidth: "100%",
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-8 w-full">
        <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base shrink-0">
          {project.number}
        </span>
        <div className="w-full">
          <div className="flex items-start justify-between gap-4">
            <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
              {project.title}
            </h3>
            <div className="md:hidden shrink-0">
              <FeatureSketch type={project.sketchType} />
            </div>
          </div>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">{project.category}</p>
          <p className="mt-2 max-w-2xl text-sm text-foreground/70 md:text-base">{project.description}</p>
        </div>
      </div>
      <div className="hidden md:block shrink-0 ml-4">
        <FeatureSketch type={project.sketchType} />
      </div>
    </div>
  )
}

function FeatureSketch({ type }: { type: string }) {
  if (type === "analytics") {
    return (
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center md:h-20 md:w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <rect x="10" y="50" width="12" height="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <rect x="26" y="40" width="12" height="30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5" />
          <rect x="42" y="30" width="12" height="40" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
          <rect x="58" y="20" width="12" height="50" fill="none" stroke="white" strokeWidth="1.5" opacity="0.9" />
          <polyline
            points="16,56 32,46 48,36 64,26"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            opacity="0.6"
            strokeDasharray="2,2"
          />
        </svg>
      </div>
    )
  }

  if (type === "research") {
    return (
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center md:h-20 md:w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <rect x="15" y="15" width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <rect x="36" y="15" width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <rect x="15" y="36" width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <rect x="36" y="36" width="18" height="18" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <circle cx="50" cy="50" r="12" fill="none" stroke="white" strokeWidth="1.5" opacity="0.8" />
          <line x1="59" y1="59" x2="68" y2="68" stroke="white" strokeWidth="1.5" opacity="0.8" />
        </svg>
      </div>
    )
  }

  if (type === "intelligence") {
    return (
      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center md:h-20 md:w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full">
          <circle cx="40" cy="40" r="30" fill="none" stroke="white" strokeWidth="1.5" opacity="0.2" />
          <circle cx="40" cy="40" r="20" fill="none" stroke="white" strokeWidth="1.5" opacity="0.4" />
          <circle cx="40" cy="40" r="10" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
          <line x1="40" y1="10" x2="40" y2="70" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <line x1="10" y1="40" x2="70" y2="40" stroke="white" strokeWidth="1.5" opacity="0.3" />
          <circle cx="40" cy="40" r="3" fill="white" opacity="0.8">
            <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    )
  }

  return null
}
