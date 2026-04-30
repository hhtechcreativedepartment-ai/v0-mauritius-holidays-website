'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Star,
  MapPin,
  Utensils,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  Waves,
  Sparkles,
  Martini,
  Dumbbell,
  Users,
  BedDouble,
  Clock3,
  Shield,
  ShipWheel,
  HeartHandshake,
  Sun,
  ArrowRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { hotels, airports, brand } from '@/lib/data'

type Hotel = typeof hotels[number]
type LucideIcon = typeof Star

interface HotelDetailProps {
  hotel: Hotel
}

type FactCard = {
  label: string
  value: string
  icon: LucideIcon
}

type RoomCategory = {
  name: string
  description: string
  view: string
  feature: string
  occupancy: string
  note: string
}

type BoardOption = {
  id: string
  label: string
  intro: string
  meals: string[]
  beverages: string[]
  notes: string[]
}

type GalleryCategory = {
  id: string
  label: string
  images: {
    src: string
    caption: string
    imageClassName?: string
  }[]
}

const categoryLabels: Record<string, string> = {
  'all-inclusive': 'Premium All Inclusive',
  honeymoon: 'Honeymoon',
  family: 'Family Friendly',
  wedding: 'Destination Weddings',
  golf: 'Golf Escapes',
  'twin-centre': 'Twin Centre',
}

const highlightIconMap: Record<string, LucideIcon> = {
  Beachfront: Waves,
  'Spa & Wellness': Sparkles,
  'Infinity Pool': Sun,
  'Premium All Inclusive': Martini,
  'Water Sports': ShipWheel,
  'Family Friendly': Users,
  Couples: HeartHandshake,
  Honeymoon: HeartHandshake,
  'Golf Escapes': Dumbbell,
}

const sharedGalleryImages = {
  arrival: '/images/hotel-details/hotel-arrival-checkin.jpg',
  room: '/images/hotel-details/hotel-room-inspiration.jpg',
  view: '/images/hero/Mauritius%20moment.jpg',
  pool: '/images/hero/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg',
  resort: '/images/hero/pool-with-palm-trees-sides.jpg',
  wellness: '/images/hero/light-garden-luxury-pool-nature.jpg',
}

const roomFeatures = [
  'Air-conditioning',
  'Ceiling fan',
  'Marble bathroom',
  'Bathtub and walk-in shower',
  'Desk',
  'Tea & coffee facilities',
  'Nespresso machine',
  'Mini bar',
  'Hairdryer',
  'Daily water replenishment',
  'Wi-Fi',
  'TV',
]

function formatCurrency(value: number) {
  return `£${value.toLocaleString()}`
}

function roundToNearestTen(value: number) {
  return Math.round(value / 10) * 10
}

function createPriceBand(basePrice: number, nights: number, modifier: number) {
  return formatCurrency(roundToNearestTen((basePrice / 7) * nights * modifier))
}

function getBestForTags(hotel: Hotel) {
  const mappedTags = hotel.categories.map((category) => categoryLabels[category]).filter(Boolean)

  if (!mappedTags.includes('Honeymoon') && !mappedTags.includes('Family Friendly')) {
    mappedTags.push('Couples')
  }

  return Array.from(new Set(mappedTags)).slice(0, 4)
}

function getHotelVibe(hotel: Hotel, bestForTags: string[]) {
  const stylePrefix = hotel.stars >= 5 ? 'Refined island luxury' : 'Easy-going tropical comfort'
  const guestFocus = bestForTags[0] ? `crafted for ${bestForTags[0].toLowerCase()}` : 'shaped for relaxed Mauritius escapes'
  return `${stylePrefix} on the ${hotel.coast.toLowerCase()}, ${guestFocus}.`
}

function getHighlightStrip(hotel: Hotel, bestForTags: string[]) {
  const items = [
    'Beachfront',
    'Spa & Wellness',
    'Infinity Pool',
    hotel.board === 'All Inclusive' ? 'Premium All Inclusive' : 'Flexible Dining',
    'Water Sports',
    bestForTags[0] || 'Couples',
  ]

  return Array.from(new Set(items)).slice(0, 6)
}

function getFactCards(hotel: Hotel, bestForTags: string[]): FactCard[] {
  return [
    { label: 'Check-in / Check-out', value: '14:00 / 12:00', icon: Clock3 },
    { label: 'Board Basis', value: hotel.board, icon: Utensils },
    { label: 'Stay Length', value: `${hotel.nights} nights`, icon: Calendar },
    { label: 'Best For', value: bestForTags.join(', '), icon: Users },
    { label: 'Location', value: hotel.coast, icon: MapPin },
    { label: 'Room Types', value: 'Suites, premium rooms & upgraded categories', icon: BedDouble },
    { label: 'Beach Access', value: 'Direct resort beach access', icon: Waves },
    { label: 'Wellness Focus', value: 'Spa rituals, movement and slow island living', icon: Sparkles },
    { label: 'Family Suitability', value: bestForTags.includes('Family Friendly') ? 'Excellent for family stays' : 'Best suited to couples and premium leisure', icon: HeartHandshake },
  ]
}

