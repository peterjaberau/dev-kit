'use client'
import { useState, useRef, useEffect, type FormEvent } from 'react'
import { ScrollArea } from '../../ui/scroll-area'
import { Button } from '../../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu'
import {
  Send,
  Plus,
  MoreHorizontal,
  Copy,
  Trash,
  RefreshCw,
  Sparkles,
  User,
  Code,
  FileCode,
  Lightbulb,
  Bug,
  Zap,
} from '../../ui/icons'
import { cn } from '../../../lib/utils'

// ============================================
// Types
// ============================================

export type MessageRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  isStreaming?: boolean
}

export interface QuickAction {
  id: string
  label: string
  icon: React.ReactNode
  prompt: string
}

interface AIChatPanelProps {
  messages?: ChatMessage[]
  onSendMessage?: (message: string) => void
  onNewChat?: () => void
  onClearChat?: () => void
  isLoading?: boolean
  className?: string
}

// ============================================
// Quick Actions
// ============================================

const quickActions: QuickAction[] = [
  {
    id: 'explain',
    label: 'Explain',
    icon: <Lightbulb size={14} />,
    prompt: 'Explain this code',
  },
  {
    id: 'fix',
    label: 'Fix errors',
    icon: <Bug size={14} />,
    prompt: 'Fix the errors in this code',
  },
  {
    id: 'optimize',
    label: 'Optimize',
    icon: <Zap size={14} />,
    prompt: 'Optimize this code for performance',
  },
  {
    id: 'refactor',
    label: 'Refactor',
    icon: <Code size={14} />,
    prompt: 'Refactor this code to be cleaner',
  },
]

// ============================================
// Message Bubble Component
// ============================================

interface MessageBubbleProps {
  message: ChatMessage
  onCopy?: () => void
  onRegenerate?: () => void
}

function MessageBubble({ message, onCopy, onRegenerate }: MessageBubbleProps) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'group flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-primary-600)]'
            : 'bg-gradient-to-br from-[var(--color-accent-400)] to-[var(--color-accent-600)]'
        )}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Sparkles size={14} className="text-white" />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          'flex max-w-[85%] flex-col gap-1',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-xl px-3 py-2 text-sm',
            isUser
              ? 'bg-[var(--color-primary-600)] text-white'
              : 'border border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-primary)]'
          )}
        >
          {message.isStreaming ? (
            <span className="flex items-center gap-2">
              <span className="animate-pulse">Thinking...</span>
            </span>
          ) : (
            <MessageContent content={message.content} />
          )}
        </div>

        {/* Actions (for assistant messages) */}
        {!isUser && !message.isStreaming && (
          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onCopy}
              title="Copy"
            >
              <Copy size={12} />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={onRegenerate}
              title="Regenerate"
            >
              <RefreshCw size={12} />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================
// Message Content Component (with code block support)
// ============================================

function MessageContent({ content }: { content: string }) {
  // Simple markdown-like parsing for code blocks
  const parts = content.split(/(```[\s\S]*?```)/g)

  return (
    <div className="space-y-2">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const codeContent = part.slice(3, -3)
          const firstLineEnd = codeContent.indexOf('\n')
          const language =
            firstLineEnd > 0 ? codeContent.slice(0, firstLineEnd).trim() : ''
          const code =
            firstLineEnd > 0 ? codeContent.slice(firstLineEnd + 1) : codeContent

          return (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-[var(--border-default)]"
            >
              {language && (
                <div className="flex items-center justify-between bg-[var(--bg-elevated)] px-3 py-1.5 text-xs text-[var(--text-tertiary)]">
                  <span className="flex items-center gap-1.5">
                    <FileCode size={12} />
                    {language}
                  </span>
                  <Button variant="ghost" size="icon-xs">
                    <Copy size={12} />
                  </Button>
                </div>
              )}
              <pre className="overflow-x-auto bg-[var(--bg-base)] p-3 font-mono text-xs">
                <code>{code}</code>
              </pre>
            </div>
          )
        }

        // Regular text with line breaks
        return (
          <p key={index} className="whitespace-pre-wrap">
            {part}
          </p>
        )
      })}
    </div>
  )
}

// ============================================
// Empty State Component
// ============================================

function EmptyState({
  onQuickAction,
}: {
  onQuickAction: (prompt: string) => void
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary-400)] to-[var(--color-accent-500)]">
        <Sparkles size={24} className="text-white" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
        AI Assistant
      </h3>
      <p className="mb-6 max-w-xs text-sm text-[var(--text-secondary)]">
        Ask questions about your code, get explanations, or request help with
        debugging and optimization.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onQuickAction(action.prompt)}
            className="gap-1.5"
          >
            {action.icon}
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

// ============================================
// AI Chat Panel Component
// ============================================

