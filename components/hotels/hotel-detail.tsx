'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, MapPin, Utensils, Check, ChevronLeft, ChevronRight, Calendar, Users, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { hotels, airports, brand } from '@/lib/data'

type Hotel = typeof hotels[number]

interface HotelDetailProps {
  hotel: Hotel
}

export function HotelDetail({ hotel }: HotelDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    email: '',
    phone: '',
    departureDate: '',
    airport: '',
    adults: '2',
    children: '0',
    comments: '',
  })

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % hotel.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + hotel.images.length) % hotel.images.length)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert('Quote request submitted! Our team will contact you within 24 hours.')
  }

  // Get related hotels
  const relatedHotels = hotels
    .filter((h) => h.id !== hotel.id && h.categories.some((c) => hotel.categories.includes(c)))
    .slice(0, 3)

  return (
    <div>
      {/* Image Gallery */}
      <div className="relative h-[50vh] md:h-[60vh] bg-secondary">
        <img
          src={hotel.images[currentImage]}
          alt={`${hotel.name} - Image ${currentImage + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        
        {/* Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center hover:bg-card transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Thumbnails */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {hotel.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentImage ? 'bg-card' : 'bg-card/50'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6">
          <Button variant="secondary" className="rounded-full gap-2" asChild>
            <Link href="/hotels">
              <ChevronLeft className="w-4 h-4" />
              Back to Hotels
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge className="rounded-full bg-accent text-accent-foreground">
                  {hotel.badge}
                </Badge>
                <div className="flex items-center gap-1">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
                {hotel.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {hotel.coast}, Mauritius
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  {hotel.board}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {hotel.nights} nights
                </div>
              </div>
            </div>

            {/* Price Card - Mobile */}
            <Card className="lg:hidden rounded-2xl border-0 shadow-md bg-accent/10">
              <CardContent className="p-5">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {hotel.period}
                    </p>
                    <p className="text-sm text-muted-foreground line-through">
                      &pound;{hotel.originalPrice.toLocaleString()}pp
                    </p>
                    <p className="text-3xl font-semibold">
                      &pound;{hotel.price.toLocaleString()}
                      <span className="text-base font-normal text-muted-foreground">pp</span>
                    </p>
                  </div>
                  <p className="text-accent font-semibold">
                    Save &pound;{((hotel.originalPrice - hotel.price) * 2).toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Hotel</h2>
              <p className="text-muted-foreground leading-relaxed">
                {hotel.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Hotel Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {hotel.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <Card className="rounded-2xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle>What&apos;s Included</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-3">
                {[
                  'Return flights from UK',
                  'Airport transfers',
                  `${hotel.nights} nights accommodation`,
                  `${hotel.board} meal plan`,
                  'ATOL protection',
                  '24/7 support',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Quote Form */}
          <div className="space-y-6">
            {/* Price Card - Desktop */}
            <Card className="hidden lg:block rounded-2xl border-0 shadow-md bg-accent/10">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {hotel.period}
                  </p>
                  <p className="text-sm text-muted-foreground line-through">
                    &pound;{hotel.originalPrice.toLocaleString()} per person
                  </p>
                  <p className="text-4xl font-semibold">
                    &pound;{hotel.price.toLocaleString()}
                    <span className="text-lg font-normal text-muted-foreground">pp</span>
                  </p>
                  <p className="text-accent font-semibold">
                    Save &pound;{((hotel.originalPrice - hotel.price) * 2).toLocaleString()} per couple
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quote Form */}
            <Card className="rounded-2xl border-0 shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill in your details and we&apos;ll send you a personalised quote within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                    <Input
                      placeholder="Surname"
                      value={formData.surname}
                      onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl"
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-xl"
                    required
                  />
                  <Input
                    type="date"
                    placeholder="Preferred departure date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                    className="rounded-xl"
                    required
                  />
                  <Select
                    value={formData.airport}
                    onValueChange={(value) => setFormData({ ...formData, airport: value })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select airport" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((airport) => (
                        <SelectItem key={airport} value={airport}>
                          {airport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Adults</label>
                      <Select
                        value={formData.adults}
                        onValueChange={(value) => setFormData({ ...formData, adults: value })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-muted-foreground">Children</label>
                      <Select
                        value={formData.children}
                        onValueChange={(value) => setFormData({ ...formData, children: value })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[0, 1, 2, 3, 4].map((n) => (
                            <SelectItem key={n} value={String(n)}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Textarea
                    placeholder="Any special requests or questions?"
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    className="rounded-xl min-h-[80px]"
                  />
                  <Button type="submit" className="w-full rounded-xl h-11">
                    Request Quote
                  </Button>
                </form>

                <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-border">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${brand.phone.replace(/\s/g, '')}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Prefer to call? {brand.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Hotels */}
        {relatedHotels.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedHotels.map((relatedHotel) => (
                <Link key={relatedHotel.id} href={`/hotels/${relatedHotel.slug}`}>
                  <Card className="rounded-2xl border-0 overflow-hidden shadow-md bg-card group h-full">
                    <div className="relative h-48">
                      <img
                        src={relatedHotel.image}
                        alt={relatedHotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="rounded-full bg-accent text-accent-foreground text-xs">
                          {relatedHotel.badge}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: relatedHotel.stars }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                        ))}
                      </div>
                      <h3 className="font-semibold">{relatedHotel.name}</h3>
                      <p className="text-sm text-muted-foreground">{relatedHotel.board}</p>
                      <p className="text-lg font-semibold mt-2">
                        From &pound;{relatedHotel.price.toLocaleString()}pp
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
