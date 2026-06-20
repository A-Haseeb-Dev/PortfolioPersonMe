"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChat } from "@/contexts/chat-context"

export function ChatButton() {
  const { isOpen, unreadCount, toggleChat } = useChat()

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {unreadCount > 0 && !isOpen && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 size-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg z-10"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative size-14 rounded-2xl flex items-center justify-center shadow-xl transition-shadow duration-300",
          isOpen
            ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-zinc-900/10 dark:shadow-black/30"
            : "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-zinc-900/20 dark:shadow-black/30 hover:shadow-2xl",
        )}
      >
        {isOpen ? (
          <X className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
      </motion.button>
    </div>
  )
}
