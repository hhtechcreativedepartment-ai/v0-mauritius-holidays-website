import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { brand, categories } from '@/lib/data'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-header-KfdQWrgO3VMSHZRjpIt5bYHlIEhbCU.webp"
                alt="Mauritius Holidays Direct"
                width={200}
                height={40}
                sizes="200px"
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-sm leading-7 text-primary-foreground/70">
              Award-winning Mauritius holiday specialists with first-hand destination knowledge. 
              ATOL, IATA & ABTA protected for complete peace of mind.
            </p>
            
            {/* Part of THD */}
            <div className="pt-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/THD-Logo-rQ7YhEEy1pDvptmhiEtGni0ICBnAha.png"
                alt="Part of Tropical Holidays Direct"
                width={176}
                height={48}
                sizes="176px"
                className="h-12 w-auto brightness-0 invert opacity-80"
              />
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-ectSacWQw1bA2fJRel7kkWQ5KDKpVP.webp"
                alt="ATOL Protected 5744"
                width={72}
                height={56}
                sizes="72px"
                className="h-14 w-auto brightness-0 invert"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-7VpDM2SkSFYocinHv33JfXJFLmdL0A.webp"
                alt="ABTA J5618/W5490"
                width={84}
                height={48}
                sizes="84px"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
          </div>

          {/* Pages */}
          <div>
            <p className="font-semibold mb-4">Quick Links</p>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <Link href="/" className="block hover:text-primary-foreground transition-colors">Home</Link>
              <Link href="/hotels" className="block hover:text-primary-foreground transition-colors">Hotels</Link>
              <Link href="/offers" className="block hover:text-primary-foreground transition-colors">Special Offers</Link>
              <Link href="/explore" className="block hover:text-primary-foreground transition-colors">Explore Mauritius</Link>
              <Link href="/why-us" className="block hover:text-primary-foreground transition-colors">Why Book With Us</Link>
              <Link href="/about" className="block hover:text-primary-foreground transition-colors">About Us</Link>
              <Link href="/contact" className="block hover:text-primary-foreground transition-colors">Contact</Link>
            </div>
          </div>

          {/* Holiday Types */}
          <div>
            <p className="font-semibold mb-4">Holiday Types</p>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              {categories.map((category) => (
                <Link 
                  key={category.id}
                  href={`/holidays/${category.id}`}
                  className="block hover:text-primary-foreground transition-colors"
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-semibold mb-4">Contact Us</p>
            <div className="space-y-4 text-sm">
              <a 
                href="tel:02087324444"
                className="flex items-center gap-3 text-primary-foreground hover:text-accent transition-colors break-all"
              >
                <Phone className="w-4 h-4 text-accent" />
                <div>
                  <span className="block font-semibold text-lg">0208 732 4444</span>
                  <span className="text-xs text-primary-foreground/60">Main Line</span>
                </div>
              </a>
              <a 
                href="tel:02035148222"
                className="flex items-center gap-3 text-primary-foreground hover:text-accent transition-colors break-all"
              >
                <Phone className="w-4 h-4 text-accent" />
                <div>
                  <span className="block font-semibold">0203 514 8222</span>
                  <span className="text-xs text-primary-foreground/60">Enquiries</span>
                </div>
              </a>
              <a 
                href={`mailto:${brand.email}`}
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-4 h-4 text-accent" />
                <span className="break-all">{brand.email}</span>
              </a>
              <div className="flex items-start gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>{brand.address}</span>
              </div>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <Clock className="w-4 h-4 text-accent" />
                <span>{brand.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end md:gap-6">
              <Link href="/terms" className="hover:text-primary-foreground transition-colors">Terms & Conditions</Link>
              <Link href="/privacy" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link>
              <Link href="/atol" className="hover:text-primary-foreground transition-colors">ATOL Protection</Link>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/40 mt-4 leading-relaxed">
            Most of the flights and flight-inclusive holidays on this website are financially protected by the ATOL scheme. 
            But ATOL protection does not apply to all holiday and travel services listed on this website. 
            This website will provide you with information on the protection that applies in the case of each holiday 
            and travel service offered before you make your booking. For more information about financial protection 
            and the ATOL Certificate go to: www.caa.co.uk
          </p>
        </div>
      </div>
    </footer>
  )
}
