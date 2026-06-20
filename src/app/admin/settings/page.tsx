"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Image as ImageIcon } from "lucide-react"
import { FormWrapper, FormSection, FormGrid } from "@/components/admin/form-wrapper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface SocialLink {
  platform: string
  url: string
  label: string
}

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description: string; icon?: string }[]
}

interface StatItem {
  label: string
  value: string
  description?: string
}

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("general")
  const [notify, setNotify] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const [siteName, setSiteName] = useState("")
  const [siteTitle, setSiteTitle] = useState("")
  const [siteDescription, setSiteDescription] = useState("")
  const [siteLogo, setSiteLogo] = useState("")

  const [heroName, setHeroName] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [heroAvailability, setHeroAvailability] = useState("")
  const [rotatingTitles, setRotatingTitles] = useState("")

  const [navItems, setNavItems] = useState<NavItem[]>([])

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])

  const [stats, setStats] = useState<StatItem[]>([])

  const [seoTitle, setSeoTitle] = useState("")
  const [seoDescription, setSeoDescription] = useState("")
  const [seoKeywords, setSeoKeywords] = useState("")
  const [ogImage, setOgImage] = useState("")

  const [themeMode, setThemeMode] = useState("system")
  const [accentColor, setAccentColor] = useState("zinc")
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  const [footerTagline, setFooterTagline] = useState("")
  const [footerCopyright, setFooterCopyright] = useState("")

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((json) => {
        const s = json.settings || {}
        const site = s.site_config || {}
        const hero = s.hero || {}
        const seo = s.seo || {}
        const theme = s.theme || {}
        const footer = s.footer || {}

        setSiteName(site.name || "")
        setSiteTitle(site.title || "")
        setSiteDescription(site.description || "")
        setSiteLogo(site.logo || "")
        setHeroName(hero.name || "")
        setHeroSubtitle(hero.subtitle || "")
        setHeroAvailability(hero.availability || "")
        setRotatingTitles((hero.titles || []).join("\n"))
        setNavItems(s.nav_items || [])
        setSocialLinks(s.social_links || [])
        setStats(s.stats || [])
        setSeoTitle(seo.title || "")
        setSeoDescription(seo.description || "")
        setSeoKeywords(seo.keywords || "")
        setOgImage(seo.ogImage || "")
        setThemeMode(theme.mode || "system")
        setAccentColor(theme.accentColor || "zinc")
        setAnimationsEnabled(theme.animationsEnabled ?? true)
        setFooterTagline(footer.tagline || "")
        setFooterCopyright(footer.copyright || "")
      })
      .catch(() => setNotify({ type: "error", message: "Failed to load settings" }))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const promises = [
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "site_config", value: { name: siteName, title: siteTitle, description: siteDescription, logo: siteLogo } }),
        }),
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero", value: { name: heroName, titles: rotatingTitles.split("\n").filter(Boolean), subtitle: heroSubtitle, availability: heroAvailability, showStats: true, showSocialLinks: true } }),
        }),
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "nav_items", value: navItems }),
        }),
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "social_links", value: socialLinks }),
        }),
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "stats", value: stats }),
        }),
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "seo", value: { title: seoTitle, description: seoDescription, keywords: seoKeywords, ogImage } }),
        }),
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "theme", value: { mode: themeMode, accentColor, animationsEnabled } }),
        }),
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "footer", value: { tagline: footerTagline, quickLinks: navItems.filter((i) => !i.children).slice(0, 6), copyright: footerCopyright } }),
        }),
      ]
      await Promise.all(promises)
      setNotify({ type: "success", message: "Settings saved successfully" })
    } catch {
      setNotify({ type: "error", message: "Failed to save settings" })
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    if (notify) {
      const t = setTimeout(() => setNotify(null), 3000)
      return () => clearTimeout(t)
    }
  }, [notify])

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Site Settings</h1>
          <p className="text-sm text-muted-foreground">Configure your portfolio site</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Settings
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="nav">Navigation</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Site Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input label="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              <Input label="Site Title" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} />
              <Input label="Logo URL" value={siteLogo} onChange={(e) => setSiteLogo(e.target.value)} placeholder="https://..." icon={<ImageIcon size={16} />} />
            </div>
            <div className="mt-4">
              <Textarea label="Site Description" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} rows={3} />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="hero" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Hero Section</h3>
            <div className="space-y-4">
              <Input label="Your Name" value={heroName} onChange={(e) => setHeroName(e.target.value)} />
              <Textarea label="Rotating Titles (one per line)" value={rotatingTitles} onChange={(e) => setRotatingTitles(e.target.value)} rows={4} />
              <Textarea label="Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={3} />
              <Input label="Availability Status" value={heroAvailability} onChange={(e) => setHeroAvailability(e.target.value)} />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="nav" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Navigation Items</h3>
            <p className="mb-4 text-xs text-muted-foreground">Edit nav items as JSON with label, href, and optional children array.</p>
            <Textarea
              value={JSON.stringify(navItems, null, 2)}
              onChange={(e) => {
                try { setNavItems(JSON.parse(e.target.value)) } catch {}
              }}
              rows={20}
              className="font-mono text-xs"
            />
          </GlassCard>
        </TabsContent>

        <TabsContent value="social" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Social Links</h3>
            <div className="space-y-3">
              {socialLinks.map((link, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Input label="Platform" value={link.platform} onChange={(e) => {
                    const updated = [...socialLinks]; updated[i] = { ...updated[i], platform: e.target.value }; setSocialLinks(updated)
                  }} placeholder="e.g. GitHub" className="w-32" />
                  <Input label="URL" value={link.url} onChange={(e) => {
                    const updated = [...socialLinks]; updated[i] = { ...updated[i], url: e.target.value }; setSocialLinks(updated)
                  }} placeholder="https://..." className="flex-1" />
                  <Input label="Label" value={link.label} onChange={(e) => {
                    const updated = [...socialLinks]; updated[i] = { ...updated[i], label: e.target.value }; setSocialLinks(updated)
                  }} placeholder="Display name" className="w-32" />
                  {socialLinks.length > 1 && (
                    <Button variant="ghost" size="sm" className="mb-0.5" onClick={() => setSocialLinks(socialLinks.filter((_, j) => j !== i))}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setSocialLinks([...socialLinks, { platform: "", url: "", label: "" }])}>
                Add Link
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="stats" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Statistics</h3>
            <div className="space-y-3">
              {stats.map((stat, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Input label="Label" value={stat.label} onChange={(e) => {
                    const updated = [...stats]; updated[i] = { ...updated[i], label: e.target.value }; setStats(updated)
                  }} placeholder="e.g. Projects" className="w-40" />
                  <Input label="Value" value={stat.value} onChange={(e) => {
                    const updated = [...stats]; updated[i] = { ...updated[i], value: e.target.value }; setStats(updated)
                  }} placeholder="e.g. 50+" className="w-24" />
                  <Input label="Description" value={stat.description || ""} onChange={(e) => {
                    const updated = [...stats]; updated[i] = { ...updated[i], description: e.target.value }; setStats(updated)
                  }} placeholder="Optional" className="flex-1" />
                  {stats.length > 1 && (
                    <Button variant="ghost" size="sm" className="mb-0.5" onClick={() => setStats(stats.filter((_, j) => j !== i))}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setStats([...stats, { label: "", value: "", description: "" }])}>
                Add Stat
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="seo" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">SEO Defaults</h3>
            <div className="space-y-4">
              <Input label="Default SEO Title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
              <Textarea label="Meta Description" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={3} />
              <Input label="Keywords (comma separated)" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
              <Input label="OG Image URL" value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." icon={<ImageIcon size={16} />} />
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="theme" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Theme Settings</h3>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Theme Mode</label>
                  <select value={themeMode} onChange={(e) => setThemeMode(e.target.value)}
                    className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    <option value="system">System</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Accent Color</label>
                <div className="flex gap-2">
                  {["zinc", "blue", "emerald", "violet", "amber", "rose"].map((color) => (
                    <button key={color} onClick={() => setAccentColor(color)}
                      className={cn("h-8 w-8 rounded-full border-2 transition-all",
                        color === "zinc" && "bg-zinc-500 border-zinc-500",
                        color === "blue" && "bg-blue-500 border-blue-500",
                        color === "emerald" && "bg-emerald-500 border-emerald-500",
                        color === "violet" && "bg-violet-500 border-violet-500",
                        color === "amber" && "bg-amber-500 border-amber-500",
                        color === "rose" && "bg-rose-500 border-rose-500",
                        accentColor === color && "ring-2 ring-offset-2 ring-zinc-900 ring-foreground ring-offset-background")}
                    />
                  ))}
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={animationsEnabled}
                  onChange={(e) => setAnimationsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 border-border" />
                <span className="text-sm text-muted-foreground">Enable animations</span>
              </label>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="footer" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Footer</h3>
            <div className="space-y-4">
              <Input label="Tagline" value={footerTagline} onChange={(e) => setFooterTagline(e.target.value)} />
              <Input label="Copyright" value={footerCopyright} onChange={(e) => setFooterCopyright(e.target.value)} />
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {notify && (
        <div className={cn(
          "fixed bottom-6 right-6 z-50 rounded-xl px-4 py-3 text-sm font-medium shadow-lg",
          notify.type === "success" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"
        )}>
          {notify.message}
        </div>
      )}
    </motion.div>
  )
}
