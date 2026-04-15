import { getArticles } from "@/lib/notion"
import { ResourcesClient } from "./client"

export const revalidate = 60

export default async function ResourcesPage() {
  const articles = await getArticles()
  // Filter out Case Study type articles (they have their own page)
  const resources = articles.filter((article) => article.type !== "Case Study")
  return <ResourcesClient articles={resources} />
}
