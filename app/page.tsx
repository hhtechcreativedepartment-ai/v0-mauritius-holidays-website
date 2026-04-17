import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroSection } from '@/components/home/hero-section'
import { CategoriesSection } from '@/components/home/categories-section'
import { FeaturedHotelsSection } from '@/components/home/featured-hotels-section'
import { TrustSection } from '@/components/home/trust-section'
import { ReviewsSection } from '@/components/home/reviews-section'
import { ExploreSection } from '@/components/home/explore-section'
import { NewsletterSection } from '@/components/home/newsletter-section'
import { ChatbotWidget } from '@/components/chatbot-widget'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedHotelsSection />
        <TrustSection />
        <ReviewsSection />
        <ExploreSection />
        <NewsletterSection />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  )
}
