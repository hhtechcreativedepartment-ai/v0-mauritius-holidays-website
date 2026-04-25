'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { brand, navItems, categories } from '@/lib/data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Top Bar - Trust Badges */}
      <div className="bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Trustpilot */}
            <a href="https://www.trustpilot.com" target="_blank" rel="noopener noreferrer" className="shrink-0 self-center sm:self-auto">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Header_trustpilot-Q7ZlVwiqaXh22Zc1UPaQGj6XMeBesl.webp"
                alt="Trustpilot - 5.0 Excellent"
                width={180}
                height={40}
                sizes="(max-width: 640px) 120px, 180px"
                className="h-8 w-auto sm:h-10"
              />
            </a>
            
            {/* THD Logo - Part of */}
            <div className="hidden sm:block shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/THD-Logo-rQ7YhEEy1pDvptmhiEtGni0ICBnAha.png"
                alt="Part of Tropical Holidays Direct"
                width={176}
                height={48}
                sizes="176px"
                className="h-10 w-auto sm:h-12"
              />
            </div>
            
            {/* Phone Number */}
            <a 
              href="tel:02087324444" 
              className="flex items-center justify-center gap-2 shrink-0 sm:justify-end"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Phone className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xs text-muted-foreground leading-none">Call now to book your holiday</p>
                <p className="text-lg font-bold text-primary leading-tight">0208 732 4444</p>
              </div>
              <span className="sm:hidden text-sm font-bold text-primary">0208 732 4444</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-0">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-header-KfdQWrgO3VMSHZRjpIt5bYHlIEhbCU.webp"
              alt="Mauritius Holidays Direct"
              width={240}
              height={48}
              priority
              sizes="(max-width: 640px) 160px, 240px"
              className="h-9 w-auto sm:h-12"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-colors",
                  pathname === item.href
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-full transition-colors">
                  Holidays <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/holidays/${category.id}`} className="flex flex-col items-start">
                      <span className="font-medium">{category.title}</span>
                      <span className="text-xs text-muted-foreground">{category.propertyCount} properties</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="outline" className="rounded-full gap-2" asChild>
              <a href="tel:02035148222">
                <Phone className="w-4 h-4" />
                0203 514 8222
              </a>
            </Button>
            <Button className="rounded-full" asChild>
              <Link href="/contact">Request Quote</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden shrink-0 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2 max-h-[calc(100vh-7rem)] overflow-y-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                    pathname === item.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                <p className="px-4 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Holiday Types
                </p>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/holidays/${category.id}`}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-xl transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {category.title}
                    <span className="text-xs text-muted-foreground ml-2">
                      ({category.propertyCount})
                    </span>
                  </Link>
                ))}
              </div>
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full rounded-full gap-2" asChild>
                  <a href="tel:02035148222">
                    <Phone className="w-4 h-4" />
                    0203 514 8222
                  </a>
                </Button>
                <Button className="w-full rounded-full" asChild>
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    Request Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