function getOverviewParagraphs(hotel: Hotel, bestForTags: string[]) {
  const guestFocus = bestForTags.join(', ').toLowerCase()

  return [
    `${hotel.name} brings together the warm rhythm of Mauritius with a polished resort setting on the ${hotel.coast.toLowerCase()}. From the first arrival moments to the easy flow between beach, pool and dining spaces, the experience is designed to feel elegant, relaxed and immediately escapist.`,
    `Expect a stay shaped around ${guestFocus}, with ${hotel.highlights.slice(0, 2).join(' and ').toLowerCase()} helping define the atmosphere. It is the kind of hotel that works beautifully for guests who want strong service, a scenic setting and a more premium island pace.`,
  ]
}

function getAccommodationIntro(hotel: Hotel) {
  return `${hotel.name} offers a collection of bright rooms, suites and upgraded stay categories designed for guests who want a calm, resort-led base in Mauritius. Interiors lean into comfort, natural light and a relaxed island mood, with view upgrades and premium categories adding more privacy, outdoor space and standout features.`
}

function getRoomCategories(hotel: Hotel): RoomCategory[] {
  const oceanNote = hotel.coast.includes('East') || hotel.coast.includes('North') ? 'Ideal for guests who want a stronger sea-facing feel.' : 'Well suited to guests wanting a calm resort outlook.'

  return [
    {
      name: `${hotel.name} Garden Suite`,
      description: 'A welcoming entry category with a bright bedroom, soft finishes and an easy indoor-outdoor resort feel.',
      view: 'Garden or tropical grounds',
      feature: 'Comfortable open-plan layout',
      occupancy: 'Up to 2 adults',
      note: 'Great as a lead-in category for value-conscious luxury travellers.',
    },
    {
      name: `${hotel.name} Partial Sea View Suite`,
      description: 'Adds a more elevated sense of place with a partial ocean outlook and a more premium holiday atmosphere.',
      view: 'Partial sea view',
      feature: 'Enhanced terrace or balcony setting',
      occupancy: 'Up to 2 adults and 1 child',
      note: oceanNote,
    },
    {
      name: `${hotel.name} Beachfront Suite`,
      description: 'Closer to the shoreline and resort action, with a stronger connection to beach mornings and sunset evenings.',
      view: 'Beachfront or oceanfront',
      feature: 'Prime position near the beach',
      occupancy: 'Up to 3 adults or 2 adults and 2 children',
      note: 'Ideal for guests prioritising location and atmosphere.',
    },
    {
      name: `${hotel.name} Signature Pool Suite`,
      description: 'A more indulgent category designed for privacy, extra space and a stronger sense of premium resort living.',
      view: 'Pool, sea or premium resort outlook',
      feature: 'Private pool, jet pool or enhanced suite benefits',
      occupancy: 'Up to 2 adults',
      note: 'Best for honeymoon, couples and milestone stays.',
    },
  ]
}

function getDiningSummary(hotel: Hotel) {
  const restaurantCount = Math.max(4, hotel.stars + 1)
  const barCount = Math.max(2, hotel.stars - 1)

  return {
    intro: `${hotel.name} offers a layered dining experience built around all-day resort ease, stylish evening settings and the flexibility guests expect from a premium Mauritius stay.`,
    details: [
      `${restaurantCount} restaurants and ${barCount} bars across the resort`,
      'A mix of international cuisine, island influences and contemporary classics',
      'Relaxed poolside lunches, destination dinners and atmospheric evening drinks',
      'Dine-around style flexibility or upgraded meal plans depending on your chosen board basis',
    ],
  }
}

