"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Bot, Trash2 } from "lucide-react"
import { useChat } from "@/contexts/chat-context"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"

export function ChatWindow() {
  const { isOpen, messages, isProcessing, closeChat, sendMessage, clearMessages } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-24 right-6 z-50 w-[380px] max-[420px]:right-4 max-[420px]:left-4 max-[420px]:w-auto"
        >
          <div className="relative rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-2xl shadow-2xl shadow-zinc-900/10 dark:shadow-black/30 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="size-9 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-300 flex items-center justify-center shadow-sm">
                    <Bot className="size-5 text-white dark:text-zinc-900" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-950" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
                    Abdul Haseeb
                  </h3>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearMessages}
                  className="size-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Clear chat"
                >
                  <Trash2 className="size-4" />
                </button>
                <button
                  onClick={closeChat}
                  className="size-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-[420px] overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(0,0,0,0.1) transparent" }}
            >
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isProcessing && (
                <div className="flex gap-3 items-center">
                  <div className="size-8 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-300 flex items-center justify-center shadow-sm">
                    <Bot className="size-4 text-white dark:text-zinc-900" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/60 backdrop-blur-xl border border-white/20 dark:bg-zinc-900/40 dark:border-zinc-800/50 rounded-2xl rounded-bl-md px-4 py-3"
                  >
                    <div className="flex gap-1.5">
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                        className="size-2 rounded-full bg-zinc-400"
                      />
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                        className="size-2 rounded-full bg-zinc-400"
                      />
                      <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                        className="size-2 rounded-full bg-zinc-400"
                      />
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            <ChatInput onSend={sendMessage} isProcessing={isProcessing} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
