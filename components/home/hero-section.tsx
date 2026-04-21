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
  '/images/hero/Mauritius%20vibe.jpg',
  '/images/hero/Mauritius%20hotel%20outside.jpg',
  '/images/hero/Mauritius%20hotel%20view.jpg',
  '/images/hero/Mauritius%20mooj.jpg',
  '/images/hero/Mauritius%20peace.jpg',
  '/images/hero/Mauritius%20moment.jpg',
  '/images/hero/giant-pool-with-hammocks.jpg',
  '/images/hero/beautiful-tropical-beach-sea-with-umbrella-chair-around-swimming-pool.jpg',
  '/images/hero/beautiful-outdoor-view-with-umbrella-chair-around-swimming-pool-luxury-hotel.jpg',
  '/images/hero/miami-bayside-landscape.jpg',
  '/images/hero/silhouette-palm-tree-with-umbrella.jpg',
  '/images/hero/hammocks-arranged-rows-pool.jpg',
  '/images/hero/leisure-beautiful-health-garden-landscape.jpg',
  '/images/hero/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg',
  '/images/hero/pool-with-palm-trees-sides.jpg',
  '/images/hero/light-garden-luxury-pool-nature.jpg',
]

export function HeroSection() {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [previousImage, setPreviousImage] = useState<number | null>(null)
  const [isHeroImageVisible, setIsHeroImageVisible] = useState(true)
  const [departureMonth, setDepartureMonth] = useState('')
  const [guests, setGuests] = useState('')
  const [holidayType, setHolidayType] = useState('')
  const [airport, setAirport] = useState('')

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPreviousImage(currentImage)
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
      setIsHeroImageVisible(false)
    }, 6000)
    return () => window.clearTimeout(timeout)
  }, [currentImage])

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsHeroImageVisible(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [currentImage])

  useEffect(() => {
    if (previousImage === null) return

    const timeout = window.setTimeout(() => {
      setPreviousImage(null)
    }, 3400)

    return () => window.clearTimeout(timeout)
  }, [previousImage])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (departureMonth) params.set('month', departureMonth)
    if (guests) params.set('guests', guests)
    if (holidayType) params.set('type', holidayType)
    if (airport) params.set('airport', airport)
    
    const queryString = params.toString()
    router.push(`/hotels${queryString ? `?${queryString}` : ''}`)
  }

  const nextImageIndex = (currentImage + 1) % heroImages.length

  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0">
        {previousImage !== null && (
          <div className="absolute inset-0 animate-[hero-fade-out_3.4s_ease-[cubic-bezier(0.4,0,0.2,1)]_forwards]">
            <img
              src={heroImages[previousImage]}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover scale-[1.06]"
            />
          </div>
        )}
        <div
          className={`absolute inset-0 transition-opacity will-change-[opacity] ${
            isHeroImageVisible ? 'opacity-100 duration-[3400ms] ease-[cubic-bezier(0.22,1,0.36,1)]' : 'opacity-0 duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)]'
          }`}
        >
          <img
            key={heroImages[currentImage]}
            src={heroImages[currentImage]}
            alt="Mauritius paradise"
            loading={currentImage === 0 ? 'eager' : 'lazy'}
            fetchPriority={currentImage === 0 ? 'high' : 'auto'}
            decoding="async"
            className="h-full w-full object-cover will-change-transform animate-[hero-breathe_6s_ease-in-out_forwards]"
          />
        </div>
        <img
          src={heroImages[nextImageIndex]}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="hidden"
        />
        {/* Multi-layer Gradient Overlay - Black effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />
        {/* Animated Particles Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-700" />
        </div>
      </div>

        {/* Main Content */}
        <div className="relative z-10 mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col px-4 md:px-6">
        {/* Top Trust Bar */}
        <div className="pt-5 pb-4 md:pt-6 md:pb-5">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center text-sm text-white/90">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-medium">{brand.trustpilotScore}/5</span>
              <span className="text-white/70">({brand.trustpilotReviews} reviews)</span>
            </div>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/80">ATOL Protected</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="text-white/80">Award-Winning Specialists</span>
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-1 items-center pt-5 md:pt-8 lg:pt-10">
          <div className="mx-auto w-full max-w-6xl text-center">
            {/* Animated Welcome Badge */}
            <div className="mb-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-white backdrop-blur-md animate-fade-in md:mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm font-medium">Welcome to Paradise</span>
              <span className="w-px h-4 bg-white/30" />
              <span className="text-sm text-white/80">Since 2008</span>
            </div>

            {/* Main Headline */}
            <h1 className="mx-auto mb-5 max-w-5xl text-4xl font-serif font-semibold leading-[1.04] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
              Discover the Magic of{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-sky-200 via-cyan-100 to-blue-300 bg-clip-text text-transparent">
                  Mauritius
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-sky-300 via-cyan-200 to-blue-400 opacity-70" />
              </span>
            </h1>

            {/* Subheadline */}
            <p className="mx-auto mb-6 max-w-3xl text-lg font-light leading-relaxed text-white/90 sm:text-xl md:mb-8 md:text-2xl">
              Award-winning specialists crafting bespoke luxury holidays to the Indian Ocean&apos;s most enchanting island. 
              Your dream escape, fully protected and personally tailored.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center md:mb-9">
              <Button 
                size="lg" 
                className="h-14 w-full sm:w-auto px-8 md:px-10 rounded-full text-base font-medium bg-white text-primary hover:bg-white/90 shadow-2xl shadow-white/20 group"
                asChild
              >
                <Link href="/quote">
                  Get Your Free Quote
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="h-14 w-full sm:w-auto px-8 md:px-10 rounded-full text-base font-medium bg-primary text-white border-2 border-white/40 hover:bg-primary/90 shadow-xl"
                asChild
              >
                <Link href="/hotels">
                  <Play className="w-5 h-5 mr-2" />
                  Explore Hotels
                </Link>
              </Button>
            </div>

          </div>
        </div>

        {/* Search Card - Glass Effect */}
        <div className="relative z-20 mx-auto w-full max-w-6xl pb-8 md:pb-10">
          {/* Outer glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 via-gray-600/20 to-gray-500/20 rounded-[2rem] blur-xl opacity-70" />
          
          <div className="relative overflow-hidden rounded-[2rem] border border-white/25 shadow-[0_18px_50px_rgba(0,0,0,0.16),0_6px_20px_rgba(0,0,0,0.08)]">
            {/* Glass background layers */}
            <div className="absolute inset-0 bg-white/82 backdrop-blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/78 to-slate-100/55" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-600/5 to-transparent" />
            
            {/* Card Content */}
            <div className="relative p-5 md:p-6 lg:p-7">
              {/* Header Row */}
              <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl font-bold tracking-tight text-slate-800 md:text-[2rem]">Find Your Perfect Holiday</h2>
                  <p className="mt-1.5 text-base text-slate-600">Search 40+ handpicked Mauritius hotels</p>
                </div>
                <div className="flex flex-col items-center gap-3 lg:items-end">
                  <div className="flex w-full flex-col gap-2 text-center sm:w-auto sm:flex-row sm:items-center sm:justify-end sm:text-left sm:gap-3">
                    <span className="text-sm font-medium text-slate-500">or call us:</span>
                    <a 
                      href={`tel:${brand.phone.replace(/\s/g, '')}`} 
                      className="flex items-center justify-center gap-3 text-xl font-bold text-slate-800 transition-colors hover:text-accent sm:justify-start"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                        <Phone className="w-4 h-4 text-accent" />
                      </div>
                      {brand.phone}
                    </a>
                  </div>
                  <Badge className="mx-auto w-fit rounded-full border-0 bg-gradient-to-r from-accent to-slate-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 sm:mx-0">
                    Best Price Guaranteed
                  </Badge>
                </div>
              </div>
              
              <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Departure Month</label>
                  <Select value={departureMonth} onValueChange={setDepartureMonth}>
                    <SelectTrigger className="h-[52px] rounded-2xl border-2 border-slate-200 bg-white/70 px-4 shadow-sm text-slate-800 font-medium transition-all hover:bg-white hover:border-accent/30">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {['May 2026', 'June 2026', 'July 2026', 'August 2026', 'September 2026', 'October 2026', 'November 2026', 'December 2026'].map((month) => (
                        <SelectItem key={month} value={month}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Travellers</label>
                  <Select value={guests} onValueChange={setGuests}>
                    <SelectTrigger className="h-[52px] rounded-2xl border-2 border-slate-200 bg-white/70 px-4 shadow-sm text-slate-800 font-medium transition-all hover:bg-white hover:border-accent/30">
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
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Holiday Type</label>
                  <Select value={holidayType} onValueChange={setHolidayType}>
                    <SelectTrigger className="h-[52px] rounded-2xl border-2 border-slate-200 bg-white/70 px-4 shadow-sm text-slate-800 font-medium transition-all hover:bg-white hover:border-accent/30">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">UK Airport</label>
                  <Select value={airport} onValueChange={setAirport}>
                    <SelectTrigger className="h-[52px] rounded-2xl border-2 border-slate-200 bg-white/70 px-4 shadow-sm text-slate-800 font-medium transition-all hover:bg-white hover:border-accent/30">
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

                <div className="flex justify-center lg:justify-end">
                  <Button 
                    onClick={handleSearch}
                    size="lg"
                    className="h-[52px] w-full rounded-2xl gap-3 px-7 text-base font-semibold bg-gradient-to-r from-slate-800 to-slate-700 shadow-xl shadow-slate-800/20 transition-all hover:from-slate-900 hover:to-slate-800 hover:shadow-2xl hover:shadow-slate-800/30 sm:w-auto"
                  >
                    <Search className="w-5 h-5" />
                    Search Holidays
                  </Button>
                </div>
              </div>
              
              <div className="mt-5 grid grid-cols-1 gap-3 border-t border-slate-200/90 pt-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  { icon: Shield, title: 'ATOL Protected', subtitle: 'Fully bonded & secure' },
                  { icon: Star, title: 'Award Winning', subtitle: 'Trusted since 2008' },
                  { icon: Users, title: 'Personal Service', subtitle: 'Dedicated experts' },
                  { icon: Plane, title: 'In-Resort Support', subtitle: 'Holiday reps & transfers' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/55 px-4 py-3 text-left shadow-sm"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{item.title}</p>
                      <p className="truncate text-sm text-slate-500">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Footer */}
        <div className="mt-6 pb-4 md:mt-8 md:pb-6">
          <div className="mx-auto hidden w-full max-w-6xl justify-center xl:flex">
            <div className="flex flex-col items-center gap-2 px-5 py-2.5 text-white/65 animate-bounce">
              <span className="text-xs uppercase tracking-[0.24em]">Explore</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

        {/* Custom CSS */}
        <style jsx>{`
          @keyframes hero-breathe {
            0% { transform: scale(1.02); }
            100% { transform: scale(1.08); }
          }
          @keyframes hero-fade-out {
            0% { opacity: 0.95; }
            100% { opacity: 0; }
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

      <section className="bg-background py-6 md:py-8">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { value: '15+', label: 'Years Experience' },
              { value: '1,000+', label: 'Happy Couples' },
              { value: '40+', label: 'Partner Hotels' },
              { value: '24/7', label: 'Support' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-800 px-5 py-6 text-center shadow-[0_14px_40px_rgba(15,23,42,0.12)]"
              >
                <div className="text-4xl font-bold tracking-tight text-white">{stat.value}</div>
                <div className="mt-2 text-base font-medium text-white/75">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