function getBoardOptions(hotel: Hotel): BoardOption[] {
  return [
    {
      id: 'bed-breakfast',
      label: 'Bed & Breakfast',
      intro: `A simple and flexible option for guests who want to begin each day at ${hotel.name} with breakfast included, while keeping lunch and dinner plans open.`,
      meals: [
        'Daily breakfast in the main restaurant',
        'Fresh fruit, bakery, hot dishes and island-inspired selections',
        'Easy morning dining before beach, spa or excursion plans',
      ],
      beverages: [
        'Tea, coffee and breakfast juices',
        'Additional drinks charged outside breakfast service',
      ],
      notes: [
        'Lunch and dinner not included',
        'Best for guests planning to explore or dine more freely',
      ],
    },
    {
      id: 'half-board',
      label: 'Half Board',
      intro: 'A balanced resort dining option combining daily breakfast with dinner, ideal for guests who want structure in the evening without a full all-inclusive commitment.',
      meals: [
        'Daily breakfast',
        'Dinner in selected restaurants or buffet venues',
        'Dine-around arrangements may apply on selected evenings',
      ],
      beverages: [
        'Breakfast drinks included',
        'Dinner beverages generally payable unless part of a promotion',
      ],
      notes: [
        'Lunch remains flexible and payable separately',
        'Some speciality restaurants may carry supplements',
      ],
    },
    {
      id: 'premium-all-inclusive',
      label: 'Premium All Inclusive',
      intro: `The most complete way to enjoy ${hotel.name}, designed for guests wanting a seamless luxury stay with meals, drinks and resort rhythm wrapped into one premium package.`,
      meals: [
        'Breakfast, lunch and dinner daily',
        'Afternoon tea or light bites during the day',
        'Dine-around access across selected restaurants',
        'Selected signature dining experiences subject to hotel policy',
      ],
      beverages: [
        'Local and selected international drinks',
        'Cocktails, wines, beers and soft drinks',
        'House champagne in selected venues or time windows',
        'Mini bar access or replenishment policy depending on the room booked',
      ],
      notes: [
        'Service timings and venue participation are set by the hotel',
        'Premium labels, speciality menus and some experiences may incur supplements',
        'Availability remains subject to hotel policy and seasonal operation',
      ],
    },
  ].map((option) =>
    option.label === 'Premium All Inclusive' && hotel.board !== 'All Inclusive'
      ? {
          ...option,
          intro: `${option.intro} It can also work as an upgrade path for guests currently considering ${hotel.board.toLowerCase()} at ${hotel.name}.`,
        }
      : option,
  )
}

function getFacilityGroups(hotel: Hotel) {
  return [
    {
      title: 'Leisure',
      icon: Waves,
      items: ['Infinity pool', 'Main lagoona-style pool', 'Direct beach access', 'Library and social spaces'],
    },
    {
      title: 'Wellness',
      icon: Sparkles,
      items: ['Award-winning spa', 'Hammam-inspired rituals', 'Movement and recovery experiences', 'Fitness centre'],
    },
    {
      title: 'Dining & Lifestyle',
      icon: Martini,
      items: ['Destination restaurants', 'Stylish resort bars', 'Wine cellar moments', 'Evening lounge or shisha ambience'],
    },
    {
      title: 'Family',
      icon: Users,
      items: hotel.categories.includes('family')
        ? ['Kids corner or club style experiences', 'Family-friendly pool time', 'Flexible room categories', 'Activities for multiple ages']
        : ['Family stays available in selected room categories', 'Relaxed shared spaces', 'Easy beach access', 'Flexible meal plans'],
    },
  ]
}

function getActivityGroups() {
  return [
    {
      title: 'Complimentary Land Activities',
      items: ['Table tennis', 'Recreational games', 'Yoga sessions', 'Light fitness and stretching'],
    },
    {
      title: 'Complimentary Water Activities',
      items: ['Sailing', 'Kayaks', 'Paddle boards', 'Pedal boats', 'Snorkelling', 'Glass-bottom boat trips'],
    },
    {
      title: 'Payable Activities',
      items: ['Private snorkelling trips', 'Private water-skiing sessions', 'Small-game fishing', 'Sunset cruises', 'Catamaran experiences'],
    },
    {
      title: 'Beach Amenities',
      items: ['Face towels', 'Cooling face mist', 'Chilled water service', 'Glasses cleaning spray'],
    },
  ]
}

function getWellnessDetails(hotel: Hotel) {
  return {
    intro: `${hotel.name} leans into a slower, more restorative side of Mauritius with wellness woven through the guest experience rather than positioned as an afterthought.`,
    items: [
      'Spa rituals and massage journeys designed around rest, recovery and tropical calm',
      'Yoga on the beach, light movement sessions and aqua-based wellness moments',
      'Meditation, stretching and mindful recovery experiences',
      'Enhanced wellness touches in selected suite categories, including hammam-inspired features where applicable',
    ],
  }
}

