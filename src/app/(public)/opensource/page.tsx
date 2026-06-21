"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Loader2 } from "lucide-react"
import OpensourceHeader from "@/components/opensource/opensource-header"
import OpensourceRepos from "@/components/opensource/opensource-repos"
import OpensourceContributions from "@/components/opensource/opensource-contributions"

interface Profile {
  username: string
  name: string | null
  avatar: string | null
  bio: string | null
  totalStars: number
  totalForks: number
  totalRepos: number
}

interface Repo {
  id: string
  name: string
  description: string | null
  stars: number
  forks: number
  issues: number
  language: string | null
  languageColor: string | null
  url: string | null
  topics: string[] | null
}

export default function OpensourcePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetch("/api/opensource")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load open source data")
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setProfile(data.profile)
        setRepos(data.repos || [])
      })
      .catch((err) => {
        if (cancelled) return
        setError(err.message)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-red-500">{error}</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen pb-24">
      <Container>
        <OpensourceHeader profile={profile} />
        <OpensourceContributions />
        <OpensourceRepos repos={repos} />
      </Container>
    </main>
  )
}
