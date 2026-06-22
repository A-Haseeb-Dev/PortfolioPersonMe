"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, GripVertical, Image as ImageIcon } from "lucide-react"
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

interface AboutStat {
  label: string
  value: string
  suffix: string
}

interface StoryMilestone {
  year: string
  title: string
  description: string
}

interface Education {
  degree: string
  institution: string
  location: string
  year: string
  description: string
}

interface CareerItem {
  role: string
  company: string
  location: string
  period: string
  description: string
  tags: string
}

interface Goal {
  title: string
  description: string
  icon: string
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

  const [aboutName, setAboutName] = useState("")
  const [aboutTitle, setAboutTitle] = useState("")
  const [aboutSubtitle, setAboutSubtitle] = useState("")
  const [aboutBio, setAboutBio] = useState("")
  const [aboutLocation, setAboutLocation] = useState("")
  const [aboutAvailability, setAboutAvailability] = useState("")
  const [aboutResumeUrl, setAboutResumeUrl] = useState("")
  const [aboutAvatar, setAboutAvatar] = useState("")
  const [aboutStats, setAboutStats] = useState<AboutStat[]>([])
  const [aboutStory, setAboutStory] = useState<StoryMilestone[]>([])
  const [aboutMissionText, setAboutMissionText] = useState("")
  const [aboutMissionBullets, setAboutMissionBullets] = useState("")
  const [aboutVisionText, setAboutVisionText] = useState("")
  const [aboutVisionBullets, setAboutVisionBullets] = useState("")
  const [aboutEducation, setAboutEducation] = useState<Education[]>([])
  const [aboutCareer, setAboutCareer] = useState<CareerItem[]>([])
  const [aboutGoals, setAboutGoals] = useState<Goal[]>([])
  const [homeSections, setHomeSections] = useState<{ id: string; label: string; enabled: boolean }[]>([])

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

