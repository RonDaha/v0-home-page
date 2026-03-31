"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

interface AdCard {
  status: string
  label: string
  score: number
  insight: string
  icon: string
  visualType: string
}

const baseAdCards: AdCard[] = [
  {
    status: "winning",
    label: "Winning",
    score: 98,
    insight: "Strong Hook Detected",
    icon: "⚡",
    visualType: "retention",
  },
  {
    status: "scaling",
    label: "Scaling",
    score: 92,
    insight: "High Retention Rate",
    icon: "🔥",
    visualType: "chart",
  },
  {
    status: "fatigue",
    label: "Fatigue",
    score: 45,
    insight: "Creative Fatigue",
    icon: "⚠️",
    visualType: "fatigue_chart",
  },
  { status: "losing", label: "Testing", score: 60, insight: "Low Engagement", icon: "📉", visualType: "chart" },
  { status: "winning", label: "Winning", score: 95, insight: "Viral Potential", icon: "🚀", visualType: "creative" },
  {
    status: "scaling",
    label: "Scaling",
    score: 88,
    insight: "High ROAS",
    icon: "💰",
    visualType: "scaling_chart",
  },
]

// Helper to shuffle array
const shuffle = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5)
}

export function AdAnalysisRoller() {
  const [isVisible, setIsVisible] = useState(false)
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    setIsVisible(true)

    const handleResize = () => {
      if (window.innerWidth >= 1800) {
        setColumns(3)
      } else if (window.innerWidth >= 1600) {
        setColumns(2)
      } else {
        setColumns(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Generate different card sets for each column to avoid repetition
  const columnData = [
    baseAdCards,
    shuffle([...baseAdCards]),
    shuffle([...baseAdCards]).map((c) => ({ ...c, score: Math.floor(Math.random() * 20) + 80 })),
  ]

  const speeds = ["20s", "25s", "22s"]

  return (
    <>
      {/* Desktop Vertical Roller */}
      <div
        className={`hidden lg:flex h-[70vh] transition-all duration-1000 flex-shrink-0 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
        style={{
          width: columns === 3 ? "1050px" : columns === 2 ? "700px" : "350px",
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Magic Line - Spans full width */}
          <div className="absolute inset-x-0 top-[70%] z-30 flex flex-col items-center justify-center -translate-y-1/2 pointer-events-none">
            <div className="relative z-10 bg-black/20 backdrop-blur-xl px-4 py-1 rounded-full border border-white/10 mb-2">
              <div className="text-xs md:text-sm font-mono text-white tracking-widest uppercase font-bold flex items-center gap-2">
                Upspring AI Engine
              </div>
            </div>
            <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.8)] relative"></div>
          </div>

          <div className={`grid h-full w-full gap-4`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="relative h-full w-full">
                {/* Unanalyzed Layer (Bottom) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    maskImage: "linear-gradient(to top, black 30%, transparent 30.5%)",
                    WebkitMaskImage: "linear-gradient(to top, black 30%, transparent 30.5%)",
                  }}
                >
                  <div
                    className="animate-roll-up space-y-4 p-4"
                    style={{ animationDuration: speeds[colIndex % speeds.length] }}
                  >
                    {[...columnData[colIndex], ...columnData[colIndex]].map((ad, index) => (
                      <div
                        key={`raw-${colIndex}-${index}`}
                        className="flex-shrink-0 rounded-lg border-2 border-white/10 bg-transparent p-4 space-y-3"
                      >
                        <div className="h-40 rounded border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <div className="w-12 h-12 mx-auto border-2 border-white/20 rounded-lg flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            </div>
                            <div className="text-[10px] text-white/40 font-mono animate-pulse">SCANNING...</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-white/10 rounded w-3/4" />
                          <div className="h-2 bg-white/10 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analyzed Layer (Top) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{
                    maskImage: "linear-gradient(to top, transparent 29.5%, black 30%)",
                    WebkitMaskImage: "linear-gradient(to top, transparent 29.5%, black 30%)",
                  }}
                >
                  <div
                    className="animate-roll-up space-y-4 p-4"
                    style={{ animationDuration: speeds[colIndex % speeds.length] }}
                  >
                    {[...columnData[colIndex], ...columnData[colIndex]].map((ad, index) => (
                      <AnalyzedCard key={`analyzed-${colIndex}-${index}`} ad={ad} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Horizontal Roller */}
      <div className="lg:hidden w-full max-w-full mt-12 relative h-64 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          {/* Magic Line - Vertical */}
          <div className="absolute inset-y-0 left-[70%] z-30 flex flex-col items-center justify-center pointer-events-none">
            <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.8)] relative">
          
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90 whitespace-nowrap">
              <div className="bg-black/20 backdrop-blur-xl px-3 py-1 rounded-full border border-white/10">
                <div className="text-[10px] font-mono text-white tracking-widest uppercase font-bold flex items-center gap-2">
                  AI Engine
                </div>
              </div>
            </div>
          </div>

          {/* Unanalyzed Layer (Right side) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 69.5%, black 70%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 69.5%, black 70%)",
            }}
          >
            <div className="animate-roll-left flex gap-4 p-4 h-full items-center w-[200%]">
              {[...baseAdCards, ...baseAdCards].map((ad, index) => (
                <div
                  key={`mobile-raw-${index}`}
                  className="flex-shrink-0 w-48 rounded-lg border-2 border-white/10 bg-transparent p-3 space-y-2"
                >
                  <div className="h-24 rounded border-2 border-dashed border-white/20 bg-white/5 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  </div>
                  <div className="space-y-1">
                    <div className="h-1.5 bg-white/10 rounded w-3/4" />
                    <div className="h-1.5 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analyzed Layer (Left side) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, black 70%, transparent 70.5%)",
              WebkitMaskImage: "linear-gradient(to right, black 70%, transparent 70.5%)",
            }}
          >
            <div className="animate-roll-left flex gap-4 p-4 h-full items-center w-[200%]">
              {[...baseAdCards, ...baseAdCards].map((ad, index) => (
                <div key={`mobile-analyzed-${index}`} className="w-48 flex-shrink-0">
                  <AnalyzedCard ad={ad} isMobile />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function AnalyzedCard({ ad, isMobile = false }: { ad: AdCard; isMobile?: boolean }) {
  return (
    <div
      className={`flex-shrink-0 rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm ${
        isMobile ? "p-3 space-y-2" : "p-4 space-y-3"
      } shadow-lg`}
    >
      <div
        className={`relative ${
          isMobile ? "h-24" : "h-32"
        } rounded border border-white/20 bg-gradient-to-br from-white/10 to-black/20 overflow-hidden group`}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div className="absolute top-2 right-2 bg-white/90 text-black text-[10px] font-bold px-2 py-0.5 rounded-full font-mono z-10">
          SCORE: {ad.score}
        </div>

        {/* Conditional rendering based on visualType */}
        {ad.visualType === "chart" && (
          <div
            className={`absolute bottom-0 left-0 right-0 ${isMobile ? "h-8" : "h-12"} px-3 pb-2 flex items-end gap-1`}
          >
            {[40, 65, 45, 80, 70, 90, 75, 95].map((height, i) => (
              <div
                key={i}
                className="flex-1 bg-white/60 rounded-t transition-all group-hover:bg-white/80"
                style={{ height: `${height * (ad.score / 100)}%` }}
              />
            ))}
          </div>
        )}

        {ad.visualType === "scaling_chart" && (
          <div
            className={`absolute bottom-0 left-0 right-0 ${
              isMobile ? "h-10" : "h-16"
            } px-4 pb-3 flex items-end justify-between gap-1`}
          >
            {[20, 35, 45, 60, 75, 90, 100].map((height, i) => (
              <div
                key={i}
                className="w-full bg-white/80 rounded-t transition-all group-hover:bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                style={{
                  height: `${height}%`,
                  opacity: 0.4 + i * 0.1,
                }}
              />
            ))}
            <div className="absolute top-2 right-2">
              <svg
                width={isMobile ? "16" : "20"}
                height={isMobile ? "16" : "20"}
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
          </div>
        )}

        {ad.visualType === "fatigue_chart" && (
          <div className="absolute inset-0 flex items-end pb-2 px-2">
            <svg
              className={`w-full ${isMobile ? "h-10" : "h-16"} overflow-visible`}
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 C20,5 30,10 40,25 C50,35 70,38 100,38"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.8"
                className="group-hover:stroke-opacity-100 transition-all"
                strokeDasharray="4 2"
              />
              <path d="M0,5 C20,5 30,10 40,25 C50,35 70,38 100,38 V40 H0 Z" fill="white" fillOpacity="0.1" />
              <circle cx="40" cy="25" r="3" fill="white" className="animate-pulse" />
              {!isMobile && (
                <text x="45" y="20" fill="white" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  DROP-OFF
                </text>
              )}
            </svg>
          </div>
        )}

        {ad.visualType === "retention" && (
          <div className="absolute inset-0 flex items-end pb-2 px-2">
            <svg
              className={`w-full ${isMobile ? "h-10" : "h-16"} overflow-visible`}
              viewBox="0 0 100 40"
              preserveAspectRatio="none"
            >
              <path
                d="M0,20 C20,10 40,35 60,15 S80,5 100,25"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeOpacity="0.6"
                className="group-hover:stroke-opacity-100 transition-all"
              />
              <path d="M0,20 C20,10 40,35 60,15 S80,5 100,25 V40 H0 Z" fill="white" fillOpacity="0.1" />
              <circle cx="60" cy="15" r="3" fill="white" className="animate-pulse" />
            </svg>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="text-[10px] font-mono text-white/60 uppercase tracking-wider">AI Insight</div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <div className="text-[9px] font-mono text-white/80">DONE</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/20 border border-white/30 rounded-md px-3 py-2">
          <div className="text-lg">{ad.icon}</div>
          <div>
            <div className="text-[9px] font-mono text-white/60 uppercase tracking-wide">Detected</div>
            <div className="text-xs font-bold text-white tracking-wide">{ad.insight}</div>
          </div>
        </div>

        {!isMobile && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1">
              <div className="text-[8px] text-white/50 font-mono uppercase">Status</div>
              <div className="text-[10px] font-bold text-white uppercase">{ad.label}</div>
            </div>
            <div className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1">
              <div className="text-[8px] text-white/50 font-mono uppercase">Action</div>
              <div className="text-[10px] font-bold text-white uppercase">
                {ad.status === "winning" ? "Scale" : ad.status === "fatigue" ? "Refresh" : "Monitor"}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
