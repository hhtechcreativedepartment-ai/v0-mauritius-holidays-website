import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ChatbotWidgetLoader } from '@/components/chatbot-widget-loader'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Privacy Policy</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground">How We Use Your Information</h1>
            <p className="text-muted-foreground leading-relaxed">
              Mauritius Holidays Direct collects the information you share with us so we can respond to enquiries,
              prepare travel quotes, manage bookings, and provide customer support.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">What We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              This may include your name, phone number, email address, travel preferences, passenger details, and any
              information you provide about special requirements or occasions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">How We Use It</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your details to answer your enquiry, prepare and manage your booking, contact you about your trip,
              and send marketing updates only when you have asked to receive them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Sharing Your Data</h2>
            <p className="text-muted-foreground leading-relaxed">
              We only share relevant details with trusted travel suppliers and service partners when needed to arrange
              your holiday or fulfil your request. We do not sell your personal data.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can ask us to update, correct, or delete your information, or to stop sending marketing messages at
              any time by contacting <a className="text-accent hover:underline" href="mailto:info@mauritiusholidaysdirect.co.uk">info@mauritiusholidaysdirect.co.uk</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
      <ChatbotWidgetLoader />
    </div>
  )
}
