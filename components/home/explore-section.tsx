import Link from 'next/link'
import { ChevronRight, Palmtree, Sun, Waves, Utensils, Camera, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const exploreCards = [
  { title: 'Beaches & Lagoons', icon: Waves, description: 'Powder-soft white sand and crystal-clear waters' },
  { title: 'Climate & Weather', icon: Sun, description: 'Year-round tropical warmth and sunshine' },
  { title: 'Spa & Wellness', icon: Heart, description: 'World-class resort spas and treatments' },
  { title: 'Culture & History', icon: Camera, description: 'Rich multicultural heritage to discover' },
  { title: 'Cuisine & Dining', icon: Utensils, description: 'Fusion flavours from three continents' },
  { title: 'Activities', icon: Palmtree, description: 'Water sports, golf, nature and adventure' },
]

export function ExploreSection() {
  return (
    <section className="bg-primary text-primary-foreground py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="rounded-full px-4 py-1 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                Explore Mauritius
              </Badge>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
                Discover Paradise
              </h2>
              <p className="text-primary-foreground/70 leading-relaxed max-w-xl">
                &ldquo;You gather the idea that Mauritius was made first and then heaven was copied after Mauritius.&rdquo; — Mark Twain
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {exploreCards.map((item) => (
                <Link 
                  key={item.title}
                  href="/explore"
                  className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 flex items-center gap-4 hover:bg-primary-foreground/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-primary-foreground/60 mt-0.5">{item.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-accent shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>

            <Button size="lg" className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90" asChild>
              <Link href="/explore">Explore Island Guide</Link>
            </Button>
          </div>

          {/* Right Card */}
          <Card className="rounded-3xl border-primary-foreground/10 bg-primary-foreground/5 shadow-2xl">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Palmtree className="w-5 h-5 text-accent" />
                </div>
                <p className="font-semibold text-primary-foreground">Why Mauritius?</p>
              </div>
              <div className="space-y-4 text-primary-foreground/80 leading-relaxed text-sm">
                <p>
                  Warm sparkling sapphire seas, sandy white beaches, and tropical temperatures 
                  make this holiday dream a remarkable reality. You have to pinch yourself to 
                  make sure you&apos;re really here.
                </p>
                <p>
                  This enchanting island with its rich colours, breathtaking beaches, fascinating 
                  interwoven cultures and exotic tastes makes Mauritius one of the most remarkable 
                  holiday experiences of a lifetime.
                </p>
                <p>
                  Named by the Dutch after Prince Maurice van Nassau, this beautiful island 
                  transcends all your expectations with its bewitching beauty and compels you 
                  to return to its shores repeatedly.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-primary-foreground/10">
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">12hr</p>
                  <p className="text-xs text-primary-foreground/60 mt-1">Flight Time</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">25°C</p>
                  <p className="text-xs text-primary-foreground/60 mt-1">Avg. Temp</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-accent">+4hr</p>
                  <p className="text-xs text-primary-foreground/60 mt-1">Time Zone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
