"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Star, MapPin, Search, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Destination {
  id: number
  name: string
  country: string
  continent: string
  image: string
  price: string
  rating: number
  reviews: number
  description: string
  category: string
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContinent, setSelectedContinent] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDestinations()
  }, [])

  useEffect(() => {
    filterDestinations()
  }, [destinations, searchTerm, selectedContinent, selectedCategory, sortBy])

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations")
      const data = await response.json()
      setDestinations(data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch destinations:", error)
      // Fallback data
      const fallbackData = [
        {
          id: 1,
          name: "Bali",
          country: "Indonesia",
          continent: "Asia",
          image: "/images/bali.jpeg?height=300&width=400&text=Bali",
          price: "$899",
          rating: 4.8,
          reviews: 2847,
          description: "Tropical paradise with stunning beaches",
          category: "Beach",
        },
        {
          id: 2,
          name: "Tokyo",
          country: "Japan",
          continent: "Asia",
          image: "/images/tokyo.jpg?height=300&width=400&text=Tokyo",
          price: "$1299",
          rating: 4.9,
          reviews: 1923,
          description: "Modern metropolis with rich culture",
          category: "City",
        },
        {
          id: 3,
          name: "Santorini",
          country: "Greece",
          continent: "Europe",
          image: "/images/greece.jpeg?height=300&width=400&text=Santorini",
          price: "$1199",
          rating: 4.7,
          reviews: 1456,
          description: "Iconic white buildings and blue domes",
          category: "Beach",
        },
        {
          id: 4,
          name: "Dubai",
          country: "UAE",
          continent: "Asia",
          image: "/images/dubai.jpeg?height=300&width=400&text=Dubai",
          price: "$1599",
          rating: 4.6,
          reviews: 2134,
          description: "Luxury shopping and modern architecture",
          category: "City",
        },
        {
          id: 5,
          name: "Machu Picchu",
          country: "Peru",
          continent: "South America",
          image: "/images/machu.jpeg?height=300&width=400&text=Machu+Picchu",
          price: "$1899",
          rating: 4.9,
          reviews: 987,
          description: "Ancient Incan citadel in the mountains",
          category: "Cultural",
        },
        {
          id: 6,
          name: "Safari Kenya",
          country: "Kenya",
          continent: "Africa",
          image: "/images/safari.jpeg?height=300&width=400&text=Safari",
          price: "$2299",
          rating: 4.8,
          reviews: 756,
          description: "Wildlife adventure in African savanna",
          category: "Wildlife",
        },
        {
          id: 7,
          name: "Paris",
          country: "France",
          continent: "Europe",
          image: "/images/paris.jpg?height=300&width=400&text=Paris",
          price: "$1199",
          rating: 4.7,
          reviews: 4521,
          description: "City of lights and romance",
          category: "City",
        },
        {
          id: 8,
          name: "Maldives",
          country: "Maldives",
          continent: "Asia",
          image: "/images/maldives.jpg?height=300&width=400&text=Maldives",
          price: "$2599",
          rating: 4.9,
          reviews: 1876,
          description: "Tropical paradise with overwater bungalows",
          category: "Beach",
        },
      ]
      setDestinations(fallbackData)
      setLoading(false)
    }
  }

  const filterDestinations = () => {
    const filtered = destinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.country.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesContinent = selectedContinent === "all" || dest.continent === selectedContinent
      const matchesCategory = selectedCategory === "all" || dest.category === selectedCategory

      return matchesSearch && matchesContinent && matchesCategory
    })

    // Sort destinations
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number.parseInt(a.price.replace("$", "")) - Number.parseInt(b.price.replace("$", "")))
        break
      case "price-high":
        filtered.sort((a, b) => Number.parseInt(b.price.replace("$", "")) - Number.parseInt(a.price.replace("$", "")))
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "popular":
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredDestinations(filtered)
  }

  const continents = ["all", "Asia", "Europe", "Africa", "North America", "South America", "Oceania"]
  const categories = ["all", "Beach", "City", "Cultural", "Wildlife", "Adventure"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-96"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Explore Destinations</h1>
          <p className="text-lg text-gray-600">Discover amazing places around the world</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search destinations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={selectedContinent} onValueChange={setSelectedContinent}>
                <SelectTrigger>
                  <SelectValue placeholder="Continent" />
                </SelectTrigger>
                <SelectContent>
                  {continents.map((continent) => (
                    <SelectItem key={continent} value={continent}>
                      {continent === "all" ? "All Continents" : continent}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">{destination.category}</Badge>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {destination.rating} ({destination.reviews})
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.country}</span>
                </div>
                <h3 className="font-bold text-xl mb-2">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">{destination.price}</span>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
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

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No destinations found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedContinent("all")
                setSelectedCategory("all")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
