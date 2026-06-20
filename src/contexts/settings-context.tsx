"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { SiteSettings } from "@/app/api/settings/route"

export interface SettingsContextValue {
  settings: SiteSettings
  loading: boolean
  updateSetting: (key: string, value: unknown) => Promise<boolean>
  refresh: () => Promise<void>
}

const defaultSettings: SiteSettings = {
  site_config: { name: "", title: "", description: "", logo: "", url: "" },
  hero: { name: "", titles: [], subtitle: "", availability: "", showStats: true, showSocialLinks: true },
  social_links: [],
  nav_items: [],
  stats: [],
  seo: { title: "", description: "", keywords: "", ogImage: "" },
  theme: { mode: "system", accentColor: "zinc", animationsEnabled: true },
  footer: { tagline: "", quickLinks: [], copyright: "" },
  tech_categories: [],
  tech_radar_categories: [],
  technology_graph_nodes: [],
}

const SettingsContext = createContext<SettingsContextValue>({
  settings: defaultSettings,
  loading: true,
  updateSetting: async () => false,
  refresh: async () => {},
})

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/settings")
      const json = await res.json()
      if (json.settings) {
        setSettings(json.settings)
      }
    } catch (e) {
      console.warn("[Settings] Failed to fetch settings:", e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const updateSetting = useCallback(async (key: string, value: unknown): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      })
      if (res.ok) {
        setSettings((prev) => ({ ...prev, [key]: value }))
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  return (
    <SettingsContext.Provider value={{ settings, loading, updateSetting, refresh }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  return useContext(SettingsContext)
}

export { defaultSettings }