        const about = s.about || {}
        setAboutName(about.name || "")
        setAboutTitle(about.title || "")
        setAboutSubtitle(about.subtitle || "")
        setAboutBio(about.bio || "")
        setAboutLocation(about.location || "")
        setAboutAvailability(about.availability || "")
        setAboutResumeUrl(about.resumeUrl || "")
        setAboutAvatar(about.avatar || "")
        setAboutStats((about.stats || []).map((s: any) => ({ ...s, value: String(s.value) })))
        setAboutStory(about.story || [])
        setAboutMissionText(about.mission?.text || "")
        setAboutMissionBullets((about.mission?.bullets || []).join("\n"))
        setAboutVisionText(about.vision?.text || "")
        setAboutVisionBullets((about.vision?.bullets || []).join("\n"))
        setAboutEducation(about.education || [])
        setAboutCareer((about.career || []).map((c: any) => ({ ...c, tags: Array.isArray(c.tags) ? c.tags.join("\n") : c.tags || "" })))
        setAboutGoals(about.goals || [])
        setHomeSections(s.home_sections || [
          { id: "hero", label: "Hero Section", enabled: true },
          { id: "featured-projects", label: "Featured Projects", enabled: true },
          { id: "featured-services", label: "Featured Services", enabled: true },
          { id: "featured-case-studies", label: "Featured Case Studies", enabled: true },
          { id: "tech-stack", label: "Tech Stack Preview", enabled: true },
          { id: "certifications", label: "Certifications", enabled: true },
          { id: "testimonials", label: "Testimonials", enabled: true },
          { id: "clients", label: "Clients Section", enabled: true },
          { id: "featured-blogs", label: "Featured Blogs", enabled: true },
          { id: "contact-cta", label: "Contact CTA", enabled: true },
        ])
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
        fetch("/api/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: "about",
            value: {
              name: aboutName,
              title: aboutTitle,
              subtitle: aboutSubtitle,
              bio: aboutBio,
              location: aboutLocation,
              availability: aboutAvailability,
              resumeUrl: aboutResumeUrl,
              avatar: aboutAvatar,
              stats: aboutStats.map((s) => ({ ...s, value: Number(s.value) })),
              story: aboutStory,
              mission: { text: aboutMissionText, bullets: aboutMissionBullets.split("\n").filter(Boolean) },
              vision: { text: aboutVisionText, bullets: aboutVisionBullets.split("\n").filter(Boolean) },
              education: aboutEducation,
              career: aboutCareer.map((c) => ({ ...c, tags: c.tags.split("\n").filter(Boolean) })),
              goals: aboutGoals,
            },
          })}),
          fetch("/api/settings", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ key: "home_sections", value: homeSections }),
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
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="home">Home Sections</TabsTrigger>
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

        <TabsContent value="about" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Basic Information</h3>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name" value={aboutName} onChange={(e) => setAboutName(e.target.value)} />
                <Input label="Title" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} />
              </div>
              <Input label="Subtitle" value={aboutSubtitle} onChange={(e) => setAboutSubtitle(e.target.value)} />
              <Textarea label="Bio" value={aboutBio} onChange={(e) => setAboutBio(e.target.value)} rows={4} />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Location" value={aboutLocation} onChange={(e) => setAboutLocation(e.target.value)} />
                <Input label="Availability" value={aboutAvailability} onChange={(e) => setAboutAvailability(e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Resume URL" value={aboutResumeUrl} onChange={(e) => setAboutResumeUrl(e.target.value)} placeholder="https://..." />
                <Input label="Avatar URL" value={aboutAvatar} onChange={(e) => setAboutAvatar(e.target.value)} placeholder="https://..." icon={<ImageIcon size={16} />} />
              </div>
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">About Stats</h3>
            <div className="space-y-3">
              {aboutStats.map((stat, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Input label="Label" value={stat.label} onChange={(e) => {
                    const updated = [...aboutStats]; updated[i] = { ...updated[i], label: e.target.value }; setAboutStats(updated)
                  }} placeholder="e.g. Experience" className="w-40" />
                  <Input label="Value" value={stat.value} onChange={(e) => {
                    const updated = [...aboutStats]; updated[i] = { ...updated[i], value: e.target.value }; setAboutStats(updated)
                  }} placeholder="e.g. 5+" className="w-24" />
                  <Input label="Suffix" value={stat.suffix} onChange={(e) => {
                    const updated = [...aboutStats]; updated[i] = { ...updated[i], suffix: e.target.value }; setAboutStats(updated)
                  }} placeholder="e.g. Years" className="w-32" />
                  {aboutStats.length > 1 && (
                    <Button variant="ghost" size="sm" className="mb-0.5" onClick={() => setAboutStats(aboutStats.filter((_, j) => j !== i))}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setAboutStats([...aboutStats, { label: "", value: "", suffix: "" }])}>
                Add Stat
              </Button>
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Story Milestones</h3>
            <div className="space-y-3">
              {aboutStory.map((milestone, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Input label="Year" value={milestone.year} onChange={(e) => {
                    const updated = [...aboutStory]; updated[i] = { ...updated[i], year: e.target.value }; setAboutStory(updated)
                  }} placeholder="e.g. 2024" className="w-24" />
                  <Input label="Title" value={milestone.title} onChange={(e) => {
                    const updated = [...aboutStory]; updated[i] = { ...updated[i], title: e.target.value }; setAboutStory(updated)
                  }} placeholder="Milestone title" className="w-40" />
                  <Input label="Description" value={milestone.description} onChange={(e) => {
                    const updated = [...aboutStory]; updated[i] = { ...updated[i], description: e.target.value }; setAboutStory(updated)
                  }} placeholder="Description" className="flex-1" />
                  {aboutStory.length > 1 && (
                    <Button variant="ghost" size="sm" className="mb-0.5" onClick={() => setAboutStory(aboutStory.filter((_, j) => j !== i))}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setAboutStory([...aboutStory, { year: "", title: "", description: "" }])}>
                Add Milestone
              </Button>
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Mission</h3>
            <div className="space-y-4">
              <Textarea label="Mission Text" value={aboutMissionText} onChange={(e) => setAboutMissionText(e.target.value)} rows={3} />
              <Textarea label="Mission Bullets (one per line)" value={aboutMissionBullets} onChange={(e) => setAboutMissionBullets(e.target.value)} rows={4} />
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Vision</h3>
            <div className="space-y-4">
              <Textarea label="Vision Text" value={aboutVisionText} onChange={(e) => setAboutVisionText(e.target.value)} rows={3} />
              <Textarea label="Vision Bullets (one per line)" value={aboutVisionBullets} onChange={(e) => setAboutVisionBullets(e.target.value)} rows={4} />
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Education</h3>
            <div className="space-y-3">
              {aboutEducation.map((item, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Input label="Degree" value={item.degree} onChange={(e) => {
                    const updated = [...aboutEducation]; updated[i] = { ...updated[i], degree: e.target.value }; setAboutEducation(updated)
                  }} placeholder="e.g. B.Sc." className="w-28" />
                  <Input label="Institution" value={item.institution} onChange={(e) => {
                    const updated = [...aboutEducation]; updated[i] = { ...updated[i], institution: e.target.value }; setAboutEducation(updated)
                  }} placeholder="University" className="w-36" />
                  <Input label="Location" value={item.location} onChange={(e) => {
                    const updated = [...aboutEducation]; updated[i] = { ...updated[i], location: e.target.value }; setAboutEducation(updated)
                  }} placeholder="City" className="w-28" />
                  <Input label="Year" value={item.year} onChange={(e) => {
                    const updated = [...aboutEducation]; updated[i] = { ...updated[i], year: e.target.value }; setAboutEducation(updated)
                  }} placeholder="e.g. 2024" className="w-20" />
                  <Input label="Description" value={item.description} onChange={(e) => {
                    const updated = [...aboutEducation]; updated[i] = { ...updated[i], description: e.target.value }; setAboutEducation(updated)
                  }} placeholder="Optional" className="flex-1" />
                  {aboutEducation.length > 1 && (
                    <Button variant="ghost" size="sm" className="mb-0.5" onClick={() => setAboutEducation(aboutEducation.filter((_, j) => j !== i))}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setAboutEducation([...aboutEducation, { degree: "", institution: "", location: "", year: "", description: "" }])}>
                Add Education
              </Button>
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Career</h3>
            <div className="space-y-3">
              {aboutCareer.map((item, i) => (
                <div key={i} className="space-y-3 rounded-lg border border-border/20 p-4">
                  <div className="flex items-end gap-3">
                    <Input label="Role" value={item.role} onChange={(e) => {
                      const updated = [...aboutCareer]; updated[i] = { ...updated[i], role: e.target.value }; setAboutCareer(updated)
                    }} placeholder="e.g. Software Engineer" className="flex-1" />
                    <Input label="Company" value={item.company} onChange={(e) => {
                      const updated = [...aboutCareer]; updated[i] = { ...updated[i], company: e.target.value }; setAboutCareer(updated)
                    }} placeholder="Company name" className="flex-1" />
                    <Input label="Location" value={item.location} onChange={(e) => {
                      const updated = [...aboutCareer]; updated[i] = { ...updated[i], location: e.target.value }; setAboutCareer(updated)
                    }} placeholder="City" className="w-28" />
                    {aboutCareer.length > 1 && (
                      <Button variant="ghost" size="sm" className="mb-0.5" onClick={() => setAboutCareer(aboutCareer.filter((_, j) => j !== i))}>
                        Remove
                      </Button>
                    )}
                  </div>
                  <div className="flex items-end gap-3">
                    <Input label="Period" value={item.period} onChange={(e) => {
                      const updated = [...aboutCareer]; updated[i] = { ...updated[i], period: e.target.value }; setAboutCareer(updated)
                    }} placeholder="e.g. Jan 2022 - Present" className="w-48" />
                    <Textarea label="Description" value={item.description} onChange={(e) => {
                      const updated = [...aboutCareer]; updated[i] = { ...updated[i], description: e.target.value }; setAboutCareer(updated)
                    }} rows={2} className="flex-1" />
                  </div>
                  <div>
                    <Textarea label="Tags (one per line)" value={item.tags} onChange={(e) => {
                      const updated = [...aboutCareer]; updated[i] = { ...updated[i], tags: e.target.value }; setAboutCareer(updated)
                    }} rows={2} />
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setAboutCareer([...aboutCareer, { role: "", company: "", location: "", period: "", description: "", tags: "" }])}>
                Add Career
              </Button>
            </div>
          </GlassCard>

          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Goals</h3>
            <div className="space-y-3">
              {aboutGoals.map((goal, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Input label="Title" value={goal.title} onChange={(e) => {
                    const updated = [...aboutGoals]; updated[i] = { ...updated[i], title: e.target.value }; setAboutGoals(updated)
                  }} placeholder="Goal title" className="w-40" />
                  <Input label="Description" value={goal.description} onChange={(e) => {
                    const updated = [...aboutGoals]; updated[i] = { ...updated[i], description: e.target.value }; setAboutGoals(updated)
                  }} placeholder="Description" className="flex-1" />
                  <Input label="Icon" value={goal.icon} onChange={(e) => {
                    const updated = [...aboutGoals]; updated[i] = { ...updated[i], icon: e.target.value }; setAboutGoals(updated)
                  }} placeholder="Icon name" className="w-28" />
                  {aboutGoals.length > 1 && (
                    <Button variant="ghost" size="sm" className="mb-0.5" onClick={() => setAboutGoals(aboutGoals.filter((_, j) => j !== i))}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setAboutGoals([...aboutGoals, { title: "", description: "", icon: "" }])}>
                Add Goal
              </Button>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="home" className="mt-6 space-y-6">
          <GlassCard intensity="light" className="p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Home Page Sections</h3>
            <p className="mb-4 text-xs text-muted-foreground">Toggle sections on/off and reorder them by dragging.</p>
            <div className="space-y-2">
              {homeSections.map((section, i) => (
                <div
                  key={section.id}
                  className="flex items-center gap-3 rounded-lg border border-border/20 bg-background px-4 py-3"
                >
                  <GripVertical size={16} className="shrink-0 cursor-grab text-muted-foreground" />
                  <label className="flex items-center gap-3 flex-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={section.enabled}
                      onChange={() => {
                        const updated = [...homeSections]
                        updated[i] = { ...updated[i], enabled: !updated[i].enabled }
                        setHomeSections(updated)
                      }}
                      className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 border-border"
                    />
                    <span className="text-sm font-medium">{section.label}</span>
                  </label>
                  <div className="flex items-center gap-1">
                    {i > 0 && (
                      <Button variant="ghost" size="sm" onClick={() => {
                        const updated = [...homeSections]
                        ;[updated[i - 1], updated[i]] = [updated[i], updated[i - 1]]
                        setHomeSections(updated)
                      }}>
                        Up
                      </Button>
                    )}
                    {i < homeSections.length - 1 && (
                      <Button variant="ghost" size="sm" onClick={() => {
                        const updated = [...homeSections]
                        ;[updated[i], updated[i + 1]] = [updated[i + 1], updated[i]]
                        setHomeSections(updated)
                      }}>
                        Down
                      </Button>
                    )}
                  </div>
                </div>
              ))}
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
