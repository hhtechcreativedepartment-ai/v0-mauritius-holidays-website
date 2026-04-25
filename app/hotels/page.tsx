import { Metadata } from 'next'
import { Suspense } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HotelsListing } from '@/components/hotels/hotels-listing'
import { ChatbotWidgetLoader } from '@/components/chatbot-widget-loader'
import { Spinner } from '@/components/ui/spinner'

export const metadata: Metadata = {
  title: 'Mauritius Hotels | Luxury Resorts & Beach Hotels | Mauritius Holidays Direct',
  description: 'Browse our collection of luxury Mauritius hotels. From 5-star beachfront resorts to boutique properties. All-inclusive, half board and B&B options available.',
}

function HotelsLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <Spinner className="w-8 h-8 mx-auto mb-4 text-accent" />
        <p className="text-muted-foreground">Loading hotels...</p>
      </div>
    </div>
  )
}

export default function HotelsPage() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<HotelsLoadingFallback />}>
          <HotelsListing />
        </Suspense>
      </main>
      <Footer />
      <ChatbotWidgetLoader />
    </>
  )
}
