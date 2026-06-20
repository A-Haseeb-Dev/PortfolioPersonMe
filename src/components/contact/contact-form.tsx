"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Send,
  Loader2,
  CheckCircle2,
  User,
  Mail,
  MessageSquare,
  Hash,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Contact form:", data)
    setIsSubmitted(true)
    reset()
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white/50 px-8 py-16 text-center backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/50"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Message Sent!
        </h3>
        <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          Thank you for reaching out! I&apos;ll review your message and get back to you
          within 24 hours.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setIsSubmitted(false)}>
          Send another message
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/50"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Send a Message
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Fill out the form below and I&apos;ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Your Name *"
              placeholder="Abdul Haseeb"
              icon={<User size={16} />}
              error={errors.name?.message}
              {...register("name")}
            />
            <Input
              label="Email Address *"
              type="email"
              placeholder="haseeb@example.com"
              icon={<Mail size={16} />}
              error={errors.email?.message}
              {...register("email")}
            />
          </div>
          <Input
            label="Subject *"
            placeholder="What's this about?"
            icon={<Hash size={16} />}
            error={errors.subject?.message}
            {...register("subject")}
          />
          <Textarea
            label="Message *"
            placeholder="Tell me about your project, question, or just say hello..."
            rows={6}
            error={errors.message?.message}
            {...register("message")}
          />
          <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <MessageSquare size={14} />
              I typically respond within 24 hours
            </div>
            <Button type="submit" loading={isSubmitting} size="lg">
              {isSubmitting ? "Sending..." : "Send Message"}
              {!isSubmitting && <Send size={14} />}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
