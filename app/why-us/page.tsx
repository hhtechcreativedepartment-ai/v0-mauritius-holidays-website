import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Plane, Users, Star, BadgeCheck, Headphones, CreditCard, Award, Heart, MapPin, Clock, Gift, CheckCircle, ExternalLink } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidgetLoader } from '@/components/chatbot-widget-loader'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { brand, reviews } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Why Book With Us | Mauritius Holidays Direct',
  description: 'Discover why thousands of travellers trust Mauritius Holidays Direct for their luxury Mauritius holidays. ATOL protected, expert knowledge, best price guarantee.',
}

const mainBenefits = [
  {
    icon: Shield,
    title: 'Full Financial Protection',
    description: 'Your holiday is fully protected by ATOL, IATA and ABTA. You receive complete peace of mind with the highest level of consumer protection available in the UK travel industry.',
    highlight: 'ATOL Licence No. 5744',
  },
  {
    icon: Users,
    title: 'Mauritius Specialists',
    description: 'We specialise only in Mauritius holidays. With vast experience and first-hand knowledge of the island and its hotels, plus close relationships with all hotels and airlines, we offer unmatched expertise.',
    highlight: 'First-hand destination knowledge',
  },
  {
    icon: BadgeCheck,
    title: 'Best Price Guarantee',
    description: 'We are a UK-based direct sell holiday company, so you get the best prices. If you find a cheaper price elsewhere within 48 hours of booking, we\'ll refund the difference.',
    highlight: '48-hour price match promise',
  },
  {
    icon: CreditCard,
    title: 'No Booking Fees',
    description: 'Unlike many travel agents, we don\'t charge extra fees for booking your holiday with us. The price you see is the price you pay.',
    highlight: 'Zero hidden charges',
  },
]

const serviceFeatures = [
  {
    icon: Heart,
    title: 'Tailor-Made Holidays',
    description: 'Your holiday is built for you by our Mauritius experts. Tell us what you want and we\'ll make it happen with advice you can trust.',
  },
  {
    icon: Plane,
    title: 'All-In-One Packages',
    description: 'Flights, hotel, transfers, insurance and everything else you need, booked into one simple package with instant confirmation.',
  },
  {
    icon: MapPin,
    title: 'In-Resort Support',
    description: 'Our holiday reps in Mauritius ensure a smooth experience and are always available to assist, unlike competitors who offer DIY packages.',
  },
  {
    icon: Gift,
    title: 'Exclusive Perks',
    description: 'Enjoy complimentary room upgrades, spa treatment discounts and special touches where available through our hotel partnerships.',
  },
  {
    icon: Headphones,
    title: 'Expert Customer Service',
    description: 'A luxury holiday needs luxury service. We look after you from booking to returning home with first-class support.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognised by tourism authorities and airlines for our excellence in Mauritius holiday planning and customer service.',
  },
]

const journeySteps = [
  {
    step: '01',
    title: 'Friendly Airport Meet & Greet',
    description: 'Be guided to your transfer with a warm welcome.',
  },
  {
    step: '02',
    title: 'Comfortable Resort Transfer',
    description: 'Receive a cool flannel and cold water for your journey.',
  },
  {
    step: '03',
    title: 'Personal Holiday Rep',
    description: 'Your own experienced rep to look after you and book excursions.',
  },
  {
    step: '04',
    title: 'Exclusive Upgrades',
    description: 'Complimentary room upgrades or spa discounts where available.',
  },
  {
    step: '05',
    title: 'Smooth Return',
    description: 'Full guidance from hotel to airport for your trip home.',
  },
]

export default function WhyUsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[46vh] sm:h-[50vh] md:h-[55vh]">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/person-traveling-enjoying-their-vacation-996Oe6JVNydpheyK5WCnLf19saqtTk.jpg"
            alt="Traveler enjoying scenic Mauritius views"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 md:px-6 pb-12 md:pb-16 w-full">
              <Badge className="rounded-full px-4 py-1 bg-accent text-accent-foreground mb-4">
                Award-Winning Service
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-3">
                Why Book With Us
              </h1>
              <p className="text-base sm:text-lg text-white/80 max-w-2xl">
                Treat yourself to a luxury Mauritius holiday with the UK&apos;s trusted specialists.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Your Mauritius Holiday, Handled With Care
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Not far from the coast of the African continent, Mauritius is a little gem in 
              the Indian Ocean waiting just for you. Let Mauritius Holidays Direct handle 
              everything for a fun, hassle-free booking experience tailored to your exact 
              tastes and budget.
            </p>
          </div>
        </section>

        {/* Main Benefits */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mainBenefits.map((benefit) => (
                <Card key={benefit.title} className="rounded-2xl border-0 shadow-sm">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                        <benefit.icon className="w-7 h-7 text-accent" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold">{benefit.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                        <Badge variant="outline" className="rounded-full">
                          {benefit.highlight}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Protection Badges */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Full Industry Protection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Book with complete confidence knowing your holiday is protected by the UK&apos;s 
              most trusted travel associations.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {[
              { name: 'ATOL', description: 'Air Travel Organiser\'s Licence', licence: 'No. 5744' },
              { name: 'IATA', description: 'International Air Transport Association', licence: 'Member' },
              { name: 'ABTA', description: 'Association of British Travel Agents', licence: 'Member' },
            ].map((badge) => (
              <Card key={badge.name} className="w-full rounded-2xl border-0 shadow-sm sm:w-auto">
                <CardContent className="p-5 sm:p-6 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-lg font-bold">{badge.name}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{badge.name} Protected</p>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    <p className="text-xs text-accent font-medium mt-1">{badge.licence}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Features */}
        <section className="bg-primary text-primary-foreground py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <Badge className="rounded-full px-4 py-1 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 mb-4">
                Our Service
              </Badge>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Premium Service, Every Step
              </h2>
              <p className="text-primary-foreground/70 mt-3 max-w-2xl mx-auto">
                A luxury holiday needs luxury service - that&apos;s what you get with Mauritius Holidays Direct.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceFeatures.map((feature) => (
                <Card key={feature.title} className="rounded-2xl border-primary-foreground/10 bg-primary-foreground/5">
                  <CardContent className="p-6 space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold text-primary-foreground">{feature.title}</h3>
                    <p className="text-sm text-primary-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Customer Journey */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
              Your Premium Holiday Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From the moment you arrive to when you return home, we look after every detail.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {journeySteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-accent">{step.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
              <div>
                <Badge variant="outline" className="rounded-full px-4 py-1 bg-card mb-4">
                  Customer Reviews
                </Badge>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Trusted by Thousands
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold">{brand.trustpilotScore}/5</p>
                  <p className="text-xs text-muted-foreground">{brand.trustpilotReviews} reviews</p>
                </div>
              </div>
            </div>

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
                      <p className="text-xs text-muted-foreground">{review.hotel}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-full gap-2" asChild>
                <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer">
                  View All Reviews
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
          <Card className="rounded-3xl border-0 bg-gradient-to-br from-accent/10 via-background to-secondary/50 shadow-lg overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">
                Ready for Your Dream Mauritius Holiday?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Just relax and enjoy - we handle everything from booking to returning home 
                to make sure you can fully enjoy your luxury Mauritius holiday without a care in the world.
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
      <ChatbotWidgetLoader />
    </>
  )
}
