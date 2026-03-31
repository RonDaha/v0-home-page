"use server"

const HUBSPOT_PORTAL_ID = "146395595"
const HUBSPOT_FORM_ID = "6a3bdd2c-f2a4-4822-bc14-4a032f003e27"

interface FormData {
  name: string
  email: string
  businessType: string
  adSpend: string
  website: string
  message: string
}

function normalizeWebsiteUrl(url: string): string {
  if (!url) return ""
  const trimmedUrl = url.trim()
  if (!trimmedUrl) return ""

  // If URL already has a protocol, return as-is
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl
  }

  // Otherwise, prepend https://
  return `https://${trimmedUrl}`
}

export async function submitToHubspot(formData: FormData) {
  const hubspotData = {
    fields: [
      { name: "firstname", value: formData.name },
      { name: "email", value: formData.email },
      { name: "business_type", value: formData.businessType },
      { name: "monthly_ad_spend_estimate", value: formData.adSpend },
      { name: "website_registration", value: normalizeWebsiteUrl(formData.website) },
      { name: "message", value: formData.message },
    ],
    context: {
      pageUri: "https://upspring.ai",
      pageName: "Contact Form - Footer",
    },
  }

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hubspotData),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("HubSpot submission error:", errorData)
      return { success: false, error: "Failed to submit form" }
    }

    return { success: true }
  } catch (error) {
    console.error("HubSpot submission error:", error)
    return { success: false, error: "Failed to submit form" }
  }
}
