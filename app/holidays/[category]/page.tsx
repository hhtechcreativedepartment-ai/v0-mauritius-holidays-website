import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Star, MapPin, Check, ChevronRight } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidget } from '@/components/chatbot-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { categories, hotels } from '@/lib/data'

interface Props {
  params: Promise<{ category: string }>
}

const categoryContent: Record<string, {
  heroImage: string
  intro: string
  features: string[]
}> = {
  'all-inclusive': {
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80',
    intro: 'Experience the ultimate in worry-free luxury with our all-inclusive Mauritius holidays. From gourmet dining to premium drinks, water sports to spa treatments, everything is included in one seamless package.',
    features: [
      'All meals and premium drinks included',
      'Water sports and activities',
      'Evening entertainment',
      'Kids clubs and family facilities',
      'Spa and wellness access',
      'No hidden costs or extras',
    ],
  },
  honeymoon: {
    heroImage: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&w=1600&q=80',
    intro: 'Begin your married life in paradise with a romantic Mauritius honeymoon. Powder-soft beaches, candlelit dinners, couples\' spa treatments and private moments create memories that last forever.',
    features: [
      'Romantic room upgrades',
      'Couples\' spa treatments',
      'Candlelit beach dinners',
      'Champagne on arrival',
      'Sunset cruises',
      'Private island excursions',
    ],
  },
  family: {
    heroImage: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&w=1600&q=80',
    intro: 'Create magical family memories in Mauritius with resorts designed for all ages. From dedicated kids\' clubs to connecting rooms, water parks to family excursions, we make family holidays easy.',
    features: [
      'Kids clubs and teen zones',
      'Family-friendly rooms and suites',
      'Child-friendly dining options',
      'Water sports for all ages',
      'Educational excursions',
      'Babysitting services available',
    ],
  },
  wedding: {
    heroImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80',
    intro: 'Say \"I do\" in one of the world\'s most romantic destinations. From intimate beach ceremonies to grand resort celebrations, we\'ll help you plan your dream Mauritius wedding.',
    features: [
      'Dedicated wedding planners',
      'Beach and garden venues',
      'Legal ceremony assistance',
      'Guest accommodation packages',
      'Photography and videography',
      'Reception and dining options',
    ],
  },
  golf: {
    heroImage: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1600&q=80',
    intro: 'Tee off on world-class courses with stunning Indian Ocean views. Mauritius offers championship golf designed by legends like Ernie Els, with year-round perfect playing conditions.',
    features: [
      'Championship courses',
      'Professional golf instruction',
      'Equipment hire available',
      'Golf cart and caddie services',
      'Stay and play packages',
      'Tournaments and events',
    ],
  },
  'twin-centre': {
    heroImage: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
    intro: 'Combine Mauritius with another incredible destination for the ultimate twin-centre holiday. Add Dubai, the Seychelles, South Africa or more to your Mauritius adventure.',
    features: [
      'Dubai stopover packages',
      'Seychelles combinations',
      'South Africa safari add-ons',
      'Singapore and Malaysia routes',
      'Seamless flight connections',
      'Multiple hotel options',
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const categoryData = categories.find((c) => c.id === category)
  
  if (!categoryData) {
    return {
      title: 'Category Not Found | Mauritius Holidays Direct',
    }
  }

  return {
    title: `${categoryData.title} Mauritius Holidays | Mauritius Holidays Direct`,
    description: categoryData.description,
  }
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }))
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const categoryData = categories.find((c) => c.id === category)

  if (!categoryData) {
    notFound()
  }

  const content = categoryContent[category]
  const categoryHotels = hotels.filter((h) => h.categories.includes(category))

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <img
            src={content?.heroImage || categoryData.image}
            alt={categoryData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16 w-full">
              <Badge className="rounded-full px-4 py-1 bg-accent text-accent-foreground mb-4">
                {categoryData.propertyCount} Properties
              </Badge>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
                {categoryData.title} Holidays
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                {categoryData.description}
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Why Choose {categoryData.title} in Mauritius?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {content?.intro || categoryData.description}
              </p>
              <Button className="rounded-full" asChild>
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </div>
            {content?.features && (
              <Card className="rounded-2xl border-0 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-semibold mb-4">What&apos;s Included</h3>
                  <div className="space-y-3">
                    {content.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Hotels Grid */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {categoryData.title} Hotels
                </h2>
                <p className="text-muted-foreground mt-2">
                  {categoryHotels.length} hotels available for {categoryData.title.toLowerCase()} holidays
                </p>
              </div>
              <Button variant="outline" className="rounded-full hidden md:flex" asChild>
                <Link href="/hotels">
                  View All Hotels
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryHotels.map((hotel) => (
                <Card key={hotel.id} className="rounded-2xl border-0 overflow-hidden shadow-md bg-card group">
                  <div className="relative h-52">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="rounded-full bg-accent text-accent-foreground">
                        {hotel.badge}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur px-2 py-1 rounded-full">
                      {Array.from({ length: hotel.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {hotel.coast}
                      <span className="text-border">|</span>
                      {hotel.board}
                    </div>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                      {hotel.description}
                    </p>
                    <div className="flex items-end justify-between mt-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground line-through">
                          &pound;{hotel.originalPrice.toLocaleString()}pp
                        </p>
                        <p className="text-xl font-semibold">
                          &pound;{hotel.price.toLocaleString()}
                          <span className="text-sm font-normal text-muted-foreground">pp</span>
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

            <div className="text-center mt-8 md:hidden">
              <Button variant="outline" className="rounded-full" asChild>
                <Link href="/hotels">View All Hotels</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Other Categories */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-2xl font-semibold mb-6">Explore Other Holiday Types</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories
              .filter((c) => c.id !== category)
              .map((cat) => (
                <Link key={cat.id} href={`/holidays/${cat.id}`}>
                  <Card className="rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow h-full">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium text-sm">{cat.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {cat.propertyCount} properties
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  )
}
