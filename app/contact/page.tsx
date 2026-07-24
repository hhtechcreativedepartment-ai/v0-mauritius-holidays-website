import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotWidgetLoader } from "@/components/chatbot-widget-loader"
import { RequestQuoteForm } from "@/components/forms/request-quote-form"
import { Card, CardContent } from "@/components/ui/card"
import { brand } from "@/lib/data"
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react"

const contactMethods = [
  { icon: Phone, title: "Call Us", description: "Speak to a Mauritius expert", value: brand.phone, href: `tel:${brand.phone.replace(/\s/g, "")}` },
  { icon: Mail, title: "Email Us", description: "Responses within 24 hours", value: brand.email, href: `mailto:${brand.email}` },
  { icon: MessageCircle, title: "WhatsApp", description: "Chat with our team", value: `+44 ${brand.phone}`, href: "https://wa.me/442087324444" },
]

const faqs = [
  ["How quickly will you respond to my enquiry?", "We aim to respond to all enquiries within 24 hours, often much sooner."],
  ["Is my booking protected?", "Yes. Our flight-inclusive holidays are ATOL protected."],
  ["Can you help with special requests?", "Absolutely. Add anniversaries, dietary, room or accessibility requirements in the form."],
  ["Do you offer payment plans?", "Flexible payment options may be available; our experts will explain them with your quote."],
]

export default function ContactPage({ searchParams }: { searchParams: Promise<{ hotel?: string }> }) {
  return <div className="min-h-screen bg-background">
    <Header />
    <main>
      <section className="relative overflow-hidden bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="font-semibold uppercase tracking-[0.18em] text-sky-300">Get in Touch</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-white md:text-6xl">We&apos;d Love to Hear From You</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">Our friendly Mauritius experts are here to help plan your perfect holiday.</p>
        </div>
      </section>
      <section className="border-b bg-white py-10">
        <div className="container mx-auto grid gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map(({ icon: Icon, ...method }) => <a key={method.title} href={method.href}><Card className="h-full transition hover:border-sky-300 hover:shadow-md"><CardContent className="p-5 text-center"><Icon className="mx-auto mb-3 h-7 w-7 text-sky-600" /><h2 className="font-semibold">{method.title}</h2><p className="mt-1 text-xs text-muted-foreground">{method.description}</p><p className="mt-2 break-all text-sm font-medium text-primary">{method.value}</p></CardContent></Card></a>)}
          <Card className="h-full bg-primary text-white"><CardContent className="p-5 text-center"><MapPin className="mx-auto mb-3 h-7 w-7 text-sky-300" /><h2 className="font-semibold">Our Office</h2><p className="mt-2 text-sm text-white/75">{brand.address}</p><p className="mt-2 flex items-center justify-center gap-1 text-xs text-white/75"><Clock className="h-3 w-3" />{brand.hours}</p></CardContent></Card>
        </div>
      </section>
      <section className="bg-sky-50/70 py-14 lg:py-20">
        <div className="container mx-auto grid items-start gap-12 px-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(300px,.6fr)]">
          <ContactQuote searchParams={searchParams} />
          <aside><h2 className="mb-5 font-serif text-2xl font-bold text-primary">Frequently Asked Questions</h2><div className="space-y-4">{faqs.map(([q, a]) => <Card key={q}><CardContent className="p-5"><h3 className="font-semibold">{q}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a}</p></CardContent></Card>)}</div></aside>
        </div>
      </section>
    </main>
    <Footer />
    <ChatbotWidgetLoader />
  </div>
}

async function ContactQuote({ searchParams }: { searchParams: Promise<{ hotel?: string }> }) {
  const { hotel = "" } = await searchParams
  return <RequestQuoteForm defaultHotel={hotel} />
}