export function AIChatPanel({
  messages: externalMessages,
  onSendMessage,
  onNewChat,
  onClearChat,
  isLoading = false,
  className,
}: AIChatPanelProps) {
  const [inputValue, setInputValue] = useState('')
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Use external messages if provided, otherwise use internal state
  const messages = externalMessages ?? internalMessages
  const setMessages = externalMessages ? undefined : setInternalMessages

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    // Add user message (only in uncontrolled mode)
    setMessages?.((prev) => [...prev, userMessage])
    onSendMessage?.(inputValue.trim())
    setInputValue('')

    // Simulate AI response (for demo, only in uncontrolled mode)
    if (!onSendMessage && setMessages) {
      const streamingMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      }
      setMessages((prev) => [...prev, streamingMessage])

      // Simulate response after delay
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === streamingMessage.id
              ? {
                  ...m,
                  isStreaming: false,
                  content: getSimulatedResponse(userMessage.content),
                }
              : m
          )
        )
      }, 1500)
    }
  }

  const handleQuickAction = (prompt: string) => {
    setInputValue(prompt)
    inputRef.current?.focus()
  }

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleNewChat = () => {
    setMessages?.([])
    onNewChat?.()
  }

  return (
    <div className={cn('flex h-full flex-col', className)}>
      {/* Header */}
      <div className="flex h-9 items-center justify-between border-b border-[var(--border-default)] px-3">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--color-primary-500)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            AI Chat
          </span>
        </div>
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleNewChat}
            title="New Chat"
          >
            <Plus size={14} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-xs">
                <MoreHorizontal size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleNewChat}>
                <Plus size={14} />
                New Chat
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onClearChat}>
                <Trash size={14} />
                Clear History
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chat content */}
      {messages.length === 0 ? (
        <EmptyState onQuickAction={handleQuickAction} />
      ) : (
        <ScrollArea className="flex-1" ref={scrollRef}>
          <div className="space-y-4 p-3">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                onCopy={() => handleCopy(message.content)}
              />
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Quick actions (when there are messages) */}
      {messages.length > 0 && (
        <div className="flex items-center gap-1.5 border-t border-[var(--border-default)] px-3 py-2">
          {quickActions.slice(0, 3).map((action) => (
            <Button
              key={action.id}
              variant="ghost"
              size="xs"
              onClick={() => handleQuickAction(action.prompt)}
              className="h-6 gap-1 px-2 text-xs"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-[var(--border-default)] p-3"
      >
        <div className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] px-3 py-2 focus-within:border-[var(--color-primary-500)] focus-within:ring-1 focus-within:ring-[var(--color-primary-500)]">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask AI anything..."
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            type="submit"
            variant="default"
            size="icon-sm"
            disabled={!inputValue.trim() || isLoading}
          >
            <Send size={14} />
          </Button>
        </div>
      </form>
    </div>
  )
}

// ============================================
// Simulated Response (for demo)
// ============================================

function getSimulatedResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase()

  if (lowerMessage.includes('explain')) {
    return `**Code Explanation**

This code implements a palindrome checking function. Here's how it works:

1. **Negative Check**: First, it checks if the number is negative. Negative numbers cannot be palindromes because of the minus sign.

2. **Reversal Process**: The algorithm reverses the number digit by digit:
   - Extract the last digit using modulo (%)
   - Build the reversed number by multiplying by 10 and adding the digit
   - Remove the last digit using integer division (//)

3. **Comparison**: Finally, it compares the original number with the reversed version.

\`\`\`python
# Time Complexity: O(log n)
# Space Complexity: O(1)
\`\`\``
  }

  if (lowerMessage.includes('fix') || lowerMessage.includes('error')) {
    return `I've analyzed your code and found no syntax errors. The logic appears correct for checking palindrome numbers.

However, here are some potential improvements:

\`\`\`python
def is_palindrome(x: int) -> bool:
    # Handle edge cases
    if x < 0 or (x % 10 == 0 and x != 0):
        return False

    reversed_half = 0
    while x > reversed_half:
        reversed_half = reversed_half * 10 + x % 10
        x //= 10

    return x == reversed_half or x == reversed_half // 10
\`\`\`

This optimized version only reverses half the number, making it faster for large numbers.`
  }

  if (lowerMessage.includes('optimize')) {
    return `Here's an optimized version of the palindrome checker:

\`\`\`python
def is_palindrome_optimized(x: int) -> bool:
    # Quick rejections
    if x < 0:
        return False
    if x < 10:
        return True
    if x % 10 == 0:
        return False

    # Only reverse half the digits
    reversed_half = 0
    while x > reversed_half:
        reversed_half = reversed_half * 10 + x % 10
        x //= 10

    return x == reversed_half or x == reversed_half // 10
\`\`\`

**Optimizations made:**
- Early return for single digits
- Reject numbers ending in 0
- Only reverse half the number`
  }

  return `I understand you're asking about "${userMessage}".

Based on the current code context, I can help you with:
- Explaining the logic
- Finding and fixing bugs
- Optimizing performance
- Refactoring for better readability

What specific aspect would you like me to focus on?`
}

export default AIChatPanel
