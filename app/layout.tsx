import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { GoogleAnalytics } from "@next/third-parties/google"
import Script from "next/script"
import "./globals.css"
import { ScrollToTop } from "@/components/scroll-to-top"
import { IntercomProvider } from "@/components/intercom-provider"
import { PosthogProvider } from "@/components/posthog-provider"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const OG_IMAGE_URL = "https://storage.googleapis.com/spring-assets-prod/website/scaling-banner.jpg"

export const metadata: Metadata = {
  title: "Upspring.ai | AI-Driven Creative Intelligence",
  description:
    "Upspring empowers leading brands and agencies to maximize results by providing creative teams with AI-driven insights for smarter, data-backed decisions",
  openGraph: {
    title: "Upspring.ai",
    description: "The creative intelligence platform",
    url: "https://www.upspring.ai",
    siteName: "Upspring.ai",
    images: [
      {
        url: OG_IMAGE_URL,
        secureUrl: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Upspring.ai - The creative intelligence platform",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upspring.ai",
    description: "The creative intelligence platform",
    images: [OG_IMAGE_URL],
  },
  other: {
    "og:image": OG_IMAGE_URL,
    "og:image:secure_url": OG_IMAGE_URL,
    "og:image:type": "image/jpeg",
    "og:image:width": "1200",
    "og:image:height": "630",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  verification: {
    google: "iZ_GQVx0d1m6XaRpMBJtT4sPsEdhmi6iShEHObYJzYU",
  },
  metadataBase: new URL("https://www.upspring.ai"),
  alternates: {
    canonical: "/",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body className={`font-sans antialiased`}>
        <ScrollToTop />
        {children}
        <Analytics />
        <IntercomProvider />
        <PosthogProvider />
        <GoogleAnalytics gaId="G-3FBFVLVRBK" />
        <Script
          id="swan-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.swan = window.swan || []; window.swan.pk = 'cmmyp315400050jl274vpi5u8';`,
          }}
        />
        <Script
          id="swan-tracking"
          src="https://script.getswan.com?pk=cmmyp315400050jl274vpi5u8"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
