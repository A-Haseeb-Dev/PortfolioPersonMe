"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Plus,
  X,
  GripVertical,
  Image as ImageIcon,
  Video,
  GitBranch,
  Globe,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { FormWrapper, FormSection, FormGrid } from "@/components/admin/form-wrapper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlassCard } from "@/components/ui/glass-card"
import { slugify } from "@/lib/utils"

const techOptions = [
  "React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL",
  "MongoDB", "Redis", "Docker", "AWS", "GraphQL", "Tailwind CSS",
  "Prisma", "tRPC", "Go", "Rust",
]

export default function CreateProject() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [problem, setProblem] = useState("")
  const [solution, setSolution] = useState("")
  const [architecture, setArchitecture] = useState("")
  const [features, setFeatures] = useState<string[]>([""])
  const [techStack, setTechStack] = useState<string[]>([])
  const [githubUrl, setGithubUrl] = useState("")
  const [liveUrl, setLiveUrl] = useState("")
  const [videoDemo, setVideoDemo] = useState("")
  const [results, setResults] = useState("")
  const [lessons, setLessons] = useState("")
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleTitleChange = (val: string) => {
    setTitle(val)
    setSlug(slugify(val))
  }

  const addFeature = () => setFeatures([...features, ""])
  const removeFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i))
  const updateFeature = (i: number, val: string) => {
    const next = [...features]
    next[i] = val
    setFeatures(next)
  }

  const toggleTech = (tech: string) => {
    setTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    )
  }

  const handleSave = async (asDraft = false) => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    router.push("/admin/projects")
  }

  return (
    <FormWrapper
      title={title || "New Project"}
      description="Create a new portfolio project"
      backHref="/admin/projects"
      onSave={() => handleSave(false)}
      onSaveDraft={() => handleSave(true)}
      saving={saving}
      saveLabel="Publish"
      saveDraftLabel="Save as Draft"
    >
      <FormSection title="Basic Information" description="General details about your project">
        <FormGrid cols={2}>
          <div className="md:col-span-2">
            <Input label="Project Title" value={title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="e.g. E-Commerce Platform" />
          </div>
          <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e-commerce-platform" />
          <Input label="Cover Image URL" placeholder="https://images.unsplash.com/..." icon={<ImageIcon size={16} />} />
        </FormGrid>
        <div className="mt-4">
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the project..." rows={3} />
        </div>
      </FormSection>

      <FormSection title="Project Details" description="In-depth information about the project">
        <div className="space-y-4">
          <Textarea label="Problem" value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="What problem does this project solve?" rows={3} />
          <Textarea label="Solution" value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="How did you approach the solution?" rows={3} />
          <Textarea label="Architecture" value={architecture} onChange={(e) => setArchitecture(e.target.value)} placeholder="Describe the architecture and key decisions..." rows={3} />
        </div>
      </FormSection>

      <FormSection title="Features" description="Key features of the project">
        <div className="space-y-2">
          {features.map((feat, i) => (
            <div key={i} className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 shrink-0 text-zinc-400" />
              <Input value={feat} onChange={(e) => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`} />
              {features.length > 1 && (
                <Button variant="ghost" size="icon" onClick={() => removeFeature(i)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button variant="ghost" size="sm" onClick={addFeature} className="gap-1">
            <Plus className="h-3.5 w-3.5" />
            Add Feature
          </Button>
        </div>
      </FormSection>

      <FormSection title="Tech Stack" description="Technologies used in this project">
        <div className="flex flex-wrap gap-2">
          {techOptions.map((tech) => (
            <Badge
              key={tech}
              variant={techStack.includes(tech) ? "default" : "outline"}
              className="cursor-pointer transition-all"
              onClick={() => toggleTech(tech)}
            >
              {tech}
            </Badge>
          ))}
        </div>
      </FormSection>

      <FormSection title="Links" description="External links for the project">
        <FormGrid cols={2}>
          <Input label="GitHub URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." icon={<GitBranch size={16} />} />
          <Input label="Live URL" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." icon={<Globe size={16} />} />
          <Input label="Video Demo" value={videoDemo} onChange={(e) => setVideoDemo(e.target.value)} placeholder="https://youtube.com/..." icon={<Video size={16} />} />
        </FormGrid>
      </FormSection>

      <FormSection title="Outcomes" description="Results and lessons learned">
        <div className="space-y-4">
          <Textarea label="Results" value={results} onChange={(e) => setResults(e.target.value)} placeholder="What were the measurable outcomes?" rows={3} />
          <Textarea label="Lessons Learned" value={lessons} onChange={(e) => setLessons(e.target.value)} placeholder="What did you learn from this project?" rows={3} />
        </div>
      </FormSection>

      <FormSection title="Publishing">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 border-border"
            />
            <span className="text-sm font-medium text-zinc-700 text-muted-foreground">Published</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 border-border"
            />
            <span className="text-sm font-medium text-zinc-700 text-muted-foreground">Featured</span>
          </label>
        </div>
      </FormSection>
    </FormWrapper>
  )
}
