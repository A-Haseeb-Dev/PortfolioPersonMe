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
  ArrowLeft,
  User,
  Mail,
  Phone,
  DollarSign,
  Clock,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone must be at least 7 characters").optional().or(z.literal("")),
  serviceInterest: z.string().min(1, "Please select a service"),
  budget: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
})

type InquiryFormData = z.infer<typeof inquirySchema>

const services = [
  "Web Development",
  "Mobile Apps",
  "SaaS Development",
  "API Development",
  "Database Design",
  "AI Solutions",
  "Consulting",
]

const budgets = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
]

const timelines = [
  "Within 1 week",
  "1-2 weeks",
  "2-4 weeks",
  "1-2 months",
  "2-3 months",
  "Flexible / Not sure",
]

interface ServiceInquiryFormProps {
  preselectedService?: string
  onBack: () => void
}

export default function ServiceInquiryForm({ preselectedService, onBack }: ServiceInquiryFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      serviceInterest: preselectedService || "",
    },
  })

  const selectedService = watch("serviceInterest")

  const onSubmit = async (data: InquiryFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Service inquiry:", data)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="mt-6 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Inquiry Sent!
        </h3>
        <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
          Thank you for your interest. I&apos;ll review your requirements and get back to you
          within 24 hours.
        </p>
        <Button variant="outline" className="mt-8" onClick={onBack}>
          Back to services
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
      className="rounded-2xl border border-zinc-200 bg-white/50 backdrop-blur-xl dark:border-zinc-700/50 dark:bg-zinc-900/50"
    >
      <div className="p-6 sm:p-8">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          <ArrowLeft size={14} />
          Back to services
        </button>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Let&apos;s Build Something Great
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Tell me about your project and I&apos;ll get back to you with a tailored proposal.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Full Name *"
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
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              label="Phone"
              type="tel"
              placeholder="+92 300 1234567"
              icon={<Phone size={16} />}
              error={errors.phone?.message}
              {...register("phone")}
            />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Service Interest *
              </label>
              <Select
                value={selectedService}
                onValueChange={(value) => setValue("serviceInterest", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceInterest && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errors.serviceInterest.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Budget Range *
              </label>
              <Select onValueChange={(value) => setValue("budget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgets.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budget && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errors.budget.message}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Timeline *
              </label>
              <Select onValueChange={(value) => setValue("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelines.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.timeline && (
                <p className="text-xs text-red-500 dark:text-red-400">
                  {errors.timeline.message}
                </p>
              )}
            </div>
          </div>
          <Textarea
            label="Project Details *"
            placeholder="Describe your project, goals, and any specific requirements..."
            rows={5}
            error={errors.message?.message}
            {...register("message")}
          />
          <div className="flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <MessageSquare size={14} />
              I typically respond within 24 hours
            </div>
            <Button type="submit" loading={isSubmitting} size="lg">
              {isSubmitting ? "Sending..." : "Send Inquiry"}
              {!isSubmitting && <Send size={14} />}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
