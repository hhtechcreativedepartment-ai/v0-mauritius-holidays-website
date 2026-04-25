import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HotelDetail } from '@/components/hotels/hotel-detail'
import { ChatbotWidgetLoader } from '@/components/chatbot-widget-loader'
import { hotels } from '@/lib/data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const hotel = hotels.find((h) => h.slug === slug)
  
  if (!hotel) {
    return {
      title: 'Hotel Not Found | Mauritius Holidays Direct',
    }
  }

  return {
    title: `${hotel.name} | Mauritius Holidays Direct`,
    description: hotel.description,
  }
}

export function generateStaticParams() {
  return hotels.map((hotel) => ({
    slug: hotel.slug,
  }))
}

export default async function HotelPage({ params }: Props) {
  const { slug } = await params
  const hotel = hotels.find((h) => h.slug === slug)

  if (!hotel) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <HotelDetail hotel={hotel} />
      </main>
      <Footer />
      <ChatbotWidgetLoader />
    </>
  )
}
