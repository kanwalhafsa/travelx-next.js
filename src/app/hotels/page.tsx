
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, MapPin, CalendarIcon, Users, Star, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

interface HotelType {
  id: number
  name: string
  location: string
  rating: number
  reviews: number
  price: number
  image: string
  amenities: string[]
  description: string
}

interface BookingData {
  type: string
  title: string
  price: number
  destination: string
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<HotelType[]>([])
  const [loading, setLoading] = useState(false)
  const [searchForm, setSearchForm] = useState({
    destination: "",
    checkin: undefined as Date | undefined,
    checkout: undefined as Date | undefined,
    guests: "2",
  })

  const mockHotels: HotelType[] = [
    {
      id: 1,
      name: "Grand Luxury Resort",
      location: "Bali, Indonesia",
      rating: 4.8,
      reviews: 1247,
      price: 299,
      image: "/images/hotel1.jpeg?height=200&width=300",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
      description: "Luxury beachfront resort with stunning ocean views",
    },
    {
      id: 2,
      name: "City Center Hotel",
      location: "Tokyo, Japan",
      rating: 4.6,
      reviews: 892,
      price: 189,
      image: "/images/hotel2.jpeg?height=200&width=300",
      amenities: ["Free WiFi", "Gym", "Business Center", "Parking"],
      description: "Modern hotel in the heart of Tokyo",
    },
    {
      id: 3,
      name: "Boutique Paradise",
      location: "Santorini, Greece",
      rating: 4.9,
      reviews: 567,
      price: 450,
      image: "/images/hotel3.jpeg?height=200&width=300",
      amenities: ["Free WiFi", "Pool", "Breakfast", "Concierge"],
      description: "Charming boutique hotel with caldera views",
    },
  ]

  const handleSearch = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setHotels(mockHotels)
    setLoading(false)
  }

  const handleBookHotel = (hotel: HotelType) => {
    const bookingData: BookingData = {
      type: "hotel",
      title: hotel.name,
      price: hotel.price,
      destination: hotel.location,
    }

    const params = new URLSearchParams({
      type: bookingData.type,
      title: bookingData.title,
      price: bookingData.price.toString(),
      destination: bookingData.destination,
    })
    window.location.href = `/checkout?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Search Hotels</h1>
          <p className="text-lg text-gray-600">Find and book the perfect accommodation for your stay</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Where are you going?"
                    className="pl-10"
                    value={searchForm.destination}
                    onChange={(e) => setSearchForm({ ...searchForm, destination: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check-in</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchForm.checkin ? format(searchForm.checkin, "PPP") : "Check-in date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchForm.checkin}
                      onSelect={(date) => setSearchForm({ ...searchForm, checkin: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Check-out</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchForm.checkout ? format(searchForm.checkout, "PPP") : "Check-out date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchForm.checkout}
                      onSelect={(date) => setSearchForm({ ...searchForm, checkout: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Guests</label>
                <Select
                  value={searchForm.guests}
                  onValueChange={(value) => setSearchForm({ ...searchForm, guests: value })}
                >
                  <SelectTrigger>
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="2 Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Guest</SelectItem>
                    <SelectItem value="2">2 Guests</SelectItem>
                    <SelectItem value="3">3 Guests</SelectItem>
                    <SelectItem value="4">4+ Guests</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
              disabled={loading}
            >
              <Search className="mr-2 w-4 h-4" />
              {loading ? "Searching..." : "Search Hotels"}
            </Button>
          </CardContent>
        </Card>

        {/* Hotel Results */}
        {hotels.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Hotels</h2>
            {hotels.map((hotel) => (
              <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <Image
                        src={hotel.image || "/placeholder.svg"}
                        alt={hotel.name}
                        width={300}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{hotel.name}</h3>
                          <div className="flex items-center gap-1 text-gray-600 mb-2">
                            <MapPin className="w-4 h-4" />
                            <span>{hotel.location}</span>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold ml-1">{hotel.rating}</span>
                            </div>
                            <span className="text-gray-500">({hotel.reviews} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900">${hotel.price}</p>
                          <p className="text-sm text-gray-500">per night</p>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{hotel.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.map((amenity, index) => (
                          <Badge key={index} variant="secondary">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleBookHotel(hotel)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {hotels.length === 0 && !loading && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Search for hotels to see available options</p>
          </div>
        )}
      </div>
    </div>
  )
}