function getGalleryCategories(hotel: Hotel): GalleryCategory[] {
  return [
    {
      id: 'rooms',
      label: 'Rooms',
      images: [
        { src: sharedGalleryImages.room, caption: 'Room arrival' },
        { src: hotel.images[0], caption: 'Suite styling' },
      ],
    },
    {
      id: 'pool-beach',
      label: 'Pool & Beach',
      images: [
        { src: hotel.images[1] || sharedGalleryImages.pool, caption: 'Pool scene' },
        { src: hotel.images[2] || sharedGalleryImages.view, caption: 'Beach outlook' },
      ],
    },
    {
      id: 'dining',
      label: 'Dining',
      images: [
        { src: sharedGalleryImages.arrival, caption: 'Arrival lounge' },
        { src: sharedGalleryImages.resort, caption: 'Resort dining mood' },
      ],
    },
    {
      id: 'spa',
      label: 'Spa & Wellness',
      images: [
        { src: sharedGalleryImages.wellness, caption: 'Wellness atmosphere' },
        { src: sharedGalleryImages.pool, caption: 'Restorative poolside' },
      ],
    },
    {
      id: 'grounds',
      label: 'Resort Grounds',
      images: [
        { src: sharedGalleryImages.view, caption: 'Garden view' },
        { src: sharedGalleryImages.resort, caption: 'Grounds and pathways' },
      ],
    },
  ]
}

function getPriceGuide(hotel: Hotel) {
  const base = hotel.price

  return [
    {
      dates: hotel.period,
      board: hotel.board,
      n7: formatCurrency(base),
      n10: createPriceBand(base, 10, 1.02),
      n12: createPriceBand(base, 12, 1.03),
      n14: createPriceBand(base, 14, 1.05),
    },
    {
      dates: 'Shoulder season departures',
      board: hotel.board,
      n7: createPriceBand(base, 7, 1.04),
      n10: createPriceBand(base, 10, 1.05),
      n12: createPriceBand(base, 12, 1.06),
      n14: createPriceBand(base, 14, 1.08),
    },
    {
      dates: 'Peak demand departures',
      board: hotel.board === 'All Inclusive' ? 'Premium All Inclusive' : hotel.board,
      n7: createPriceBand(base, 7, 1.08),
      n10: createPriceBand(base, 10, 1.1),
      n12: createPriceBand(base, 12, 1.12),
      n14: createPriceBand(base, 14, 1.14),
    },
  ]
}

function getPriceIncludes(hotel: Hotel) {
  return [
    'Return flights',
    'Airport taxes',
    'Meet and greet support',
    'Round-trip transfers',
    `${hotel.nights} nights accommodation`,
    `${hotel.board} board basis`,
    'Services of a holiday representative',
    'Booking offer where applicable',
  ]
}

function getImportantInformation(hotel: Hotel) {
  return [
    'Not all facilities and activities are complimentary.',
    'Resort features, venues and activities are subject to seasonal change.',
    `${hotel.board} inclusions are governed by the hotel’s current board basis rules.`,
    'All inclusive validity timings and venue participation may vary.',
    'Supplements may apply for selected dining, drinks or premium experiences.',
    'Hotel management reserves the right to amend facilities, timings and inclusions.',
    'Final room category and package inclusions are confirmed at booking stage.',
  ]
}

function SectionShell({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-6 md:mb-7">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        {intro ? <p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">{intro}</p> : null}
      </div>
      {children}
    </section>
  )
}

