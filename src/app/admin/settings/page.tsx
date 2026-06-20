"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Save, Loader2, Image as ImageIcon } from "lucide-react"
import { FormWrapper, FormSection, FormGrid } from "@/components/admin/form-wrapper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { GlassCard } from "@/components/ui/glass-card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface SocialLink {
  platform: string
  url: string
  label: string
}

export default function AdminSettings() {
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")

  const [siteName, setSiteName] = useState("Abdul Haseeb")
  const [siteDescription, setSiteDescription] = useState("Full-Stack Developer & Tech Entrepreneur")
  const [siteLogo, setSiteLogo] = useState("")

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: "GitHub", url: "https://github.com/abdulhaseeb", label: "GitHub" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/abdulhaseeb", label: "LinkedIn" },
    { platform: "Twitter", url: "https://twitter.com/abdulhaseeb", label: "Twitter" },
  ])

  const [seoTitle, setSeoTitle] = useState("Abdul Haseeb - Full-Stack Developer & Tech Entrepreneur")
  const [seoDescription, setSeoDescription] = useState("Portfolio and blog of Abdul Haseeb, a full-stack developer and tech entrepreneur.")
  const [seoKeywords, setSeoKeywords] = useState("full-stack developer, portfolio, web development, react, next.js")
  const [ogImage, setOgImage] = useState("")

  const [theme, setTheme] = useState("system")
  const [accentColor, setAccentColor] = useState("zinc")
  const [layoutStyle, setLayoutStyle] = useState("standard")
  const [animationsEnabled, setAnimationsEnabled] = useState(true)

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  const updateSocial = (index: number, field: keyof SocialLink, value: string) => {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link))
    )
  }

  const addSocial = () => {
    setSocialLinks([...socialLinks, { platform: "", url: "", label: "" }])
  }

  const removeSocial = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  return (
    <FormWrapper
      title="Site Settings"
      description="Configure your portfolio site"
      backHref="/admin"
      onSave={handleSave}
      saving={saving}
      saveLabel="Save Settings"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <FormSection title="Site Information">
            <FormGrid cols={2}>
              <Input label="Site Name" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              <Input label="Logo URL" value={siteLogo} onChange={(e) => setSiteLogo(e.target.value)} placeholder="https://..." icon={<ImageIcon size={16} />} />
            </FormGrid>
            <div className="mt-4">
              <Textarea label="Site Description" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} rows={3} />
            </div>
          </FormSection>
        </TabsContent>

        <TabsContent value="social" className="mt-6">
          <FormSection title="Social Links" description="Links to your social profiles">
            <div className="space-y-3">
              {socialLinks.map((link, i) => (
                <div key={i} className="flex items-end gap-3">
                  <Input
                    label="Platform"
                    value={link.platform}
                    onChange={(e) => updateSocial(i, "platform", e.target.value)}
                    placeholder="e.g. GitHub"
                    className="w-32"
                  />
                  <Input
                    label="URL"
                    value={link.url}
                    onChange={(e) => updateSocial(i, "url", e.target.value)}
                    placeholder="https://..."
                    className="flex-1"
                  />
                  <Input
                    label="Label"
                    value={link.label}
                    onChange={(e) => updateSocial(i, "label", e.target.value)}
                    placeholder="Display name"
                    className="w-32"
                  />
                  {socialLinks.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mb-0.5"
                      onClick={() => removeSocial(i)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addSocial}>
                Add Link
              </Button>
            </div>
          </FormSection>
        </TabsContent>

        <TabsContent value="seo" className="mt-6">
          <FormSection title="SEO Defaults" description="Default meta tags for your site">
            <div className="space-y-4">
              <Input label="Default SEO Title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
              <Textarea label="Meta Description" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} rows={3} />
              <Input label="Keywords (comma separated)" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)} />
              <Input label="OG Image URL" value={ogImage} onChange={(e) => setOgImage(e.target.value)} placeholder="https://..." icon={<ImageIcon size={16} />} />
            </div>
          </FormSection>
        </TabsContent>

        <TabsContent value="theme" className="mt-6">
          <FormSection title="Theme Settings" description="Customize the appearance of your site">
            <FormGrid cols={2}>
              <div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={layoutStyle} onValueChange={setLayoutStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="expanded">Expanded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </FormGrid>
            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-700 text-muted-foreground mb-2">Accent Color</p>
              <div className="flex gap-2">
                {["zinc", "blue", "emerald", "violet", "amber", "rose"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    className={cn(
                      "h-8 w-8 rounded-full border-2 transition-all",
                      color === "zinc" && "bg-zinc-500 border-zinc-500",
                      color === "blue" && "bg-blue-500 border-blue-500",
                      color === "emerald" && "bg-emerald-500 border-emerald-500",
                      color === "violet" && "bg-violet-500 border-violet-500",
                      color === "amber" && "bg-amber-500 border-amber-500",
                      color === "rose" && "bg-rose-500 border-rose-500",
                      accentColor === color && "ring-2 ring-offset-2 ring-zinc-900 ring-foreground ring-offset-background"
                    )}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={animationsEnabled}
                  onChange={(e) => setAnimationsEnabled(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 border-border"
                />
                <span className="text-sm text-zinc-700 text-muted-foreground">Enable animations</span>
              </label>
            </div>
          </FormSection>
        </TabsContent>
      </Tabs>
    </FormWrapper>
  )
}


