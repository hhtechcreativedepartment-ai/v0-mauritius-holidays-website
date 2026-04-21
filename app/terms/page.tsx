import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidget } from '@/components/chatbot-widget'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Terms & Conditions</p>
            <h1 className="text-4xl font-serif font-bold text-foreground">Booking Terms</h1>
            <p className="text-muted-foreground leading-relaxed">
              These terms outline the basis on which Mauritius Holidays Direct provides quotes, bookings, and travel
              services through this website.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Quotes and Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices and offers are subject to availability and confirmation at the time of booking. Promotional
              pricing may change without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Payments</h2>
            <p className="text-muted-foreground leading-relaxed">
              Deposits, balance due dates, and cancellation terms will be confirmed during the booking process. Your
              holiday is only secured once we have issued booking confirmation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Changes and Cancellations</h2>
            <p className="text-muted-foreground leading-relaxed">
              Changes requested after confirmation may incur supplier fees. Cancellation charges depend on the travel
              arrangements booked and how close the cancellation is to departure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For booking support or clarification on any of these terms, contact us at
              {' '}<a className="text-accent hover:underline" href="mailto:info@mauritiusholidaysdirect.co.uk">info@mauritiusholidaysdirect.co.uk</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  )
}
