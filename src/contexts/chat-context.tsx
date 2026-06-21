"use client"

import {
  createContext,
  useContext,
  useCallback,
  useState,
  type ReactNode,
} from "react"
import type { ChatMessage } from "@/types"

interface ChatContextValue {
  isOpen: boolean
  messages: ChatMessage[]
  unreadCount: number
  isProcessing: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi there! 👋 I'm Abdul Haseeb's AI assistant. I can tell you about his skills, projects, experience, and services. What would you like to know?",
      timestamp: new Date(),
    },
  ])
  const [unreadCount, setUnreadCount] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const openChat = useCallback(() => {
    setIsOpen(true)
    setUnreadCount(0)
  }, [])

  const closeChat = useCallback(() => {
    setIsOpen(false)
    setUnreadCount(0)
  }, [])

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      if (prev) {
        return false
      }
      setUnreadCount(0)
      return true
    })
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isProcessing) return

    setIsProcessing(true)

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content.trim() }),
      })

      const data = await res.json()

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch {
      const errorMessage: ChatMessage = {
        id: `bot-error-${Date.now()}`,
        role: "assistant",
        content:
          "Sorry, I'm having trouble connecting. Please try again in a moment.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsProcessing(false)
    }
  }, [isProcessing])

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        content:
          "Hi there! 👋 I'm Abdul Haseeb's AI assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ])
    setUnreadCount(1)
  }, [])

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        unreadCount,
        isProcessing,
        openChat,
        closeChat,
        toggleChat,
        sendMessage,
        clearMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export function useChat(): ChatContextValue {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider")
  }
  return context
}
