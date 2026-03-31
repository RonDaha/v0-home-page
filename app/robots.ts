import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/blog/"],
    },
    sitemap: "https://www.upspring.ai/sitemap.xml",
  }
}
