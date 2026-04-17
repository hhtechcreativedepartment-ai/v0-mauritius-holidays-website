'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Star, Filter, SlidersHorizontal, X, MapPin, Calendar, Users, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Checkbox } from '@/components/ui/checkbox'
import { hotels, boardTypes } from '@/lib/data'

const coastOptions = ['North Coast', 'Northwest Coast', 'West Coast', 'Southwest Coast', 'South Coast', 'East Coast']
const starOptions = [5, 4, 3]
const priceRanges = [
  { label: 'Under £1,500', min: 0, max: 1500 },
  { label: '£1,500 - £2,000', min: 1500, max: 2000 },
  { label: '£2,000 - £2,500', min: 2000, max: 2500 },
  { label: 'Over £2,500', min: 2500, max: Infinity },
]

export function HotelsListing() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [selectedBoard, setSelectedBoard] = useState<string[]>([])
  const [selectedCoast, setSelectedCoast] = useState<string[]>([])
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)

  // Search parameters from hero
  const searchMonth = searchParams.get('month')
  const searchGuests = searchParams.get('guests')
  const searchType = searchParams.get('type')
  const searchAirport = searchParams.get('airport')
  const hasSearchParams = searchMonth || searchGuests || searchType || searchAirport

  const filteredHotels = useMemo(() => {
    let result = [...hotels]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(query) ||
          h.description.toLowerCase().includes(query)
      )
    }

    // Board filter
    if (selectedBoard.length > 0) {
      result = result.filter((h) => selectedBoard.includes(h.board))
    }

    // Coast filter
    if (selectedCoast.length > 0) {
      result = result.filter((h) => selectedCoast.includes(h.coast))
    }

    // Star filter
    if (selectedStars.length > 0) {
      result = result.filter((h) => selectedStars.includes(h.stars))
    }

    // Price filter
    if (selectedPrice) {
      const range = priceRanges.find((r) => r.label === selectedPrice)
      if (range) {
        result = result.filter((h) => h.price >= range.min && h.price < range.max)
      }
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.stars - a.stars)
        break
      default:
        // Featured - keep original order
        break
    }

    return result
  }, [searchQuery, sortBy, selectedBoard, selectedCoast, selectedStars, selectedPrice])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBoard([])
    setSelectedCoast([])
    setSelectedStars([])
    setSelectedPrice(null)
  }

  const hasActiveFilters =
    selectedBoard.length > 0 ||
    selectedCoast.length > 0 ||
    selectedStars.length > 0 ||
    selectedPrice !== null

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Board Type */}
      <div>
        <h4 className="font-medium mb-3">Board Type</h4>
        <div className="space-y-2">
          {boardTypes.map((board) => (
            <label key={board} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedBoard.includes(board)}
                onCheckedChange={(checked) => {
                  setSelectedBoard(
                    checked
                      ? [...selectedBoard, board]
                      : selectedBoard.filter((b) => b !== board)
                  )
                }}
              />
              <span className="text-sm">{board}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div>
        <h4 className="font-medium mb-3">Star Rating</h4>
        <div className="space-y-2">
          {starOptions.map((stars) => (
            <label key={stars} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedStars.includes(stars)}
                onCheckedChange={(checked) => {
                  setSelectedStars(
                    checked
                      ? [...selectedStars, stars]
                      : selectedStars.filter((s) => s !== stars)
                  )
                }}
              />
              <span className="text-sm flex items-center gap-1">
                {stars} Star
                <span className="flex">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                  ))}
                </span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Coast */}
      <div>
        <h4 className="font-medium mb-3">Location</h4>
        <div className="space-y-2">
          {coastOptions.map((coast) => (
            <label key={coast} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCoast.includes(coast)}
                onCheckedChange={(checked) => {
                  setSelectedCoast(
                    checked
                      ? [...selectedCoast, coast]
                      : selectedCoast.filter((c) => c !== coast)
                  )
                }}
              />
              <span className="text-sm">{coast}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map((range) => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedPrice === range.label}
                onCheckedChange={(checked) => {
                  setSelectedPrice(checked ? range.label : null)
                }}
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <Button variant="outline" className="w-full" onClick={clearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      {/* Search Results Summary */}
      {hasSearchParams && (
        <div className="mb-6 p-4 rounded-2xl bg-accent/10 border border-accent/20">
          <p className="text-sm font-medium text-foreground mb-2">Your Search</p>
          <div className="flex flex-wrap gap-3">
            {searchMonth && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 text-accent" />
                <span>{searchMonth}</span>
              </div>
            )}
            {searchGuests && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="w-4 h-4 text-accent" />
                <span>{searchGuests.replace(/-/g, ' ').replace(/(\d+)/g, '$1 ')}</span>
              </div>
            )}
            {searchType && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-accent" />
                <span className="capitalize">{searchType.replace(/-/g, ' ')}</span>
              </div>
            )}
            {searchAirport && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Plane className="w-4 h-4 text-accent" />
                <span>{searchAirport}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <Badge variant="outline" className="rounded-full px-4 py-1 mb-3">
          {filteredHotels.length} Hotels Found
        </Badge>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {hasSearchParams ? 'Search Results' : 'Mauritius Hotels & Resorts'}
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          {hasSearchParams 
            ? `Showing ${filteredHotels.length} hotels matching your criteria. All packages include flights, transfers and accommodation.`
            : 'Discover our hand-picked collection of luxury hotels in Mauritius. All packages include flights, transfers and accommodation.'
          }
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search hotels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-xl h-11"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] rounded-xl h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Star Rating</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filter Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden rounded-xl h-11 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {selectedBoard.length + selectedCoast.length + selectedStars.length + (selectedPrice ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Hotels</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedBoard.map((board) => (
            <Badge key={board} variant="secondary" className="rounded-full gap-1 pr-1">
              {board}
              <button
                onClick={() => setSelectedBoard(selectedBoard.filter((b) => b !== board))}
                className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedStars.map((stars) => (
            <Badge key={stars} variant="secondary" className="rounded-full gap-1 pr-1">
              {stars} Star
              <button
                onClick={() => setSelectedStars(selectedStars.filter((s) => s !== stars))}
                className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedCoast.map((coast) => (
            <Badge key={coast} variant="secondary" className="rounded-full gap-1 pr-1">
              {coast}
              <button
                onClick={() => setSelectedCoast(selectedCoast.filter((c) => c !== coast))}
                className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedPrice && (
            <Badge variant="secondary" className="rounded-full gap-1 pr-1">
              {selectedPrice}
              <button
                onClick={() => setSelectedPrice(null)}
                className="ml-1 hover:bg-secondary-foreground/10 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          <button
            onClick={clearFilters}
            className="text-sm text-muted-foreground hover:text-foreground underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <Card className="rounded-2xl border-0 shadow-sm sticky top-24">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              <FilterContent />
            </CardContent>
          </Card>
        </aside>

        {/* Hotels Grid */}
        <div className="flex-1">
          {filteredHotels.length === 0 ? (
            <Card className="rounded-2xl border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No hotels match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="rounded-2xl border-0 overflow-hidden shadow-md bg-card">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="rounded-full bg-accent text-accent-foreground">
                          {hotel.badge}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {Array.from({ length: hotel.stars }).map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                              ))}
                            </div>
                            <h3 className="text-xl font-semibold">{hotel.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <MapPin className="w-4 h-4" />
                              {hotel.coast}
                              <span className="text-border">|</span>
                              {hotel.board}
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground mt-4 leading-relaxed line-clamp-2">
                          {hotel.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {hotel.highlights.slice(0, 3).map((highlight) => (
                            <Badge key={highlight} variant="outline" className="rounded-full text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-end justify-between mt-6 pt-4 border-t border-border">
                        <div>
                          <p className="text-xs text-muted-foreground">{hotel.period}</p>
                          <p className="text-xs text-muted-foreground line-through">
                            &pound;{hotel.originalPrice.toLocaleString()}pp
                          </p>
                          <p className="text-2xl font-semibold">
                            &pound;{hotel.price.toLocaleString()}
                            <span className="text-sm font-normal text-muted-foreground">pp</span>
                          </p>
                          <p className="text-xs text-accent font-medium">
                            Save &pound;{((hotel.originalPrice - hotel.price) * 2).toLocaleString()} per couple
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="rounded-full" asChild>
                            <Link href={`/hotels/${hotel.slug}`}>View Details</Link>
                          </Button>
                          <Button className="rounded-full" asChild>
                            <Link href={`/contact?hotel=${hotel.slug}`}>Get Quote</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
