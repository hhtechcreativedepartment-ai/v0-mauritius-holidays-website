import Link from 'next/link'
import { Star, ExternalLink } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { reviews, brand } from '@/lib/data'

export function ReviewsSection() {
  return (
    <section className="bg-secondary/50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header with Trustpilot */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl space-y-3">
            <Badge variant="outline" className="rounded-full px-4 py-1 bg-card">
              Customer Reviews
            </Badge>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Real reviews from travellers who booked their Mauritius holidays with us.
            </p>
          </div>

          {/* Trustpilot Score */}
          <Card className="rounded-2xl border-0 shadow-sm bg-card w-fit">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Excellent</p>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  TrustScore <span className="font-semibold text-foreground">{brand.trustpilotScore}</span> | {brand.trustpilotReviews} reviews
                </p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-emerald-600">95%</p>
                <p className="text-xs text-muted-foreground">Would Recommend</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {reviews.map((review) => (
            <Card key={review.id} className="rounded-2xl border-0 shadow-sm bg-card">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed text-sm">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="pt-2 border-t border-border">
                  <p className="font-semibold text-sm">{review.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Stayed at {review.hotel}
                  </p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Reviews */}
        <div className="text-center mt-10">
          <Button variant="outline" className="rounded-full gap-2" asChild>
            <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer">
              View All Reviews on Trustpilot
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
