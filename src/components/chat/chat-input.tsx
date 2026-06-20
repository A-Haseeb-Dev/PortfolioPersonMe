"use client"

import { useState, useRef, useEffect, type KeyboardEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { suggestions } from "@/lib/chat-engine"

interface ChatInputProps {
  onSend: (message: string) => void
  isProcessing: boolean
}

export function ChatInput({ onSend, isProcessing }: ChatInputProps) {
  const [input, setInput] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isProcessing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isProcessing])

  const handleSend = () => {
    if (!input.trim() || isProcessing) return
    onSend(input.trim())
    setInput("")
    setShowSuggestions(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleSuggestionClick = (query: string) => {
    onSend(query)
    setInput("")
    setShowSuggestions(false)
  }

  return (
    <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl">
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-3 pb-2 flex flex-wrap gap-1.5">
              {suggestions.slice(0, 4).map((s) => (
                <button
                  key={s.query}
                  onClick={() => handleSuggestionClick(s.query)}
                  disabled={isProcessing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
                >
                  <Sparkles className="size-3" />
                  {s.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 px-4 py-3">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            if (e.target.value === "") {
              setShowSuggestions(true)
            }
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Ask me anything..."
          disabled={isProcessing}
          className={cn(
            "flex-1 bg-transparent text-sm text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none border-none",
            isProcessing && "opacity-50",
          )}
        />
        <motion.button
          onClick={handleSend}
          disabled={!input.trim() || isProcessing}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "shrink-0 size-9 rounded-xl flex items-center justify-center transition-all duration-200",
            input.trim() && !isProcessing
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600",
          )}
        >
          {isProcessing ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="size-4 border-2 border-zinc-400 border-t-transparent rounded-full"
            />
          ) : (
            <Send className="size-4" />
          )}
        </motion.button>
      </div>
    </div>
  )
}
