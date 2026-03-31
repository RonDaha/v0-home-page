"use client"

import { useEffect } from "react"

export function PosthogProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.posthog && window.posthog.__loaded) return

    const posthog = (window.posthog = window.posthog || [])
    if (posthog.__SV) return

    posthog.__SV = 1
    posthog._i = []
    posthog.init = function (i: string, s: Record<string, unknown>, a?: string) {
      function g(t: Record<string, unknown>, e: string) {
        const o = e.split(".")
        if (o.length === 2) {
          t = t[o[0]] as Record<string, unknown>
          e = o[1]
        }
        t[e] = function (...args: unknown[]) {
          ;(t as unknown as unknown[]).push([e, ...args])
        }
      }
      const p = document.createElement("script")
      p.type = "text/javascript"
      p.crossOrigin = "anonymous"
      p.async = true
      p.src = s.api_host
        ? (s.api_host as string).replace(".i.posthog.com", "-assets.i.posthog.com") + "/static/array.js"
        : "https://us-assets.i.posthog.com/static/array.js"
      const r = document.getElementsByTagName("script")[0]
      r.parentNode?.insertBefore(p, r)

      let u: Record<string, unknown> = posthog
      if (a !== undefined) {
        u = posthog[a] = []
      } else {
        a = "posthog"
      }
      u.people = u.people || []
      u.toString = function (t?: boolean) {
        let e = "posthog"
        if (a !== "posthog") e += "." + a
        if (!t) e += " (stub)"
        return e
      }
      ;(u.people as { toString: () => string }).toString = function () {
        return u.toString!(true) + ".people (stub)"
      }
      const methods =
        "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys onSessionId setPersonProperties".split(
          " "
        )
      for (let n = 0; n < methods.length; n++) g(u, methods[n])
      posthog._i.push([i, s, a])
    }

    posthog.init("phc_qNEjv2wJrritHaJvZXPGwjbiP9t89dUmhJSo6xqAx9Lk", {
      api_host: "https://us.i.posthog.com",
      defaults: "2026-01-30",
      person_profiles: "identified_only",
    })
  }, [])

  return null
}
