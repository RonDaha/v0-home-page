import { getArticles } from "@/lib/notion"
import { ResourcesClient } from "./client"

export const revalidate = 60

export default async function ResourcesPage() {
  const articles = await getArticles()
  return <ResourcesClient articles={articles} />
}
