"use client"

import { useState, useCallback } from "react"
import { AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import ServicesHeader from "@/components/services/services-header"
import ServicesGrid, { services } from "@/components/services/services-grid"
import ServiceDetail from "@/components/services/service-detail"
import ServiceInquiryForm from "@/components/services/service-inquiry-form"

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [showInquiry, setShowInquiry] = useState(false)
  const [inquiryService, setInquiryService] = useState<string | undefined>()

  const selectedServiceData = services.find((s) => s.id === selectedService)

  const handleSelect = useCallback((service: (typeof services)[0] | null) => {
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
