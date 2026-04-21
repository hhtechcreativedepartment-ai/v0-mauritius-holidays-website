"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Users, 
  Award, 
  Globe, 
  Heart, 
  Shield, 
  Phone,
  MapPin,
  Calendar,
  Star,
  CheckCircle2
} from "lucide-react"

const stats = [
  { number: "25+", label: "Years of Excellence", icon: Calendar },
  { number: "50,000+", label: "Happy Travellers", icon: Users },
  { number: "150+", label: "Partner Hotels", icon: Globe },
  { number: "4.9", label: "Customer Rating", icon: Star },
]

const values = [
  {
    icon: Heart,
    title: "Passion for Mauritius",
    description: "Our love for this beautiful island shines through in every holiday we create. We've explored every corner so you don't have to."
  },
  {
    icon: Shield,
    title: "Complete Protection",
    description: "ATOL, IATA, and ABTA protected. Your money and holiday are completely safe with us, giving you total peace of mind."
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognised as Mauritius specialists by the travel industry. Our expertise ensures your perfect island escape."
  },
  {
    icon: Users,
    title: "Personal Touch",
    description: "Real humans who care. No call centres, no scripts - just friendly experts who listen and deliver."
  },
]

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Managing Director",
    bio: "25+ years crafting perfect Mauritius holidays. Visited the island over 100 times.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "James Thompson",
    role: "Head of Luxury Travel",
    bio: "Specialist in honeymoons and luxury escapes. Personal relationships with every 5-star hotel.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Emma Williams",
    role: "Family Holiday Expert",
    bio: "Mother of three who knows exactly what families need for the perfect Mauritius adventure.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    name: "David Chen",
    role: "Golf & Sports Travel",
    bio: "Former golf professional. Designs bespoke golf packages for every handicap.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
]

const milestones = [
  { year: "1999", event: "Founded as specialist Mauritius tour operator" },
  { year: "2005", event: "Reached 10,000 happy travellers milestone" },
  { year: "2010", event: "Won first 'Best Mauritius Specialist' award" },
  { year: "2015", event: "Expanded to include Seychelles & Maldives" },
  { year: "2020", event: "Launched new digital booking platform" },
  { year: "2024", event: "Celebrating 25 years of excellence" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beautiful-outdoor-view-with-umbrella-chair-around-swimming-pool-luxury-hotel-64IgOh9d0eMgD56IF9CdZqJRnBSb1O.jpg')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
              Since 1999
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 text-balance">
              Your Mauritius Holiday Specialists
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
              For over 25 years, we&apos;ve been crafting unforgettable Mauritius holidays. 
              Our passion, expertise, and personal service make us the UK&apos;s trusted choice 
              for this beautiful Indian Ocean paradise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                <Link href="/hotels">View Our Hotels</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                A Love Affair with Mauritius
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  It all started with a honeymoon in 1998. Sarah Mitchell fell so deeply in love 
                  with Mauritius that she knew she had to share this paradise with others. 
                  A year later, Mauritius Holidays Direct was born.
                </p>
                <p>
                  What began as a small, passionate operation has grown into the UK&apos;s leading 
                  Mauritius specialist. But we&apos;ve never lost that personal touch. Every member 
                  of our team has visited Mauritius multiple times. We don&apos;t just sell holidays 
                  - we share experiences we know and love.
                </p>
                <p>
                  Today, we&apos;re proud to have helped over 50,000 travellers discover their own 
                  Mauritius story. From honeymoons to family adventures, golf escapes to destination 
                  weddings, we craft every holiday with the same care and attention that started it all.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80" 
                  alt="Mauritius beach paradise"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-8 h-8 text-accent" />
                  <span className="font-semibold text-foreground">Award Winning</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Recognised as UK&apos;s Best Mauritius Specialist 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re not just another travel agency. Here&apos;s why thousands choose us for their Mauritius escape.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Meet Your Mauritius Experts
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real people who genuinely care about your holiday. No scripts, no call centres - just friendly expertise.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-accent text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              25 Years of Excellence
            </h2>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              From a small start-up to the UK&apos;s leading Mauritius specialists - our journey continues.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-primary-foreground/20 -translate-x-1/2" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}>
                      <div className="bg-primary-foreground/10 rounded-lg p-4 inline-block">
                        <span className="text-accent font-bold text-lg">{milestone.year}</span>
                        <p className="text-primary-foreground/80 text-sm mt-1">{milestone.event}</p>
                      </div>
                    </div>
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent -translate-x-1/2" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Fully Protected</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Book With Complete Confidence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your holiday is fully protected by industry-leading accreditations.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
            {['ATOL Protected', 'IATA Member', 'ABTA Bonded', 'Trustpilot Excellent'].map((accreditation) => (
              <div key={accreditation} className="flex items-center gap-3 bg-card px-6 py-4 rounded-lg border border-border">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span className="font-medium text-foreground">{accreditation}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Ready to Start Your Mauritius Journey?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our friendly experts are here to help create your perfect holiday. 
            No obligation, just honest advice from people who know and love Mauritius.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/quote">Get a Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="tel:02087324444">
                <Phone className="w-4 h-4" />
                Call Us Today
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Based in UK
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Mon-Fri 9am-6pm, Sat 10am-4pm
            </span>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}
