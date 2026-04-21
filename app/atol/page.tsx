import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidget } from '@/components/chatbot-widget'

export default function AtolPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">ATOL Protection</p>
            <h1 className="text-4xl font-serif font-bold text-foreground">Financial Protection Information</h1>
            <p className="text-muted-foreground leading-relaxed">
              Most of the flights and flight-inclusive holidays shown on this website are financially protected by the
              ATOL scheme.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">What ATOL Means</h2>
            <p className="text-muted-foreground leading-relaxed">
              ATOL protection helps protect you if a travel company stops trading. When your booking qualifies, you
              receive an ATOL Certificate that explains what is protected and who to contact if needed.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Before You Book</h2>
            <p className="text-muted-foreground leading-relaxed">
              Not every travel service on this website is covered by ATOL. We will tell you clearly what protection
              applies before you complete your booking.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">More Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For full details about the ATOL scheme and ATOL Certificates, visit
              {' '}<a className="text-accent hover:underline" href="https://www.caa.co.uk" target="_blank" rel="noopener noreferrer">www.caa.co.uk</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  )
}
