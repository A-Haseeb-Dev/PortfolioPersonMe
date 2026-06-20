"use client"

import { Container } from "@/components/ui/container"
import ContactHeader from "@/components/contact/contact-header"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"

export default function ContactPage() {
  return (
    <main className="min-h-screen pb-24">
      <Container>
        <ContactHeader />
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="lg:col-span-2">
            <ContactInfo />
          </div>
        </div>
      </Container>
    </main>
  )
}
