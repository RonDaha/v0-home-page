"use client"

import { useReveal } from "@/hooks/use-reveal"
import { LogoCarousel } from "@/components/logo-carousel"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function ServicesSection({ id }: { id?: string }) {
  const { ref, isVisible } = useReveal(0.3)

  const testimonials = [
    {
      name: "Andrew Watson",
      title: "Co Founder at Igloo Media",
      image: "/images/andrew.jpg",
      quote:
        "Upspring has become a core part of Igloo's creative workflow. We've already landed five new clients after showcasing Upspring in the pitch process, and internally we estimate it saves our team 30%+ of the time we used to spend on manual analysis and pulling insights. It helps us move faster, brief smarter, and make more confident creative decisions across accounts.",
    },
    {
      name: "Matt Lowenthal",
      title: "Chief Strategy Officer at Brand.co",
      image: "/images/matt.png",
      quote:
        "Upspring's smart UI makes it easy to parse performance data in real time, understand why an ad is working, and get AI-powered suggestions on what to test next. Fantastic tool for any brand or team running performance marketing",
    },
    {
      name: "Tomer Arzoan",
      title: "Co-Founder at Maëlys",
      image:
        "https://cdn.prod.website-files.com/6767cd956661bd59e5a74391/67db09945cb20a822e894199_tomer-profile.jpeg?height=64&width=64",
      quote:
        "Upspring has been a game-changer for our ad strategy. With their AI-powered insights, we were able to identify what truly drives performance and optimize our creatives more effectively.",
    },
  ]

  return (
    <section
      id={id}
      ref={ref}
      className="flex min-h-screen w-full flex-col justify-center px-6 py-20 md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Trusted By
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Industry Leaders</p>
        </div>

        <div className="mb-16 md:mb-24">
          <LogoCarousel />
        </div>

        <div
          className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="mx-auto w-full max-w-[95vw] lg:max-w-[90vw] xl:max-w-[1400px]"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-[48%]">
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:p-8 lg:p-10">
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20 bg-white/10">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="font-sans text-lg font-medium text-foreground">{testimonial.name}</div>
                          <div className="font-mono text-sm text-popover">{testimonial.title}</div>
                        </div>
                      </div>
                      <blockquote className="font-sans text-lg font-light italic leading-relaxed text-foreground md:text-xl">
                        "{testimonial.quote}"
                      </blockquote>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-2">
              <CarouselPrevious className="relative left-0 translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
              <CarouselNext className="relative right-0 translate-y-0 border-white/20 bg-white/10 text-white hover:bg-white/20 hover:text-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; subtitle: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-1 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="mb-2 font-mono text-xs text-primary md:text-sm">{service.subtitle}</p>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
    </div>
  )
}
