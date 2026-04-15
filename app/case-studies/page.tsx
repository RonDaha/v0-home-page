import { getArticles } from "@/lib/notion"
import { CaseStudiesClient } from "./client"

export const revalidate = 60

export default async function CaseStudiesPage() {
  const articles = await getArticles()
  // Filter to only show Case Study type articles
  const caseStudies = articles.filter((article) => article.type === "Case Study")
  return <CaseStudiesClient articles={caseStudies} />
}
