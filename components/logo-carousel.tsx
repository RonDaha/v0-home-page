import { useReveal } from "@/hooks/use-reveal"
import Image from "next/image"

const LOGOS = [
  { type: "image", src: "/images/ridge.svg", alt: "Ridge", width: 130 },
  { type: "image", src: "/images/adidas-logo.svg", alt: "Adidas", width: 110 },
  { type: "image", src: "/images/delta-children.webp", alt: "Delta Children", width: 160 },
  { type: "image", src: "/images/publicis.png", alt: "Publicis Groupe", width: 140 },
  { type: "image", src: "/images/onebone.svg", alt: "One Bone", width: 140 },
  { type: "image", src: "/images/yves.avif", alt: "Yves Rocher", width: 160, height: 60 },
  { type: "image", src: "/images/baking-steel.svg", alt: "Baking Steel", width: 150 },
  { type: "image", src: "/images/stella-chewys.png", alt: "Stella & Chewy's", width: 160 },
  { type: "image", src: "/images/miscn-logo.svg", alt: "MISCN", width: 150 },
  { type: "image", src: "/images/cape-diablo.webp", alt: "Cape Diablo", width: 140 },
  { type: "image", src: "/images/bezel.svg", alt: "Bezel", width: 130 },
  { type: "image", src: "/images/steve.png", alt: "Steve Madden", width: 140 },
  { type: "image", src: "/images/fct.svg", alt: "FCT", width: 140 },
]

export function LogoCarousel() {
  const { ref, isVisible } = useReveal(0.1)

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden py-12 transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div
        className="relative flex w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 md:gap-24">
          {LOGOS.map((logo, i) => (
            <div key={i} className="flex items-center justify-center h-20">
              {logo.type === "text" ? (
                <span className="font-sans text-2xl font-bold text-white md:text-3xl">{logo.content}</span>
              ) : (
                <div
                  className={`relative flex items-center justify-center ${i === 0 ? "pl-12" : ""}`}
                  style={{ width: logo.width, height: logo.height || 80 }}
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height || 80}
                    className="object-contain brightness-0 invert"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex min-w-full shrink-0 animate-marquee items-center justify-around gap-12 md:gap-24">
          {LOGOS.map((logo, i) => (
            <div key={`duplicate-${i}`} className="flex items-center justify-center h-20">
              {logo.type === "text" ? (
                <span className="font-sans text-2xl font-bold text-white md:text-3xl">{logo.content}</span>
              ) : (
                <div
                  className={`relative flex items-center justify-center ${i === 0 ? "pl-12" : ""}`}
                  style={{ width: logo.width, height: logo.height || 80 }}
                >
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height || 80}
                    className="object-contain brightness-0 invert"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
