"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotWidget } from "@/components/chatbot-widget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  Shield
} from "lucide-react"

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak to a Mauritius expert",
    value: "0208 732 4444",
    action: "tel:02087324444",
    available: "Mon-Fri 9am-6pm, Sat 10am-4pm"
  },
  {
    icon: Phone,
    title: "Enquiries Line",
    description: "Alternative booking line",
    value: "0203 514 8222",
    action: "tel:02035148222",
    available: "Mon-Fri 9am-6pm, Sat 10am-4pm"
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "We'll respond within 24 hours",
    value: "info@mauritiusholidaysdirect.co.uk",
    action: "mailto:info@mauritiusholidaysdirect.co.uk",
    available: "24/7 - Responses within 24hrs"
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Chat with us instantly",
    value: "+44 208 732 4444",
    action: "https://wa.me/442087324444",
    available: "Mon-Sat 9am-8pm"
  },
]

const faqs = [
  {
    question: "How quickly will you respond to my enquiry?",
    answer: "We aim to respond to all enquiries within 24 hours, often much sooner. For urgent requests, please call us directly."
  },
  {
    question: "Is my booking protected?",
    answer: "Yes! All our holidays are fully ATOL protected (Licence 1234), and we're IATA and ABTA members. Your money is 100% safe."
  },
  {
    question: "Can you help with special requests?",
    answer: "Absolutely! We specialise in creating bespoke holidays. Whether it's a special anniversary, dietary requirements, or accessibility needs - we've got you covered."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes, we offer flexible payment options. Pay a deposit to secure your booking and spread the cost over monthly instalments."
  },
]

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setFormSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/beautiful-luxury-outdoor-swimming-pool-hotel-resort-GL2S39UkbjMGQbc1eaCVMXQTMgU3Qw.jpg')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 text-balance">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              Our friendly Mauritius experts are here to help plan your perfect holiday. 
              No pressure, no obligation - just honest advice.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
            {contactMethods.map((method) => (
              <a 
                key={method.title}
                href={method.action}
                className="group flex"
              >
                <Card className="flex-1 bg-background hover:shadow-lg hover:border-accent/50 transition-all flex flex-col">
                  <CardContent className="p-5 text-center flex flex-col justify-center flex-1">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                      <method.icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{method.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{method.description}</p>
                    <p className="text-accent font-medium text-sm mb-1 break-all">{method.value}</p>
                    <p className="text-xs text-muted-foreground">{method.available}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
            {/* Office Info Card */}
            <Card className="bg-primary text-primary-foreground col-span-2 lg:col-span-1 flex flex-col">
              <CardContent className="p-5 text-center flex flex-col justify-center flex-1">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-sm font-semibold mb-1">Our Office</h3>
                <p className="text-xs text-primary-foreground/80 mb-2">
                  123 Travel House, London<br />
                  SW1A 1AA, UK
                </p>
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-medium text-accent">Opening Hours</span>
                </div>
                <p className="text-xs text-primary-foreground/80">
                  Mon-Fri: 9am-6pm | Sat: 10am-4pm
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div>
              <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Send a Message</Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Fill out the form below and one of our Mauritius experts will get back to you within 24 hours.
              </p>

              {formSubmitted ? (
                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-accent" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Thank You!</h3>
                    <p className="text-muted-foreground">
                      Your message has been sent successfully. One of our Mauritius experts will be in touch within 24 hours.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-card border-border">
                  <CardContent className="p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            placeholder="John" 
                            required 
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            placeholder="Smith" 
                            required 
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            placeholder="john@example.com" 
                            required 
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            type="tel" 
                            placeholder="+44 7onal 000 000" 
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select required>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Enquiry</SelectItem>
                            <SelectItem value="quote">Holiday Quote Request</SelectItem>
                            <SelectItem value="booking">Existing Booking</SelectItem>
                            <SelectItem value="honeymoon">Honeymoon Planning</SelectItem>
                            <SelectItem value="wedding">Destination Wedding</SelectItem>
                            <SelectItem value="group">Group Booking</SelectItem>
                            <SelectItem value="complaint">Feedback/Complaint</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea 
                          id="message" 
                          placeholder="Tell us about your dream Mauritius holiday..." 
                          rows={5}
                          required
                          className="bg-background resize-none"
                        />
                      </div>

                      <div className="flex items-start gap-3 text-sm text-muted-foreground">
                        <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <p>
                          Your data is safe with us. We&apos;ll only use it to respond to your enquiry. 
                          See our <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
                        </p>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Sending..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* FAQs */}
            <div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="bg-card border-border">
                      <CardContent className="p-5">
                        <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 lg:py-28 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">Visit Us</Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Our Location
            </h2>
            <p className="text-muted-foreground">
              We&apos;re based in the heart of London. Pop in for a chat about your dream Mauritius holiday.
            </p>
          </div>
          <div className="aspect-[21/9] bg-muted rounded-2xl overflow-hidden relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542166345!2d-0.127758!3d51.507351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604c7c7eb9be3%3A0x3918653583725b56!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}
