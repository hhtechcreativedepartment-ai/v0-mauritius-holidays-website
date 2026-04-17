'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { hotels } from '@/lib/data'

const boardFilters = [
  { key: 'all', label: 'All' },
  { key: 'bed', label: 'Bed & Breakfast' },
  { key: 'half', label: 'Half Board' },
  { key: 'all-inclusive', label: 'All Inclusive' },
]

export function FeaturedHotelsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  
  const featuredHotels = hotels.slice(0, 6)
  
  const filteredHotels = activeFilter === 'all' 
    ? featuredHotels 
    : featuredHotels.filter((h) => h.board.toLowerCase().includes(activeFilter))

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
        <div className="max-w-2xl space-y-3">
          <Badge variant="outline" className="rounded-full px-4 py-1">
            Hotels & Reservations
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Featured Holiday Offers
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Hand-picked luxury hotels with exclusive savings. All prices include flights, 
            transfers and your accommodation.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {boardFilters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? 'default' : 'outline'}
              className="rounded-full"
              size="sm"
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Hotel Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <Card key={hotel.id} className="rounded-2xl border-0 overflow-hidden shadow-md bg-card group">
            <div className="relative h-56">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge className="rounded-full bg-accent text-accent-foreground">
                  {hotel.badge}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-card/90 backdrop-blur px-2 py-1 rounded-full">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>
            <CardContent className="p-5 space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                <p className="text-sm text-muted-foreground">{hotel.board} &middot; {hotel.nights} nights</p>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {hotel.description}
              </p>
              <div className="flex items-end justify-between pt-2">
                <div>
                  <p className="text-xs text-muted-foreground line-through">
                    &pound;{hotel.originalPrice.toLocaleString()}pp
                  </p>
                  <p className="text-2xl font-semibold">
                    &pound;{hotel.price.toLocaleString()}<span className="text-sm font-normal text-muted-foreground">pp</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-full" asChild>
                    <Link href={`/hotels/${hotel.slug}`}>View</Link>
                  </Button>
                  <Button size="sm" className="rounded-full" asChild>
                    <Link href={`/contact?hotel=${hotel.slug}`}>Quote</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All */}
      <div className="text-center mt-10">
        <Button size="lg" variant="outline" className="rounded-full" asChild>
          <Link href="/hotels">View All Hotels</Link>
        </Button>
      </div>
    </section>
  )
}
