'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <Card className="rounded-3xl border-0 bg-gradient-to-br from-accent/10 via-background to-secondary/50 shadow-lg overflow-hidden">
        <CardContent className="p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
              Get Exclusive Mauritius Offers
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Subscribe to our newsletter for the latest deals, travel inspiration 
              and exclusive discounts on luxury Mauritius holidays.
            </p>

            {submitted ? (
              <div className="bg-accent/10 text-accent rounded-2xl p-6">
                <p className="font-medium">Thank you for subscribing!</p>
                <p className="text-sm mt-1 text-accent/80">
                  We&apos;ll send you our best Mauritius offers and travel inspiration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full h-12 px-5 flex-1"
                  required
                />
                <Button type="submit" className="rounded-full h-12 px-6 gap-2">
                  Subscribe
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}

            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to receive marketing emails. Unsubscribe at any time.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
