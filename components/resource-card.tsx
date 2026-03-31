import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface ResourceCardProps {
  title: string
  category: string
  date: string
  readTime?: string
  href: string
  index: number
  image?: string
}

export function ResourceCard({ title, category, date, readTime, href, index, image }: ResourceCardProps) {
  const isExternal = href.startsWith("http")

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-500 hover:border-foreground/20 hover:bg-foreground/10"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-block rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1 font-mono text-xs text-foreground/80">
          {category}
        </span>
        <ArrowUpRight className="h-5 w-5 text-foreground/50 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-sans text-xl font-medium leading-tight text-foreground md:text-2xl">{title}</h3>

        {image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg opacity-80 transition-opacity duration-500 group-hover:opacity-100">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
        )}

        <div className="flex items-center gap-3 font-mono text-xs text-foreground/50">
          <span>{date}</span>
          {readTime && (
            <>
              <span className="h-1 w-1 rounded-full bg-foreground/30" />
              <span>{readTime}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
