'use client'

import { useState } from 'react'
import { MessageCircle, X, Send, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { brand } from '@/lib/data'

type Message = {
  role: 'bot' | 'user'
  text: string
}

const quickReplies = ['Best hotels', 'Family holiday', 'Honeymoon ideas', 'Request a quote']

const botResponses: Record<string, string> = {
  family: 'For family trips, I recommend beach resorts with kids clubs, spacious rooms and all-inclusive options. Heritage Awali and Long Beach are excellent choices with fantastic facilities for children.',
  honeymoon: 'For honeymoons, consider adults-only or luxury beachfront resorts with spa, romantic dining and premium room categories. LUX* Belle Mare and One&Only Le Saint Geran offer unforgettable experiences.',
  hotel: 'Popular choices include Veranda Grand Baie for value, Long Beach for modern style, LUX* Belle Mare for luxury and Heritage Awali for all-inclusive family experiences. Would you like a quote for any of these?',
  best: 'Popular choices include Veranda Grand Baie for value, Long Beach for modern style, LUX* Belle Mare for luxury and Heritage Awali for all-inclusive family experiences. Would you like a quote for any of these?',
  quote: 'I can help with that! Please share your preferred departure month, UK airport, number of adults/children and board preference. Our team will prepare a personalised quote within 24 hours.',
  book: 'I can help with that! Please share your preferred departure month, UK airport, number of adults/children and board preference. Our team will prepare a personalised quote within 24 hours.',
  price: 'Our Mauritius holiday packages start from £1,299 per person including flights, transfers and 7 nights accommodation. Prices vary by hotel, season and board basis. Would you like a personalised quote?',
  wedding: 'Mauritius is a stunning wedding destination. We can arrange beach ceremonies, venue coordination and guest accommodation. Many resorts offer dedicated wedding planners. Shall I send you our wedding brochure?',
  golf: 'Mauritius has world-class golf courses including Heritage Golf Club, Constance Belle Mare and Anahita. We can arrange golf packages with tee times included. Which course interests you?',
  default: 'Thanks for your message. One of our Mauritius specialists can help you with a tailored package. Would you like to request a callback, or tell me more about what you are looking for?',
}

function getBotResponse(text: string): string {
  const normalized = text.toLowerCase()
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (key !== 'default' && normalized.includes(key)) {
      return response
    }
  }
  
  return botResponses.default
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      text: 'Hello! I\'m your Mauritius travel assistant. I can help with hotels, honeymoons, family holidays, quote requests and more. How can I help you today?',
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = (text: string) => {
    if (!text.trim()) return
    
    const userMessage: Message = { role: 'user', text: text.trim() }
    const botMessage: Message = { role: 'bot', text: getBotResponse(text) }
    
    setMessages((prev) => [...prev, userMessage, botMessage])
    setInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend(input)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <Card className="w-[360px] shadow-2xl border-0 rounded-3xl overflow-hidden bg-card">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-sm">Travel Assistant</p>
                <p className="text-xs text-primary-foreground/70">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 max-h-[380px] overflow-y-auto bg-secondary/30">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card text-foreground shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            
            {/* Quick Replies */}
            <div className="flex flex-wrap gap-2 pt-2">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs px-3 py-2 rounded-full border border-border bg-card hover:bg-secondary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about hotels, prices, dates..."
                className="rounded-xl flex-1"
              />
              <Button type="submit" size="icon" className="rounded-xl shrink-0">
                <Send className="w-4 h-4" />
              </Button>
            </form>
            <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-border">
              <Phone className="w-3 h-3 text-muted-foreground" />
              <a
                href={`tel:${brand.phone.replace(/\s/g, '')}`}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Prefer to call? {brand.phone}
              </a>
            </div>
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full h-14 w-14 shadow-xl"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
