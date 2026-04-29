import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Heart, Users, Gem, Trophy, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { categories } from '@/lib/data'

const iconMap: Record<string, React.ElementType> = {
  'all-inclusive': Sparkles,
  honeymoon: Heart,
  family: Users,
  wedding: Gem,
  golf: Trophy,
  'twin-centre': Globe,
}

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {categories.map((category) => {
          const Icon = iconMap[category.id] || Sparkles
          return (
            <Link key={category.id} href={`/holidays/${category.id}`}>
              <Card className="rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all h-full bg-card group cursor-pointer">
                <CardContent className="p-4 space-y-3">
                  <div className="relative h-24 overflow-hidden rounded-xl bg-secondary">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      sizes="(min-width: 1280px) 16vw, (min-width: 768px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-foreground group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{category.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{category.propertyCount} properties</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
