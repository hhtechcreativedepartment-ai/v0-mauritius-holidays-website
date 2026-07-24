import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotWidgetLoader } from "@/components/chatbot-widget-loader"
import { RequestQuoteForm } from "@/components/forms/request-quote-form"
import { Clock, CreditCard, Shield, Star } from "lucide-react"

const benefits = [
  { icon: Clock, text: "Quote within 24 hours" },
  { icon: Star, text: "Expert recommendations" },
  { icon: Shield, text: "ATOL protected" },
  { icon: CreditCard, text: "Flexible payments" },
]

export default function QuotePage() {
  return <div className="min-h-screen bg-background">
    <Header />
    <main>
      <section className="relative overflow-hidden bg-primary py-20 lg:py-24">
        <div className="absolute inset-0 bg-[url('/images/hero/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg')] bg-cover bg-center opacity-25" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="mb-4 font-semibold uppercase tracking-[0.18em] text-sky-300">Free &amp; No Obligation</p>
          <h1 className="font-serif text-4xl font-bold text-white md:text-6xl">Get Your Personalised Quote</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">Tell us about your dream Mauritius holiday and our experts will prepare a bespoke quote.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-5">{benefits.map(({ icon: Icon, text }) => <span key={text} className="flex items-center gap-2 text-sm text-white/85"><Icon className="h-4 w-4 text-sky-300" />{text}</span>)}</div>
        </div>
      </section>
      <section className="bg-sky-50/70 py-14 lg:py-20"><div className="container mx-auto max-w-5xl px-4"><RequestQuoteForm /></div></section>
    </main>
    <Footer />
    <ChatbotWidgetLoader />
  </div>
}
