import { Shield, Plane, Users, Star, BadgeCheck, Headphones, CreditCard, Award } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const trustItems = [
  {
    icon: Shield,
    title: 'Fully Protected',
    description: 'ATOL, IATA and ABTA-backed reassurance for high-confidence booking.',
  },
  {
    icon: Plane,
    title: 'Tailor-Made Packages',
    description: 'Flights, hotels, transfers and extras combined into one smooth itinerary.',
  },
  {
    icon: Users,
    title: 'Mauritius Specialists',
    description: 'First-hand destination knowledge and hotel expertise for better advice.',
  },
  {
    icon: Star,
    title: 'Outstanding Service',
    description: 'Meet-and-greet support, expert care and a premium customer journey.',
  },
  {
    icon: BadgeCheck,
    title: 'Best Price Guarantee',
    description: 'Find a cheaper price within 48 hours and we will refund the difference.',
  },
  {
    icon: CreditCard,
    title: 'No Booking Fees',
    description: 'We do not charge extra fees for booking your holiday with us.',
  },
  {
    icon: Headphones,
    title: 'In-Resort Support',
    description: 'Our holiday reps ensure you have a smooth experience throughout your trip.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognised by tourism authorities and airlines for excellence.',
  },
]

export function TrustSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge variant="outline" className="rounded-full px-4 py-1 mb-4">
          Why Book With Us
        </Badge>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Book With Complete Confidence
        </h2>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Your Mauritius holiday is protected by the UK&apos;s highest industry standards, 
          with expert support from booking to return.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {trustItems.map((item) => (
          <Card key={item.title} className="rounded-2xl border-0 shadow-sm bg-card">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <item.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Protection Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        <div className="flex items-center gap-3 bg-card rounded-full px-5 py-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-bold">ATOL</span>
          </div>
          <div>
            <p className="text-sm font-medium">ATOL Protected</p>
            <p className="text-xs text-muted-foreground">Licence No. 5744</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-full px-5 py-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-bold">IATA</span>
          </div>
          <div>
            <p className="text-sm font-medium">IATA Member</p>
            <p className="text-xs text-muted-foreground">International Air Transport</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-card rounded-full px-5 py-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xs font-bold">ABTA</span>
          </div>
          <div>
            <p className="text-sm font-medium">ABTA Member</p>
            <p className="text-xs text-muted-foreground">Association of British Travel Agents</p>
          </div>
        </div>
      </div>
    </section>
  )
}
