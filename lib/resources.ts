// Legacy stub - resources now fetched from Notion via lib/notion.tsx
// This file exists for backwards compatibility with cached builds

export interface Resource {
  slug: string
  title: string
  date: string
  imageUrl: string
  readTime: string
  category: string
  content: string
}

export const resources: Resource[] = []