export function HotelDetail({ hotel }: HotelDetailProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [previousImage, setPreviousImage] = useState<number | null>(null)
  const [isHeroImageVisible, setIsHeroImageVisible] = useState(true)
  const [isHeroZoomed, setIsHeroZoomed] = useState(false)
  const [quoteSubmitted, setQuoteSubmitted] = useState(false)
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

  const bestForTags = getBestForTags(hotel)
  const hotelVibe = getHotelVibe(hotel, bestForTags)
  const highlightStrip = getHighlightStrip(hotel, bestForTags)
  const factCards = getFactCards(hotel, bestForTags)
  const overviewParagraphs = getOverviewParagraphs(hotel, bestForTags)
  const accommodationIntro = getAccommodationIntro(hotel)
  const roomCategories = getRoomCategories(hotel)
  const diningSummary = getDiningSummary(hotel)
  const boardOptions = getBoardOptions(hotel)
  const facilityGroups = getFacilityGroups(hotel)
  const activityGroups = getActivityGroups()
  const wellnessDetails = getWellnessDetails(hotel)
  const galleryCategories = getGalleryCategories(hotel)
  const priceGuide = getPriceGuide(hotel)
  const priceIncludes = getPriceIncludes(hotel)
  const importantInformation = getImportantInformation(hotel)

  const sectionTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'accommodation', label: 'Rooms' },
    { id: 'dining', label: 'Dining' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'activities', label: 'Activities' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'prices', label: 'Prices' },
  ]

  const nextImage = () => {
    const nextIndex = (currentImage + 1) % hotel.images.length
    setPreviousImage(currentImage)
    setCurrentImage(nextIndex)
    setIsHeroImageVisible(false)
  }

  const prevImage = () => {
    const nextIndex = (currentImage - 1 + hotel.images.length) % hotel.images.length
    setPreviousImage(currentImage)
    setCurrentImage(nextIndex)
    setIsHeroImageVisible(false)
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextIndex = (currentImage + 1) % hotel.images.length
      setPreviousImage(currentImage)
      setCurrentImage(nextIndex)
      setIsHeroImageVisible(false)
    }, 6000)

    return () => window.clearTimeout(timeout)
  }, [currentImage, hotel.images.length])

  useEffect(() => {
    setIsHeroZoomed(false)

    const frame = window.requestAnimationFrame(() => {
      setIsHeroImageVisible(true)
      setIsHeroZoomed(true)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [currentImage])

  useEffect(() => {
    if (previousImage === null) return

    const timeout = window.setTimeout(() => {
      setPreviousImage(null)
    }, 900)

    return () => window.clearTimeout(timeout)
  }, [previousImage])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuoteSubmitted(true)
  }

  const relatedHotels = hotels
    .filter((h) => h.id !== hotel.id && h.categories.some((c) => hotel.categories.includes(c)))
    .slice(0, 3)

  const desktopSections = [
    {
      id: 'overview',
      title: 'Overview',
      intro: undefined,
      content: (
        <div className="grid gap-4">
          {overviewParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      ),
    },
    {
      id: 'at-a-glance',
      title: 'At a Glance',
      intro: 'Key hotel information presented in a cleaner format for faster decision-making.',
      content: (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {factCards.map((fact) => (
            <Card key={fact.label} className="rounded-2xl border-0 shadow-sm bg-secondary/40">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                  <fact.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">{fact.label}</p>
                  <p className="font-medium text-foreground leading-relaxed">{fact.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 'accommodation',
      title: 'Accommodation',
      intro: accommodationIntro,
      content: (
        <div className="grid xl:grid-cols-2 gap-5">
          {roomCategories.map((room) => (
            <Card key={room.name} className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold">{room.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{room.description}</p>
                  </div>
                  <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                    {room.occupancy}
                  </Badge>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">View Type</p>
                    <p className="font-medium">{room.view}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary/50 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Key Feature</p>
                    <p className="font-medium">{room.feature}</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border/60 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Special Note</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{room.note}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 'room-features',
      title: 'Room Features',
      intro: 'A standard feature guide to help guests understand what to expect across the room and suite collection.',
      content: (
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="p-6 grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {roomFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'dining',
      title: 'Dining',
      intro: diningSummary.intro,
      content: (
        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-6">
          <Card className="rounded-3xl border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              {diningSummary.details.map((detail) => (
                <div key={detail} className="flex items-start gap-3">
                  <Utensils className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <p className="text-muted-foreground leading-relaxed">{detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card className="rounded-3xl border-0 shadow-sm bg-gradient-to-br from-accent/10 to-secondary/50">
            <CardContent className="p-6 space-y-4">
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Dining Mood</p>
              <p className="text-lg font-medium leading-relaxed">
                Expect relaxed breakfasts, polished evening dinners, destination cocktails and a dining rhythm that feels easy rather than overly formal.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wine pairings, beachside moments and selected signature venues may be available depending on your board basis and hotel policy.
              </p>
            </CardContent>
          </Card>
        </div>
      ),
    },
    {
      id: 'board-basis',
      title: 'Board Basis',
      intro: 'Board basis matters commercially on travel pages, so the options below are structured for fast comparison.',
      content: (
        <Tabs defaultValue={hotel.board === 'All Inclusive' ? 'premium-all-inclusive' : hotel.board === 'Half Board' ? 'half-board' : 'bed-breakfast'} className="gap-5">
          <TabsList className="w-full h-auto flex-wrap justify-start rounded-2xl p-2">
            {boardOptions.map((option) => (
              <TabsTrigger key={option.id} value={option.id} className="rounded-xl px-4 py-2.5">
                {option.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {boardOptions.map((option) => (
            <TabsContent key={option.id} value={option.id}>
              <Card className="rounded-3xl border-0 shadow-sm">
                <CardContent className="p-6 space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{option.intro}</p>
                  <div className="grid lg:grid-cols-3 gap-5">
                    <div className="rounded-2xl bg-secondary/40 p-5">
                      <h3 className="font-semibold mb-3">Meals</h3>
                      <div className="space-y-2">
                        {option.meals.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-secondary/40 p-5">
                      <h3 className="font-semibold mb-3">Beverages</h3>
                      <div className="space-y-2">
                        {option.beverages.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl bg-secondary/40 p-5">
                      <h3 className="font-semibold mb-3">Notes</h3>
                      <div className="space-y-2">
                        {option.notes.map((item) => (
                          <div key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ),
    },
    {
      id: 'facilities',
      title: 'Facilities',
      intro: 'Facilities are separated from the general highlights so guests can scan the resort product more quickly.',
      content: (
        <div className="grid md:grid-cols-2 gap-5">
          {facilityGroups.map((group) => (
            <Card key={group.title} className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-accent/15 text-accent flex items-center justify-center">
                    <group.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold">{group.title}</h3>
                </div>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 'activities',
      title: 'Activities',
      intro: 'Activities are grouped clearly so guests can understand what is complimentary, what is chargeable and what beach service touches help elevate the stay.',
      content: (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {activityGroups.map((group) => (
            <Card key={group.title} className="rounded-3xl border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">{group.title}</h3>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ),
    },
    {
      id: 'wellness',
      title: 'Wellness',
      intro: wellnessDetails.intro,
      content: (
        <Card className="rounded-[2rem] border-0 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white shadow-xl">
          <CardContent className="p-8 md:p-10 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/60 mb-3">Wellness Positioning</p>
              <h3 className="text-3xl font-semibold leading-tight mb-4">A calmer, more restorative side of the resort.</h3>
              <p className="text-white/75 leading-relaxed">
                This section helps the hotel feel differentiated from a standard beach escape by leaning into holistic rituals, slow mornings and more intentional downtime.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {wellnessDetails.items.map((item) => (
                <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed text-white/85">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'gallery',
      title: 'Gallery',
      intro: 'The gallery is more visual and less text-heavy, with grouped image themes that help guests scan the property quickly.',
      content: (
        <Tabs defaultValue={galleryCategories[0].id} className="gap-5">
          <TabsList className="w-full h-auto flex-wrap justify-start rounded-2xl p-2">
            {galleryCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="rounded-xl px-4 py-2.5">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {galleryCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 gap-5">
                {category.images.map((image) => (
                  <Card key={`${category.id}-${image.caption}-${image.src}`} className="gap-0 rounded-[1.75rem] border border-slate-200/80 bg-white overflow-hidden py-0 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={image.src}
                        alt={`${hotel.name} ${image.caption}`}
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-cover ${image.imageClassName ?? 'object-center'}`}
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-slate-700">{image.caption}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ),
    },
    {
      id: 'prices',
      title: 'Price Guide',
      intro: 'A clearer pricing section works better than a single lead price alone, especially for guests comparing duration and board basis.',
      content: (
        <Card className="rounded-3xl border-0 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="bg-secondary/50">
                <tr className="text-sm text-muted-foreground">
                  <th className="px-6 py-4 font-medium">Dates</th>
                  <th className="px-6 py-4 font-medium">Board Basis</th>
                  <th className="px-6 py-4 font-medium">7 Nts</th>
                  <th className="px-6 py-4 font-medium">10 Nts</th>
                  <th className="px-6 py-4 font-medium">12 Nts</th>
                  <th className="px-6 py-4 font-medium">14 Nts</th>
                </tr>
              </thead>
              <tbody>
                {priceGuide.map((row) => (
                  <tr key={row.dates} className="border-t border-border/60">
                    <td className="px-6 py-4 font-medium">{row.dates}</td>
                    <td className="px-6 py-4 text-muted-foreground">{row.board}</td>
                    <td className="px-6 py-4">{row.n7}</td>
                    <td className="px-6 py-4">{row.n10}</td>
                    <td className="px-6 py-4">{row.n12}</td>
                    <td className="px-6 py-4">{row.n14}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <CardContent className="p-6 grid gap-2 text-sm text-muted-foreground">
            <p>Prices are per person, based on a minimum of 2 adults sharing.</p>
            <p>Travel must fall within the date bands shown and remains subject to availability.</p>
            <p>Lead prices may assume advance booking and the hotel’s lead-in room category.</p>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'price-includes',
      title: 'Price Includes',
      intro: 'This keeps the commercial value of the package clear while still feeling premium.',
      content: (
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="p-6 grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {priceIncludes.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Check className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'important-information',
      title: 'Important Information',
      intro: 'This formal section helps keep operational detail clear without crowding the main editorial sections.',
      content: (
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardContent className="p-6 grid gap-3">
            {importantInformation.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      ),
    },
  ]

  return (
    <div className="bg-background">
      <section className="relative min-h-[72vh] overflow-hidden bg-slate-900">
        {previousImage !== null && (
          <img
            src={hotel.images[previousImage]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover"
          />
        )}
        <div
          className={`absolute inset-0 transition-opacity ease-out will-change-[opacity] ${
            isHeroImageVisible ? 'opacity-100 duration-[1200ms]' : 'opacity-0 duration-300'
          }`}
        >
          <img
            key={`${hotel.slug}-${currentImage}`}
            src={hotel.images[currentImage]}
            alt={`${hotel.name} banner`}
            loading={currentImage === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className={`h-full w-full object-cover transition-transform ease-out will-change-transform ${
              isHeroZoomed ? 'scale-[1.08] duration-[6000ms]' : 'scale-[1.02] duration-700'
            }`}
          />
        </div>
        <button
          onClick={prevImage}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur text-slate-900 flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur text-slate-900 flex items-center justify-center hover:bg-white transition-colors"
          aria-label="Next image"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute top-5 left-4 md:left-6">
          <Button variant="secondary" className="rounded-full gap-2 shadow-md" asChild>
            <Link href="/hotels">
              <ChevronLeft className="w-4 h-4" />
              Back to Hotels
            </Link>
          </Button>
        </div>

        <div className="hidden">
          <div className="w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <Badge className="rounded-full bg-white/15 border border-white/15 text-white">{hotel.badge}</Badge>
                <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur text-white">
                  {Array.from({ length: hotel.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif font-semibold text-white leading-tight">{hotel.name}</h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{hotel.coast}, Mauritius</span>
                </div>
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  <span>{hotel.board}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{hotel.nights} nights</span>
                </div>
              </div>
              <p className="mt-6 text-lg md:text-2xl text-white/90 max-w-2xl leading-relaxed">{hotelVibe}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-full h-14 px-8 text-base bg-white text-slate-950 hover:bg-white/90" asChild>
                  <a href="#quote-form">Request Quote</a>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base border-white/40 text-white bg-white/10 hover:bg-white/15" asChild>
                  <a href="#quote-form">Enquire Now</a>
                </Button>
              </div>
            </div>

            <Card className="hidden lg:block rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-xl text-white shadow-2xl">
              <CardContent className="p-7">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60 mb-3">Starting Price</p>
                <p className="text-5xl font-semibold leading-none">{formatCurrency(hotel.price)}</p>
                <p className="mt-2 text-white/70">per person • {hotel.nights} nights</p>
                <div className="mt-6 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Date range</span>
                    <span>{hotel.period}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Board basis</span>
                    <span>{hotel.board}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Saving</span>
                    <span>{formatCurrency((hotel.originalPrice - hotel.price) * 2)} per couple</span>
                  </div>
                </div>
                <div className="mt-7 flex flex-col gap-3">
                  <Button className="rounded-full h-12 text-base bg-white text-slate-950 hover:bg-white/90" asChild>
                    <a href="#quote-form">Request Quote</a>
                  </Button>
                  <Button variant="outline" className="rounded-full h-12 text-base border-white/30 text-white bg-transparent hover:bg-white/10" asChild>
                    <a href="#quote-form">Check Availability</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-10 md:-mt-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            {highlightStrip.map((item) => {
              const Icon = highlightIconMap[item] || Sparkles
              return (
                <Card key={item} className="h-full rounded-2xl border-0 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                  <CardContent className="flex h-full items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-slate-800">{item}</span>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="hidden lg:block border-y border-border/60 bg-background/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex flex-wrap gap-3">
            {sectionTabs.map((tab) => (
              <Button key={tab.id} variant="outline" className="rounded-full" asChild>
                <a href={`#${tab.id}`}>{tab.label}</a>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-12">
          <div className="space-y-12">
            <section className="grid scroll-mt-32 gap-6">
              <Card className="h-full rounded-[2rem] border-0 shadow-sm">
                <CardContent className="p-7 md:p-8">
                  <div className="grid gap-7 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <Badge className="rounded-full bg-accent/15 text-accent border-0">{hotel.badge}</Badge>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: hotel.stars }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                          ))}
                        </div>
                      </div>
                      <h2 className="text-3xl font-semibold tracking-tight">{hotel.name}</h2>
                      <div className="mt-3 flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {hotel.coast}, Mauritius
                        </div>
                        <div className="flex items-center gap-2">
                          <Utensils className="w-4 h-4" />
                          {hotel.board}
                        </div>
                      </div>
                      <p className="mt-5 text-muted-foreground leading-relaxed">{overviewParagraphs[0]}</p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {bestForTags.map((tag) => (
                          <Badge key={tag} variant="outline" className="rounded-full px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-3xl bg-secondary/40 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Hotel Style / Vibe</p>
                      <p className="font-medium leading-relaxed">{hotelVibe}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full lg:hidden rounded-[2rem] border-0 shadow-md bg-accent/10">
                <CardContent className="flex h-full flex-col p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Starting Price</p>
                    <p className="text-4xl font-semibold">{formatCurrency(hotel.price)}<span className="text-base font-normal text-muted-foreground"> pp</span></p>
                  </div>
                  <div className="mt-5 grid gap-2 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Date range</span>
                      <span className="font-medium">{hotel.period}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Board basis</span>
                      <span className="font-medium">{hotel.board}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Saving</span>
                      <span className="font-medium">{formatCurrency((hotel.originalPrice - hotel.price) * 2)}</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full rounded-full h-12" asChild>
                    <a href="#quote-form">Request Quote</a>
                  </Button>
                </CardContent>
              </Card>
            </section>

            <div className="hidden md:block space-y-12">
              {desktopSections.map((section) => (
                <SectionShell key={section.id} id={section.id} title={section.title} intro={section.intro}>
                  {section.content}
                </SectionShell>
              ))}
            </div>

            <div className="md:hidden">
              <Accordion type="single" collapsible defaultValue="overview" className="rounded-[2rem] border border-border/60 bg-card shadow-sm px-5">
                {desktopSections.map((section) => (
                  <AccordionItem key={section.id} value={section.id} className="border-border/60">
                    <AccordionTrigger className="py-5 text-base font-semibold">{section.title}</AccordionTrigger>
                    <AccordionContent className="pb-5">
                      {section.intro ? <p className="mb-5 text-sm text-muted-foreground leading-relaxed">{section.intro}</p> : null}
                      {section.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {relatedHotels.length > 0 && (
              <section id="related-hotels" className="scroll-mt-32">
                <div className="mb-6 md:mb-7">
                  <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">You May Also Like</h2>
                  <p className="mt-3 text-muted-foreground">
                    Similar options for destination, board basis, traveller style and premium value.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedHotels.map((relatedHotel) => (
                    <Link key={relatedHotel.id} href={`/hotels/${relatedHotel.slug}`}>
                      <Card className="rounded-2xl border-0 overflow-hidden shadow-md bg-card group h-full">
                        <div className="relative h-52">
                          <img
                            src={relatedHotel.image}
                            alt={relatedHotel.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <Badge className="rounded-full bg-accent text-accent-foreground text-xs">{relatedHotel.badge}</Badge>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-center gap-1 mb-2">
                            {Array.from({ length: relatedHotel.stars }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                          <h3 className="font-semibold text-lg">{relatedHotel.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{relatedHotel.board}</p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {relatedHotel.categories.slice(0, 2).map((category) => (
                              <Badge key={category} variant="outline" className="rounded-full text-xs">
                                {categoryLabels[category] || category}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-5 flex items-center justify-between">
                            <p className="text-lg font-semibold">From {formatCurrency(relatedHotel.price)}pp</p>
                            <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:pl-2">
            <Card className="hidden lg:block rounded-[2rem] border-0 shadow-md bg-accent/10">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{hotel.period}</p>
                  <p className="text-sm text-muted-foreground line-through">{formatCurrency(hotel.originalPrice)} per person</p>
                  <p className="text-4xl font-semibold">
                    {formatCurrency(hotel.price)}
                    <span className="text-lg font-normal text-muted-foreground">pp</span>
                  </p>
                  <p className="text-accent font-semibold">Save {formatCurrency((hotel.originalPrice - hotel.price) * 2)} per couple</p>
                  <div className="pt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Board basis</span>
                      <span className="font-medium">{hotel.board}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{hotel.nights} nights</span>
                    </div>
                  </div>
                  <Button className="w-full rounded-full h-12 mt-5" asChild>
                    <a href="#quote-form">Quote CTA</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card id="quote-form" className="rounded-[2rem] border-0 shadow-lg lg:sticky lg:top-24 scroll-mt-28">
              <CardHeader>
                <CardTitle>Request a Quote</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Fill in your details and we&apos;ll send you a personalised quote within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                {quoteSubmitted && (
                  <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                    Quote request submitted. Our team will contact you within 24 hours.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="rounded-xl min-h-[110px]"
                  />
                  <Button type="submit" className="w-full rounded-full h-12">
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
          </aside>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border/70 bg-background/95 backdrop-blur p-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">From</p>
            <p className="font-semibold">{formatCurrency(hotel.price)}pp</p>
          </div>
          <Button className="rounded-full h-11 px-6 shrink-0" asChild>
            <a href="#quote-form">Request Quote</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
