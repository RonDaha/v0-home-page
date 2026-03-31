import { getArticleBySlug, getArticles } from "@/lib/notion"
import { ArticleClient } from "./client"
import { notFound } from "next/navigation"

export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  return <ArticleClient article={article} />
}
