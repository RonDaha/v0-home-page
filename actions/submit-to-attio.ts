"use server"

function isValidEmail(email: string): boolean {
  // Check basic email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return false
  }

  // Check for valid TLD (at least 2 characters)
  const parts = email.split("@")
  if (parts.length !== 2) return false

  const domain = parts[1]
  const domainParts = domain.split(".")
  const tld = domainParts[domainParts.length - 1]

  // TLD must be at least 2 characters and only letters
  return tld.length >= 2 && /^[a-zA-Z]+$/.test(tld)
}

export async function submitToAttio(data: {
  email: string
  name?: string
  website?: string
  agencyName?: string
  clientCount?: string
  competitorUrl?: string
  businessType?: string
  monthlySpend?: string
  message?: string
  source?: string // New parameter for custom source
}) {
  try {
    if (!isValidEmail(data.email)) {
      console.error("[v0] Invalid email format:", data.email)
      return { success: false, error: "Invalid email format" }
    }

    const ATTIO_API_KEY = process.env.ATTIO_API_KEY

    if (!ATTIO_API_KEY) {
      console.error("[v0] Attio API key not configured")
      return { success: false, error: "Attio API key not configured" }
    }

    const payload = {
      data: {
        values: {
          email_addresses: [{ email_address: data.email }],
          upspring_source: data.source || "website form",
          ...(data.name && {
            name: [
              {
                first_name: data.name.split(" ")[0],
                last_name: data.name.split(" ").slice(1).join(" ") || "",
                full_name: data.name,
              },
            ],
          }),
          ...(data.agencyName && {
            company_name_1766247375: data.agencyName,
          }),
          ...(data.clientCount && {
            number_of_clients_1766247594: data.clientCount,
          }),
          ...(data.competitorUrl && {
            competitor_website_1766247375: data.competitorUrl,
          }),
          ...(data.businessType && {
            business_type_1766247262: data.businessType,
          }),
          ...(data.monthlySpend && {
            monthly_spend_1766247594: data.monthlySpend,
          }),
          ...(data.website && {
            website_registration_1766247596: data.website,
          }),
          ...(data.message && {
            registration_note: data.message,
          }),
        },
      },
    }

    console.log("[v0] Attio payload:", JSON.stringify(payload, null, 2))

    const response = await fetch("https://api.attio.com/v2/objects/people/records", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ATTIO_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Attio API error:", errorText)
      return { success: false, error: "Failed to submit to Attio" }
    }

    console.log("[v0] Successfully submitted to Attio")
    return { success: true }
  } catch (error) {
    console.error("[v0] Attio submission error:", error)
    return { success: false, error: "Failed to submit to Attio" }
  }
}
