"use client"

import { motion } from "framer-motion"
import { Bot, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ChatMessage as ChatMessageType } from "@/types"

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(message.timestamp))

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn("flex gap-3 w-full", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div className="shrink-0 mt-1">
          <div className="size-8 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-300 flex items-center justify-center shadow-sm">
            <Bot className="size-4 text-white dark:text-zinc-900" />
          </div>
        </div>
      )}

      <div className={cn("flex flex-col max-w-[85%] sm:max-w-[75%]", isUser ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words",
            isUser
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 rounded-br-md"
              : "bg-white/60 backdrop-blur-xl border border-white/20 dark:bg-zinc-900/40 dark:border-zinc-800/50 text-zinc-800 dark:text-zinc-200 rounded-bl-md shadow-sm",
          )}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-zinc-400 mt-1 px-1">{time}</span>
      </div>

      {isUser && (
        <div className="shrink-0 mt-1">
          <div className="size-8 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-300 flex items-center justify-center shadow-sm">
            <User className="size-4 text-white dark:text-zinc-900" />
          </div>
        </div>
      )}
    </motion.div>
  )
}
