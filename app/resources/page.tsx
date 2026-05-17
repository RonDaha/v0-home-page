import { Suspense } from "react"
import { getArticles } from "@/lib/notion"
import { ResourcesClient } from "./client"

export const revalidate = 60

export default async function ResourcesPage() {
  const articles = await getArticles()
  return (
    <Suspense fallback={null}>
      <ResourcesClient articles={articles} />
    </Suspense>
  )
}
