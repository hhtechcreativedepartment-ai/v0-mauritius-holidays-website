"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatbotWidgetLoader } from "@/components/chatbot-widget-loader"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { brand } from "@/lib/data"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { 
  CheckCircle2,
  Shield,
  Clock,
  Phone,
  Star,
  Users,
  Plane,
  Calendar,
  CreditCard
} from "lucide-react"

const benefits = [
  { icon: Clock, text: "Quote within 24 hours" },
  { icon: Star, text: "Expert recommendations" },
  { icon: Shield, text: "ATOL protected" },
  { icon: CreditCard, text: "Flexible payments" },
]

const holidayTypes = [
  "All Inclusive",
  "Honeymoon",
  "Family Holiday",
  "Destination Wedding",
  "Golf Holiday",
  "Twin Centre",
  "Luxury Escape",
  "Adventure",
]

export default function QuotePage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setFormSubmitted(true)
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1796325354619cc8226f7866.48916407-b2Zopl9ymzYUwEPOXaqt6qbgotP0o5.jpg')] bg-cover bg-center opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/50 to-primary/40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-center mx-auto">
            <Badge className="mb-6 bg-accent/20 text-accent border-accent/30 hover:bg-accent/30">
              Free & No Obligation
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 text-balance">
              Get Your Personalised Quote
            </h1>
            <p className="text-xl text-primary-foreground/80 leading-relaxed mb-8">
              Tell us about your dream Mauritius holiday and our experts will create a bespoke 
              quote tailored perfectly to you.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2 text-primary-foreground/80">
                  <benefit.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 max-w-4xl">
          {formSubmitted ? (
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-accent" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Thank You for Your Request!
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  One of our Mauritius experts will review your requirements and send you a 
                  personalised quote within 24 hours.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild variant="outline">
                    <a href="/hotels">Browse Hotels</a>
                  </Button>
                  <Button asChild className="gap-2">
                    <a href={`tel:${brand.phone.replace(/\s/g, '')}`}>
                      <Phone className="w-4 h-4" />
                      Call Us Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Progress Steps */}
              <div className="flex items-center justify-center gap-4 mb-12">
                {[
                  { num: 1, label: "Trip Details" },
                  { num: 2, label: "Preferences" },
                  { num: 3, label: "Your Details" },
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step >= s.num 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                    </div>
                    <span className={`ml-2 text-sm font-medium hidden sm:inline ${
                      step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {s.label}
                    </span>
                    {i < 2 && (
                      <div className={`w-12 h-0.5 mx-4 ${
                        step > s.num ? 'bg-accent' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-8 md:p-10">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Trip Details */}
                    {step === 1 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                            Trip Details
                          </h2>
                          <p className="text-muted-foreground">
                            Tell us when and how long you&apos;d like to visit Mauritius.
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="departureDate" className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-accent" />
                              Preferred Departure Date
                            </Label>
                            <Input 
                              id="departureDate" 
                              type="date" 
                              className="bg-background"
                            />
                            <p className="text-xs text-muted-foreground">
                              Don&apos;t worry if you&apos;re flexible - we&apos;ll find the best dates
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration" className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-accent" />
                              Duration (Nights)
                            </Label>
                            <Select>
                              <SelectTrigger className="bg-background">
                                <SelectValue placeholder="Select duration" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="7">7 nights</SelectItem>
                                <SelectItem value="10">10 nights</SelectItem>
                                <SelectItem value="14">14 nights</SelectItem>
                                <SelectItem value="custom">Custom duration</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="adults" className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-accent" />
                              Adults
                            </Label>
                            <Select defaultValue="2">
                              <SelectTrigger className="bg-background">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                  <SelectItem key={n} value={String(n)}>{n} Adult{n > 1 ? 's' : ''}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="children">Children (Under 12)</Label>
                            <Select defaultValue="0">
                              <SelectTrigger className="bg-background">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {[0, 1, 2, 3, 4].map(n => (
                                  <SelectItem key={n} value={String(n)}>{n} Child{n !== 1 ? 'ren' : ''}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="departureAirport" className="flex items-center gap-2">
                            <Plane className="w-4 h-4 text-accent" />
                            Departure Airport
                          </Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select airport" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="LHR">London Heathrow</SelectItem>
                              <SelectItem value="LGW">London Gatwick</SelectItem>
                              <SelectItem value="MAN">Manchester</SelectItem>
                              <SelectItem value="BHX">Birmingham</SelectItem>
                              <SelectItem value="EDI">Edinburgh</SelectItem>
                              <SelectItem value="GLA">Glasgow</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex justify-end">
                          <Button type="button" onClick={nextStep} size="lg">
                            Continue
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Preferences */}
                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                            Your Preferences
                          </h2>
                          <p className="text-muted-foreground">
                            Help us understand what kind of holiday you&apos;re looking for.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <Label>Holiday Type (Select all that apply)</Label>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {holidayTypes.map((type) => (
                              <div key={type} className="flex items-center space-x-3 bg-muted/50 p-3 rounded-lg hover:bg-muted transition-colors">
                                <Checkbox id={type} />
                                <label htmlFor={type} className="text-sm font-medium cursor-pointer">
                                  {type}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="budget">Budget Per Person</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1500">Up to GBP 1,500</SelectItem>
                              <SelectItem value="2000">GBP 1,500 - GBP 2,000</SelectItem>
                              <SelectItem value="2500">GBP 2,000 - GBP 2,500</SelectItem>
                              <SelectItem value="3000">GBP 2,500 - GBP 3,000</SelectItem>
                              <SelectItem value="4000">GBP 3,000 - GBP 4,000</SelectItem>
                              <SelectItem value="5000">GBP 4,000+</SelectItem>
                              <SelectItem value="flexible">Flexible / Surprise me</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="starRating">Preferred Star Rating</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select preferred rating" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 Star</SelectItem>
                              <SelectItem value="4">4 Star</SelectItem>
                              <SelectItem value="5">5 Star</SelectItem>
                              <SelectItem value="any">Any - Show me options</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="specialRequirements">Special Requirements or Requests</Label>
                          <Textarea 
                            id="specialRequirements" 
                            placeholder="Tell us about any special occasions, dietary requirements, accessibility needs, or specific hotels you're interested in..." 
                            rows={4}
                            className="bg-background resize-none"
                          />
                        </div>

                        <div className="flex justify-between">
                          <Button type="button" variant="outline" onClick={prevStep} size="lg">
                            Back
                          </Button>
                          <Button type="button" onClick={nextStep} size="lg">
                            Continue
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Your Details */}
                    {step === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                            Your Details
                          </h2>
                          <p className="text-muted-foreground">
                            Almost there! Just need a few details to send your personalised quote.
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
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

                        <div className="grid sm:grid-cols-2 gap-6">
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
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              placeholder="+44 20 8732 4444" 
                              required
                              className="bg-background"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="contactPreference">Preferred Contact Method</Label>
                          <Select>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="How would you like us to contact you?" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="phone">Phone Call</SelectItem>
                              <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              <SelectItem value="any">Any method</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                          <Checkbox id="marketing" />
                          <div className="grid gap-1.5 leading-none">
                            <label htmlFor="marketing" className="text-sm font-medium cursor-pointer">
                              Keep me updated with special offers
                            </label>
                            <p className="text-xs text-muted-foreground">
                              Receive exclusive deals and travel inspiration. Unsubscribe anytime.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm text-muted-foreground">
                          <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                          <p>
                            Your data is safe with us. We&apos;ll only use it to process your quote request. 
                            See our <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <Button type="button" variant="outline" onClick={prevStep} size="lg">
                            Back
                          </Button>
                          <Button 
                            type="submit" 
                            size="lg" 
                            className="bg-accent hover:bg-accent/90 text-accent-foreground"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Submitting..." : "Get My Free Quote"}
                          </Button>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </>
          )}

          {/* Trust Indicators */}
          {!formSubmitted && (
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground mb-4">Trusted by over 50,000 happy travellers</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {['ATOL Protected', 'IATA Member', 'ABTA Bonded'].map((badge) => (
                  <div key={badge} className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <ChatbotWidgetLoader />
    </div>
  )
}

