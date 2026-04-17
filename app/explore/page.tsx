import { Metadata } from 'next'
import Link from 'next/link'
import {
  Plane,
  BookOpen,
  Sun,
  Thermometer,
  Clock,
  CreditCard,
  Car,
  Utensils,
  ShoppingBag,
  PartyPopper,
  Waves,
  TreePalm,
  Camera,
  Heart,
} from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidget } from '@/components/chatbot-widget'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'Explore Mauritius | Island Guide & Travel Info | Mauritius Holidays Direct',
  description: 'Discover everything about Mauritius - beaches, climate, culture, cuisine, activities and essential travel information for your perfect holiday.',
}

const sections = [
  {
    id: 'beaches',
    title: 'Beaches & Lagoons',
    icon: Waves,
    image: 'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&w=800&q=80',
    content: 'Mauritius is famous for its pristine white sand beaches protected by coral reefs. The calm, crystal-clear lagoons are perfect for swimming, snorkelling and water sports. Popular beaches include Belle Mare, Le Morne, Flic en Flac, and Trou aux Biches.',
  },
  {
    id: 'climate',
    title: 'Climate & Weather',
    icon: Sun,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    content: 'Mauritius enjoys a tropical climate with warm weather year-round. Summer (November to April) is warm and humid with temperatures around 30°C. Winter (May to October) is cooler at around 20-25°C with less humidity. The best time to visit is April-June and September-December.',
  },
  {
    id: 'culture',
    title: 'Culture & History',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&w=800&q=80',
    content: 'Mauritius has a rich multicultural heritage with influences from India, Africa, China and Europe. The harmonious blend of Hindu, Muslim, Christian and Buddhist communities creates a unique cultural tapestry celebrated through colourful festivals throughout the year.',
  },
  {
    id: 'cuisine',
    title: 'Cuisine & Dining',
    icon: Utensils,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    content: 'Mauritian cuisine is a delicious fusion of Indian, Creole, Chinese and European flavours. From street food like dholl puri and samosas to fine dining seafood, the variety is endless. Fresh tropical fruits, aromatic spices and local rum complete the culinary experience.',
  },
  {
    id: 'activities',
    title: 'Activities & Excursions',
    icon: TreePalm,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
    content: 'From water sports like diving, snorkelling and deep-sea fishing to land adventures including hiking, zip-lining and quad biking. Visit the Seven Coloured Earths, swim with dolphins, explore Black River Gorges National Park, or take a catamaran cruise to nearby islands.',
  },
  {
    id: 'nightlife',
    title: 'Nightlife & Entertainment',
    icon: PartyPopper,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    content: 'Grand Baie on the north coast is the nightlife hub with bars, clubs and restaurants. Most luxury resorts offer evening entertainment including live music, traditional shows and romantic beach dining. Casinos are available in several locations around the island.',
  },
]

const practicalInfo = [
  {
    icon: Plane,
    title: 'Getting There',
    content: 'Direct flights from London Heathrow take approximately 12 hours. Airlines include Air Mauritius, British Airways and Emirates. Connections available from regional UK airports.',
  },
  {
    icon: BookOpen,
    title: 'Entry Requirements',
    content: 'UK passport holders do not need a visa for stays up to 90 days. Passport must be valid for at least 6 months from entry date. Return or onward tickets may be required.',
  },
  {
    icon: Clock,
    title: 'Time Zone',
    content: 'Mauritius is GMT+4, so 4 hours ahead of the UK in winter and 3 hours ahead during British Summer Time.',
  },
  {
    icon: CreditCard,
    title: 'Currency',
    content: 'The Mauritian Rupee (MUR) is the local currency. Major credit cards are widely accepted. ATMs are available in towns and tourist areas. GBP and Euros are easily exchanged.',
  },
  {
    icon: Car,
    title: 'Getting Around',
    content: 'Driving is on the left, like the UK. Car hire is available from the airport and hotels. Taxis are plentiful, and many visitors book private transfers through their resort.',
  },
  {
    icon: Thermometer,
    title: 'Health & Safety',
    content: 'No vaccinations are required for UK visitors. Tap water is generally safe. Healthcare is good with private clinics in tourist areas. Travel insurance is strongly recommended.',
  },
]

export default function ExplorePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aesthetic-summer-holidays-P0kQqXt9b6jPL1lg6rzd21RZ2zeJz9.jpg"
            alt="Overwater villas at sunset in Mauritius"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16 w-full">
              <Badge className="rounded-full px-4 py-1 bg-accent text-accent-foreground mb-4">
                Island Guide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
                Explore Mauritius
              </h1>
              <p className="text-lg text-white/80 max-w-2xl">
                &ldquo;You gather the idea that Mauritius was made first and then heaven was copied after Mauritius.&rdquo; — Mark Twain
              </p>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="bg-secondary/50 py-8">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">12hr</p>
                <p className="text-sm text-muted-foreground mt-1">Flight from UK</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">25°C</p>
                <p className="text-sm text-muted-foreground mt-1">Average Temperature</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">+4hr</p>
                <p className="text-sm text-muted-foreground mt-1">GMT Time Zone</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-accent">330km</p>
                <p className="text-sm text-muted-foreground mt-1">Of Coastline</p>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Discover Paradise in the Indian Ocean
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              This enchanting island with its rich colours, breathtaking beaches, fascinating 
              interwoven cultures and exotic tastes makes Mauritius one of the most remarkable 
              holiday experiences of a lifetime. Situated in the magical turquoise waters of 
              the Indian Ocean, every moment is a memory to treasure.
            </p>
          </div>
        </section>

        {/* Main Sections */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16">
          <div className="space-y-16">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="rounded-3xl overflow-hidden shadow-lg h-72 md:h-96">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={`space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <section.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-2xl font-semibold">{section.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Information */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="rounded-full px-4 py-1 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 mb-4">
                Practical Information
              </Badge>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Essential Travel Guide
              </h2>
              <p className="text-primary-foreground/70 mt-3 max-w-2xl mx-auto">
                Everything you need to know before travelling to Mauritius.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {practicalInfo.map((item) => (
                <Card key={item.title} className="rounded-2xl border-primary-foreground/10 bg-primary-foreground/5">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      <h3 className="font-semibold text-primary-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-primary-foreground/70 leading-relaxed">
                      {item.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <Card className="rounded-3xl border-0 bg-gradient-to-br from-accent/10 via-background to-secondary/50 shadow-lg overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <Heart className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                Ready to Experience Mauritius?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Let our Mauritius specialists help you plan your perfect holiday. 
                From romantic honeymoons to family adventures, we&apos;ll create memories that last forever.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="rounded-full" asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full" asChild>
                  <Link href="/hotels">Browse Hotels</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  )
}
