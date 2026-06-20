"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import ServicesHeader from "@/components/services/services-header"
import ServicesGrid from "@/components/services/services-grid"
import { useData } from "@/hooks/use-data"
import { Globe, Smartphone, Cloud, Database, Cpu, BrainCircuit, Code2, type LucideIcon } from "lucide-react"
import ServiceDetail from "@/components/services/service-detail"
import ServiceInquiryForm from "@/components/services/service-inquiry-form"

interface ServiceItem {
  id: string
  title: string
  tagline: string
  icon: LucideIcon
  color: string
  description: string
  features: string[]
  price: string
}

const iconMap: Record<string, LucideIcon> = {
  globe: Globe, smartPhone: Smartphone, cloud: Cloud,
  database: Database, cpu: Cpu, brainCircuit: BrainCircuit, code2: Code2,
}

const colorGradients = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-pink-400",
  "from-emerald-500 to-teal-400",
  "from-amber-500 to-orange-400",
  "from-sky-500 to-indigo-400",
  "from-rose-500 to-red-400",
  "from-zinc-600 to-zinc-400",
]

function transformServices(data: Record<string, unknown>): ServiceItem[] {
  const items = (data as any).services || []
  return items.map((s: any, i: number) => ({
    id: s.id,
    title: s.title,
    tagline: s.description?.slice(0, 60) || "Professional service",
    icon: iconMap[s.icon?.toLowerCase()] || Code2,
    color: colorGradients[i % colorGradients.length],
    description: s.description || "",
    features: Array.isArray(s.features) ? s.features : [],
    price: s.price ? `$${s.price}` : "Contact for pricing",
  }))
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showInquiry, setShowInquiry] = useState(false)
  const [inquiryService, setInquiryService] = useState<string | undefined>()

  const servicesData = useData<ServiceItem>("/api/services?published=true&limit=50", [], transformServices)
  const selectedServiceData = servicesData.find((s) => s.id === selectedService)

  const handleSelect = useCallback((service: (typeof servicesData)[0] | null) => {
    setSelectedService(service?.id ?? null)
    setShowInquiry(false)
  }, [])

  const handleInquire = useCallback((serviceTitle?: string) => {
    setInquiryService(serviceTitle)
    setShowInquiry(true)
  }, [])

  return (
    <main className="min-h-screen pb-24">
      <Container>
        <ServicesHeader />
        <AnimatePresence mode="wait">
          {showInquiry ? (
            <ServiceInquiryForm
              key="inquiry"
              preselectedService={inquiryService}
              onBack={() => setShowInquiry(false)}
            />
          ) : selectedServiceData ? (
            <ServiceDetail
              key="detail"
              service={selectedServiceData}
              onClose={() => setSelectedService(null)}
              onInquire={() => handleInquire(selectedServiceData.title)}
            />
          ) : (
            <ServicesGrid
              key="grid"
              services={servicesData}
              onSelect={(service) => {
                if (!service) { setSelectedService(null); return; }
                setSelectedService(selectedService === service.id ? null : service.id)
              }}
              selectedId={selectedService}
            />
          )}
        </AnimatePresence>
      </Container>
    </main>
  )
}
