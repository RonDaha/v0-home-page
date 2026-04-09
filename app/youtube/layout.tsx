import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "YouTube Ads Creative Analytics Integration | Upspring.ai",
  description:
    "Upspring integrates directly with YouTube Ads (Google Ads) to analyze your video creatives — hooks, thumbnails, and formats — in one unified workflow. Already live. Connect now.",
  alternates: {
    canonical: "https://upspring.ai/youtube",
  },
  openGraph: {
    title: "YouTube Ads Creative Analytics Integration | Upspring.ai",
    description:
      "Analyze your YouTube video creatives with AI-powered creative analytics. Understand hooks, thumbnails, and formats that drive results.",
    url: "https://upspring.ai/youtube",
  },
}

export default function YouTubeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
