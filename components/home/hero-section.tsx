'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, Shield, Plane, Users, Star, ChevronDown, Play, ArrowRight, Sparkles, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { airports, categories, brand } from '@/lib/data'

const heroImages = [
  // Le Morne Mountain beach - iconic Mauritius
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1796325354619cc8226f7866.48916407-b2Zopl9ymzYUwEPOXaqt6qbgotP0o5.jpg',
  // Infinity pool with ocean view
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/miami-bayside-landscape-nUiRnuBSzHAqmonmAPglac2i3FVqak.jpg',
  // Sunset pool with palm reflections
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beautiful-luxury-outdoor-swimming-pool-hotel-resort-GL2S39UkbjMGQbc1eaCVMXQTMgU3Qw.jpg',
  // Modern infinity pool with palms
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pool-with-palm-trees-sides-byKwAZ6PNPQp70rjuuPcZEybGHgRdn.jpg',
  // Dramatic silhouette sunset
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/silhouette-palm-tree-with-umbrella-u1M7JhC4sFDavsv5Rki2kcoqYKh3xP.jpg',
]

export function HeroSection() {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [departureMonth, setDepartureMonth] = useState('')
  const [guests, setGuests] = useState('')
  const [holidayType, setHolidayType] = useState('')
  const [airport, setAirport] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (departureMonth) params.set('month', departureMonth)
    if (guests) params.set('guests', guests)
    if (holidayType) params.set('type', holidayType)
    if (airport) params.set('airport', airport)
    
    const queryString = params.toString()
    router.push(`/hotels${queryString ? `?${queryString}` : ''}`)
  }

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Cinematic Background with Ken Burns Effect */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img}
              alt="Mauritius paradise"
              className="w-full h-full object-cover scale-110 animate-[kenburns_20s_ease-in-out_infinite]"
            />
          </div>
        ))}
        {/* Multi-layer Gradient Overlay - Lighter for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/15 to-primary/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-transparent to-primary/15" />
        {/* Animated Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-700" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Top Trust Bar */}
        <div className="pt-6 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-medium">{brand.trustpilotScore}/10</span>
              <span className="text-white/70">({brand.trustpilotReviews} reviews)</span>
            </div>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/80">ATOL Protected</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/80">Award-Winning Specialists</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="pt-16 md:pt-24 lg:pt-32 pb-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Animated Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white mb-8 animate-fade-in">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-medium">Welcome to Paradise</span>
              <span className="w-px h-4 bg-white/30" />
              <span className="text-sm text-white/80">Since 2008</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-semibold text-white leading-[1.1] tracking-tight mb-6 text-balance">
              Discover the Magic of{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-sky-300 via-blue-200 to-sky-300 bg-clip-text text-transparent">
                  Mauritius
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full opacity-60" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
              Award-winning specialists crafting bespoke luxury holidays to the Indian Ocean&apos;s most enchanting island. 
              Your dream escape, fully protected and personally tailored.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button 
                size="lg" 
                className="h-14 px-10 rounded-full text-base font-medium bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/20 group"
                asChild
              >
                <Link href="/quote">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="h-14 px-10 rounded-full text-base font-medium bg-primary text-white border-2 border-white/40 hover:bg-primary/90 shadow-xl"
                asChild
              >
                <Link href="/hotels">
                  <Play className="w-5 h-5 mr-2" />
                  Explore Hotels
                </Link>
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto mb-16">
              {[
                { value: '15+', label: 'Years Experience' },
                { value: '1,000+', label: 'Happy Couples' },
                { value: '40+', label: 'Partner Hotels' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Card - Glass Effect */}
        <div className="relative z-20 max-w-5xl mx-auto pb-32">
          {/* Outer glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-sky-500/20 rounded-[2rem] blur-xl opacity-70" />
          
          <div className="relative rounded-[1.75rem] overflow-hidden border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]">
            {/* Glass background layers */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-sky-50/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-sky-500/5 to-transparent" />
            
            {/* Card Content */}
            <div className="relative p-6 md:p-8 lg:p-10">
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-primary">Find Your Perfect Holiday</h2>
                  <p className="text-sm text-primary/60 mt-1.5 font-medium">Search 40+ handpicked Mauritius hotels</p>
                </div>
                <Badge className="w-fit bg-gradient-to-r from-accent to-sky-500 text-white border-0 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg shadow-accent/25">
                  Best Price Guaranteed
                </Badge>
              </div>
              
              {/* Search Fields - Equal Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-primary/70 uppercase tracking-wider">Departure Month</label>
                  <Select value={departureMonth} onValueChange={setDepartureMonth}>
                    <SelectTrigger className="rounded-xl h-13 border-2 border-primary/10 bg-white/60 hover:bg-white hover:border-accent/30 transition-all shadow-sm text-primary font-medium">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {['May 2026', 'June 2026', 'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'].map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-primary/70 uppercase tracking-wider">Travellers</label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="rounded-xl h-13 border-2 border-primary/10 bg-white/60 hover:bg-white hover:border-accent/30 transition-all shadow-sm text-primary font-medium">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-adults">2 Adults</SelectItem>
                      <SelectItem value="2-adults-1-child">2 Adults, 1 Child</SelectItem>
                      <SelectItem value="2-adults-2-children">2 Adults, 2 Children</SelectItem>
                      <SelectItem value="1-adult">1 Adult</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-primary/70 uppercase tracking-wider">Holiday Type</label>
                  <Select value={holidayType} onValueChange={setHolidayType}>
                    <SelectTrigger className="rounded-xl h-13 border-2 border-primary/10 bg-white/60 hover:bg-white hover:border-accent/30 transition-all shadow-sm text-primary font-medium">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-primary/70 uppercase tracking-wider">UK Airport</label>
                  <Select value={airport} onValueChange={setAirport}>
                    <SelectTrigger className="rounded-xl h-13 border-2 border-primary/10 bg-white/60 hover:bg-white hover:border-accent/30 transition-all shadow-sm text-primary font-medium">
                      <SelectValue placeholder="Select airport" />
                    </SelectTrigger>
                    <SelectContent>
                      {airports.map((ap) => (
                        <SelectItem key={ap} value={ap}>{ap}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Action Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-8 pt-7 border-t border-primary/10">
                <Button 
                  onClick={handleSearch}
                  size="lg"
                  className="w-full sm:w-auto h-14 px-10 rounded-xl gap-3 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/95 hover:to-primary shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transition-all"
                >
                  <Search className="w-5 h-5" />
                  Search Holidays
                </Button>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-primary/50 font-medium">or call us:</span>
                  <a 
                    href={`tel:${brand.phone.replace(/\s/g, '')}`} 
                    className="flex items-center gap-2.5 font-bold text-primary hover:text-accent transition-colors text-lg"
                  >
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-accent" />
                    </div>
                    {brand.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 animate-bounce">
          <span className="text-xs uppercase tracking-widest">Explore</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Trust Badges - Floating at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/60 to-transparent pt-20 pb-6 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, title: 'ATOL Protected', subtitle: 'Fully bonded & secure' },
              { icon: Star, title: 'Award Winning', subtitle: 'Trusted since 2008' },
              { icon: Users, title: 'Personal Service', subtitle: 'Dedicated experts' },
              { icon: Plane, title: 'In-Resort Support', subtitle: 'Holiday reps & transfers' },
            ].map((item) => (
              <div 
                key={item.title} 
                className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-white text-sm truncate">{item.title}</p>
                  <p className="text-xs text-white/60 truncate">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for Ken Burns animation */}
      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1.1) translate(0, 0); }
          50% { transform: scale(1.15) translate(-1%, -1%); }
          100% { transform: scale(1.1) translate(0, 0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </section>
  )
}
