import { Metadata } from 'next'
import Link from 'next/link'
import { Star, Clock, Percent, Gift, Tag, Flame, ArrowRight, Check, Calendar, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidgetLoader } from '@/components/chatbot-widget-loader'
import { hotels, brand } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Special Offers & Deals | Mauritius Holidays Direct',
  description: 'Exclusive Mauritius holiday offers and last-minute deals. Save up to 45% on luxury hotels with free nights, room upgrades, and all-inclusive packages.',
}

const featuredOffers = [
  {
    id: 'flash-sale',
    title: 'Flash Sale',
    subtitle: 'Up to 45% Off',
    description: 'Limited time savings on selected 5-star resorts. Book by end of month.',
    icon: Flame,
    color: 'bg-gradient-to-br from-orange-500 to-red-600',
    badge: 'Ends Soon',
  },
  {
    id: 'free-nights',
    title: 'Free Night Offers',
    description: 'Stay 7 nights, pay for 5. Available at our most popular resorts.',
    subtitle: 'Stay Longer',
    icon: Gift,
    color: 'bg-gradient-to-br from-sky-500 to-blue-600',
    badge: 'Popular',
  },
  {
    id: 'early-bird',
    title: 'Early Bird 2027',
    subtitle: 'Book Ahead & Save',
    description: 'Secure 2027 dates now with exclusive early booking discounts.',
    icon: Calendar,
    color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    badge: 'New',
  },
]

const offerHotels = hotels.filter(h => h.badge && h.originalPrice).slice(0, 8)

export default function OffersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary text-white">
          <div className="absolute inset-0">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/light-garden-luxury-pool-nature-wTUAAfk3f5r2F7I72QyWbPILQi7GaK.jpg"
              alt="Luxury pool villas in Mauritius"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-primary/40" />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 sm:py-20 md:py-28">
            <div className="max-w-3xl">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 rounded-full px-4 py-1.5">
                <Percent className="w-4 h-4 mr-2" />
                Exclusive Savings
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-5 sm:mb-6 leading-tight">
                Special Offers &{' '}
                <span className="text-cyan-300">Exclusive Deals</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
                Discover incredible savings on handpicked Mauritius holidays. From flash sales to free night offers, 
                find your perfect deal and save up to 45% on luxury escapes.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button size="lg" className="h-12 px-8 rounded-full bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="#deals">View All Deals</Link>
                </Button>
                <Button size="lg" className="h-12 px-8 rounded-full bg-white/20 text-white border-2 border-white/50 hover:bg-white/30 font-medium" asChild>
                  <Link href="/quote">Get a Quote</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Offer Cards */}
        <section className="py-12 md:py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid gap-5 md:grid-cols-3 md:gap-6">
              {featuredOffers.map((offer) => (
                <Card 
                  key={offer.id}
                  className="group relative overflow-hidden rounded-3xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 ${offer.color} opacity-95`} />
                  <CardContent className="relative p-8 text-white h-full flex flex-col">
                    <Badge className="self-start mb-4 bg-white/20 border-0 text-white rounded-full">
                      {offer.badge}
                    </Badge>
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6">
                      <offer.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">{offer.title}</h3>
                    <p className="text-lg font-medium text-white/90 mb-3">{offer.subtitle}</p>
                    <p className="text-white/80 mb-6 flex-grow">{offer.description}</p>
                    <Button 
                      variant="secondary" 
                      className="w-full rounded-xl bg-white/20 hover:bg-white/30 text-white border-0"
                      asChild
                    >
                      <Link href="#deals">
                        View Deals
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Deal Hotels Grid */}
        <section id="deals" className="py-12 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <Badge className="mb-4 rounded-full px-4">Hot Deals</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
                Today&apos;s Best Offers
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Handpicked deals from our most popular Mauritius resorts. All prices include flights and are ATOL protected.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
              {offerHotels.map((hotel) => {
                const savings = hotel.originalPrice - hotel.price
                const savingsPercent = Math.round((savings / hotel.originalPrice) * 100)
                
                return (
                  <Card 
                    key={hotel.id}
                    className="group overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <Badge className="bg-red-500 text-white border-0 rounded-full px-3">
                          <Tag className="w-3 h-3 mr-1" />
                          {hotel.badge}
                        </Badge>
                      </div>
                      
                      {/* Star Rating */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1">
                        {[...Array(hotel.stars)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-accent transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">{hotel.coast}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{hotel.nights} nights</span>
                        <span className="text-muted-foreground/50">|</span>
                        <span>{hotel.board}</span>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold">&pound;{hotel.price.toLocaleString()}</span>
                            <span className="text-sm text-muted-foreground line-through">&pound;{hotel.originalPrice.toLocaleString()}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">per person</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-0 rounded-full">
                          Save {savingsPercent}%
                        </Badge>
                      </div>

                      <Button className="w-full mt-4 rounded-xl" asChild>
                        <Link href={`/hotels/${hotel.slug}`}>
                          View Deal
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8" asChild>
                <Link href="/hotels">
                  View All Hotels
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Book Section */}
        <section className="py-12 md:py-20 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12 items-center">
              <div>
                <Badge className="mb-4 rounded-full px-4">Why Book With Us</Badge>
                <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6">
                  The Best Deals,{' '}
                  <span className="text-accent">Guaranteed</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  As direct Mauritius specialists, we negotiate exclusive rates you won&apos;t find elsewhere. 
                  Every booking is fully ATOL protected with no hidden fees.
                </p>

                <div className="space-y-4">
                  {[
                    'Best Price Guarantee - we match any like-for-like quote',
                    'No booking fees or hidden charges',
                    'Exclusive room upgrades and resort credits',
                    'Flexible payment plans available',
                    'ATOL, IATA & ABTA fully protected',
                    'Dedicated Mauritius travel experts',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Button size="lg" className="rounded-full h-12 px-8" asChild>
                    <Link href="/quote">Get Your Free Quote</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full h-12 px-8" asChild>
                    <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>
                      Call {brand.phone}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="relative">
                <Card className="rounded-3xl overflow-hidden border-0 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                    alt="Luxury Mauritius resort"
                    className="w-full h-80 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-lg">Featured Package</p>
                        <p className="text-muted-foreground">7 nights, Half Board</p>
                      </div>
                      <Badge className="bg-accent text-white border-0 rounded-full px-4 py-1.5">
                        Save &pound;770
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Plane className="w-4 h-4" />
                        <span>Flights included</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span>5-star resort</span>
                      </div>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">From</p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold">&pound;1,499</span>
                          <span className="text-muted-foreground line-through">&pound;2,269</span>
                        </div>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>
                      <Button className="rounded-xl" asChild>
                        <Link href="/hotels/long-beach">View Deal</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our Mauritius experts can create a bespoke package tailored to your exact requirements. 
              Get in touch for a personalised quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 rounded-full bg-white text-primary hover:bg-white/90" asChild>
                <Link href="/quote">Request a Quote</Link>
              </Button>
              <Button size="lg" className="h-12 px-8 rounded-full bg-white/20 text-white border-2 border-white/50 hover:bg-white/30 font-medium" asChild>
                <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>
                  Call {brand.phone}
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidgetLoader />
    </div>
  )
}
