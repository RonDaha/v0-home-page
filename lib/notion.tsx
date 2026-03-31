const NOTION_TOKEN = process.env.NOTION_TOKEN
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

export interface NotionArticle {
  id: string
  title: string
  slug: string
  date: string
  imageUrl: string
  readTime: string
  type: string
  content: string
}

async function notionFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`https://api.notion.com/v1${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!res.ok) {
    const error = await res.text()
    console.error("[v0] Notion API error:", error)
    throw new Error(`Notion API error: ${res.status}`)
  }

  return res.json()
}

function getPropertyValue(property: any): string {
  if (!property) return ""

  switch (property.type) {
    case "title":
      return property.title?.[0]?.plain_text || ""
    case "rich_text":
      return property.rich_text?.[0]?.plain_text || ""
    case "date":
      return property.date?.start || ""
    case "url":
      return property.url || ""
    case "select":
      return property.select?.name || ""
    case "number":
      return property.number?.toString() || ""
    default:
      return ""
  }
}

export async function getArticles(): Promise<NotionArticle[]> {
  const data = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: {
        property: "Status",
        status: { equals: "Public" },
      },
      sorts: [{ property: "Date", direction: "descending" }],
    }),
  })

  const articles: NotionArticle[] = data.results.map((page: any) => ({
    id: page.id,
    title: getPropertyValue(page.properties.Title),
    slug: getPropertyValue(page.properties.Slug),
    date: getPropertyValue(page.properties.Date),
    imageUrl: getPropertyValue(page.properties.imageUrl),
    readTime: getPropertyValue(page.properties.readTime),
    type: getPropertyValue(page.properties.Type),
    content: "",
  }))

  return articles
}

export async function getArticleBySlug(slug: string): Promise<NotionArticle | null> {
  const data = await notionFetch(`/databases/${NOTION_DATABASE_ID}/query`, {
    method: "POST",
    body: JSON.stringify({
      filter: {
        and: [
          { property: "Status", status: { equals: "Public" } },
          { property: "Slug", rich_text: { equals: slug } },
        ],
      },
    }),
  })

  if (data.results.length === 0) return null

  const page = data.results[0]
  const content = await getPageContent(page.id)

  return {
    id: page.id,
    title: getPropertyValue(page.properties.Title),
    slug: getPropertyValue(page.properties.Slug),
    date: getPropertyValue(page.properties.Date),
    imageUrl: getPropertyValue(page.properties.imageUrl),
    readTime: getPropertyValue(page.properties.readTime),
    type: getPropertyValue(page.properties.Type),
    content,
  }
}

async function getAllBlocks(blockId: string): Promise<any[]> {
  let allBlocks: any[] = []
  let cursor: string | undefined = undefined

  do {
    const url = `/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`
    const data = await notionFetch(url)

    // Fetch children for blocks that have them
    const blocksWithChildren = await Promise.all(
      data.results.map(async (block: any) => {
        if (block.has_children) {
          const children = await getAllBlocks(block.id)
          return { ...block, children }
        }
        return block
      }),
    )

    allBlocks = allBlocks.concat(blocksWithChildren)
    cursor = data.has_more ? data.next_cursor : undefined
  } while (cursor)

  return allBlocks
}

async function getPageContent(pageId: string): Promise<string> {
  const blocks = await getAllBlocks(pageId)
  return blocksToHtml(blocks)
}

function blocksToHtml(blocks: any[]): string {
  let html = ""
  let inBulletedList = false
  let inNumberedList = false

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const type = block.type
    const content = block[type]
    const nextBlock = blocks[i + 1]
    const nextType = nextBlock?.type

    if (type === "bulleted_list_item" && !inBulletedList) {
      html += "<ul>"
      inBulletedList = true
    }
    if (type === "numbered_list_item" && !inNumberedList) {
      html += "<ol>"
      inNumberedList = true
    }

    // Close lists when switching types
    if (inBulletedList && type !== "bulleted_list_item") {
      html += "</ul>"
      inBulletedList = false
    }
    if (inNumberedList && type !== "numbered_list_item") {
      html += "</ol>"
      inNumberedList = false
    }

    switch (type) {
      case "paragraph":
        const text = richTextToHtml(content?.rich_text)
        html += text ? `<p>${text}</p>` : "<p></p>"
        break
      case "heading_1":
        html += `<h1>${richTextToHtml(content?.rich_text)}</h1>`
        break
      case "heading_2":
        html += `<h2>${richTextToHtml(content?.rich_text)}</h2>`
        break
      case "heading_3":
        html += `<h3>${richTextToHtml(content?.rich_text)}</h3>`
        break
      case "bulleted_list_item":
        html += `<li>${richTextToHtml(content?.rich_text)}`
        if (block.children) {
          html += blocksToHtml(block.children)
        }
        html += `</li>`
        break
      case "numbered_list_item":
        html += `<li>${richTextToHtml(content?.rich_text)}`
        if (block.children) {
          html += blocksToHtml(block.children)
        }
        html += `</li>`
        break
      case "quote":
        html += `<blockquote>${richTextToHtml(content?.rich_text)}</blockquote>`
        break
      case "code":
        html += `<pre><code>${richTextToHtml(content?.rich_text)}</code></pre>`
        break
      case "divider":
        html += '<hr style="border-color: white; opacity: 0.3;" />'
        break
      case "image":
        const url = content?.file?.url || content?.external?.url || ""
        const caption = content?.caption ? richTextToHtml(content.caption) : ""
        html += url
          ? `<figure><img src="${url}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ""}</figure>`
          : ""
        break
      case "callout":
        const icon = content?.icon?.emoji || ""
        html += `<div class="callout">${icon ? `<span>${icon}</span>` : ""}${richTextToHtml(content?.rich_text)}`
        if (block.children) {
          html += blocksToHtml(block.children)
        }
        html += `</div>`
        break
      case "toggle":
        html += `<details><summary>${richTextToHtml(content?.rich_text)}</summary>`
        if (block.children) {
          html += blocksToHtml(block.children)
        }
        html += `</details>`
        break
      case "table":
        if (block.children) {
          html += `<table>${blocksToHtml(block.children)}</table>`
        }
        break
      case "table_row":
        html += `<tr>${content?.cells?.map((cell: any) => `<td>${richTextToHtml(cell)}</td>`).join("") || ""}</tr>`
        break
      case "video":
        const videoUrl = content?.file?.url || content?.external?.url || ""
        if (videoUrl) {
          if (videoUrl.includes("youtube") || videoUrl.includes("youtu.be")) {
            html += `<iframe src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`
          } else {
            html += `<video src="${videoUrl}" controls></video>`
          }
        }
        break
      case "embed":
        const embedUrl = content?.url || ""
        html += embedUrl ? `<iframe src="${embedUrl}" frameborder="0"></iframe>` : ""
        break
      case "bookmark":
        const bookmarkUrl = content?.url || ""
        html += bookmarkUrl
          ? `<a href="${bookmarkUrl}" target="_blank" rel="noopener noreferrer">${bookmarkUrl}</a>`
          : ""
        break
    }

    // Close lists at the end
    if (i === blocks.length - 1) {
      if (inBulletedList) html += "</ul>"
      if (inNumberedList) html += "</ol>"
    } else {
      // Close lists when next block is different type
      if (inBulletedList && nextType !== "bulleted_list_item") {
        html += "</ul>"
        inBulletedList = false
      }
      if (inNumberedList && nextType !== "numbered_list_item") {
        html += "</ol>"
        inNumberedList = false
      }
    }
  }

  return html
}

function richTextToHtml(richText: any[]): string {
  if (!richText) return ""

  return richText
    .map((text) => {
      let content = text.plain_text || ""

      if (text.annotations?.bold) content = `<strong>${content}</strong>`
      if (text.annotations?.italic) content = `<em>${content}</em>`
      if (text.annotations?.strikethrough) content = `<s>${content}</s>`
      if (text.annotations?.underline) content = `<u>${content}</u>`
      if (text.annotations?.code) content = `<code>${content}</code>`
      if (text.href) content = `<a href="${text.href}" target="_blank" rel="noopener noreferrer">${content}</a>`

      return content
    })
    .join("")
}
