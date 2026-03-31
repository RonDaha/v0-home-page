// Utility function to get UTM params from current URL and append to target URL
// This doesn't use React hooks, so it's safe to use anywhere without Suspense boundaries

const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

export function appendUtmParams(targetUrl: string): string {
  // Only run on client side
  if (typeof window === "undefined") return targetUrl

  const currentParams = new URLSearchParams(window.location.search)
  const targetUrlObj = new URL(targetUrl)

  // For each UTM param, if it exists in current URL, add/override it in target URL
  UTM_PARAMS.forEach((param) => {
    const value = currentParams.get(param)
    if (value) {
      targetUrlObj.searchParams.set(param, value)
    }
  })

  return targetUrlObj.toString()
}

export function openWithUtm(targetUrl: string, target = "_blank"): void {
  window.open(appendUtmParams(targetUrl), target)
}
