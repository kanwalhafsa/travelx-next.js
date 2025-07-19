"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  MapPin,
  CalendarIcon,
  Users,
  Star,
  Heart,
  Plane,
  Hotel,
  Car,
  Camera,
  Clock,
  ArrowRight,
  Globe,
  Shield,
  Headphones,
  TrendingUp,
  Award,
  Users2,
} from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const [date, setDate] = useState<Date>()
  const [activeTab, setActiveTab] = useState("flights")

  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      image: "/images/bali.jpeg?height=300&width=400",
      price: "$899",
      rating: 4.8,
      reviews: 2847,
      description: "Tropical paradise with stunning beaches",
    },
    {
      id: 2,
      name: "Tokyo, Japan",
      image: "/images/tokyo.jpeg?height=300&width=400",
      price: "$1,299",
      rating: 4.9,
      reviews: 3521,
      description: "Modern city meets traditional culture",
    },
    {
      id: 3,
      name: "Santorini, Greece",
      image: "/images/greece.jpeg?height=300&width=400",
      price: "$1,099",
      rating: 4.7,
      reviews: 1923,
      description: "Iconic white buildings and sunset views",
    },
    {
      id: 4,
      name: "Dubai, UAE",
      image: "/images/dubai.jpeg?height=300&width=400",
      price: "$1,499",
      rating: 4.6,
      reviews: 2156,
      description: "Luxury shopping and modern architecture",
    },
  ]

  const featuredPackages = [
    {
      id: 1,
      title: "European Grand Tour",
      duration: "14 Days",
      countries: 5,
      image: "/images/tour.jpeg?height=200&width=300",
      price: "$2,999",
      originalPrice: "$3,499",
      discount: "15% OFF",
    },
    {
      id: 2,
      title: "Southeast Asia Adventure",
      duration: "10 Days",
      countries: 3,
      image: "/images/adventure.jpeg?height=200&width=300",
      price: "$1,899",
      originalPrice: "$2,199",
      discount: "12% OFF",
    },
    {
      id: 3,
      title: "African Safari Experience",
      duration: "7 Days",
      countries: 2,
      image: "/images/safari.jpeg?height=200&width=300",
      price: "$3,299",
      originalPrice: "$3,799",
      discount: "13% OFF",
    },
  ]

  const stats = [
    { icon: Users2, label: "Happy Travelers", value: "50,000+" },
    { icon: Globe, label: "Destinations", value: "200+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: TrendingUp, label: "Years Experience", value: "15+" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Your Next
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Adventure
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore breathtaking destinations, book amazing experiences, and create memories that last a lifetime.
            </p>
          </div>

          {/* Search Card */}
          <Card className="max-w-4xl mx-auto shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="flights" className="flex items-center gap-2">
                    <Plane className="w-4 h-4" />
                    Flights
                  </TabsTrigger>
                  <TabsTrigger value="hotels" className="flex items-center gap-2">
                    <Hotel className="w-4 h-4" />
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger value="cars" className="flex items-center gap-2">
                    <Car className="w-4 h-4" />
                    Cars
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="flights">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">From</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Departure city" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">To</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Destination city" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Departure</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Passengers</label>
                      <Select>
                        <SelectTrigger>
                          <Users className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="1 Adult" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Adult</SelectItem>
                          <SelectItem value="2">2 Adults</SelectItem>
                          <SelectItem value="3">3 Adults</SelectItem>
                          <SelectItem value="4">4+ Adults</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                    asChild
                  >
                    <Link href="/flights">
                      <Search className="mr-2 w-4 h-4" />
                      Search Flights
                    </Link>
                  </Button>
                </TabsContent>

                <TabsContent value="hotels">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Where are you going?" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Check-in</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Check-in date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Guests</label>
                      <Select>
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
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                    asChild
                  >
                    <Link href="/hotels">
                      <Search className="mr-2 w-4 h-4" />
                      Search Hotels
                    </Link>
                  </Button>
                </TabsContent>

                <TabsContent value="cars">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Pick-up Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input placeholder="Pick-up location" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Pick-up Date</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick-up date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Car Type</label>
                      <Select>
                        <SelectTrigger>
                          <Car className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Economy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="economy">Economy</SelectItem>
                          <SelectItem value="compact">Compact</SelectItem>
                          <SelectItem value="midsize">Midsize</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
        
                  <Button
                    className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                    asChild
                  >
                    <Link href="/cars">
                      <Search className="mr-2 w-4 h-4" />
                      Search Cars
                    </Link>
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-lg text-gray-600">Discover the world's most amazing places</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((destination) => (
              <Card
                key={destination.id}
                className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Button size="icon" variant="secondary" className="rounded-full bg-white/80 hover:bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                      {destination.rating} ({destination.reviews})
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{destination.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{destination.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/destinations/${destination.id}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link href="/destinations">
                View All Destinations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Packages</h2>
            <p className="text-lg text-gray-600">Curated travel experiences at unbeatable prices</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <Card
                key={pkg.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative">
                  <Image
                    src={pkg.image || "/placeholder.svg"}
                    alt={pkg.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">{pkg.discount}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {pkg.countries} Countries
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{pkg.originalPrice}</span>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                      <Link href={`/packages/${pkg.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg" variant="outline" asChild>
              <Link href="/packages">
                View All Packages
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Choose TravelX?</h2>
            <p className="text-lg text-blue-100">Your trusted travel companion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Booking</h3>
              <p className="text-blue-100">Your payments and personal information are always protected</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-blue-100">Get help whenever you need it, anywhere in the world</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Best Experiences</h3>
              <p className="text-blue-100">Handpicked destinations and activities for unforgettable memories</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
