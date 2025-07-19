
"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Clock, Globe, Star, Search, ArrowRight, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Package {
  id: number
  title: string
  duration: string
  countries: number
  destinations: string[]
  image: string
  price: number
  originalPrice: number
  discount: string
  rating: number
  reviews: number
  description: string
  category: string
  includes: string[]
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDuration, setSelectedDuration] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [loading, setLoading] = useState(true)

  const filterPackages = useCallback(() => {
    const filtered = packages.filter((pkg) => {
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pkg.destinations.some((dest) => dest.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "all" || pkg.category === selectedCategory
      const matchesDuration = selectedDuration === "all" || getDurationCategory(pkg.duration) === selectedDuration

      return matchesSearch && matchesCategory && matchesDuration
    })

    // Sort packages
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - b.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "duration":
        filtered.sort((a, b) => Number.parseInt(a.duration) - Number.parseInt(b.duration))
        break
      case "popular":
      default:
        filtered.sort((a, b) => b.reviews - a.reviews)
        break
    }

    setFilteredPackages(filtered)
  }, [packages, searchTerm, selectedCategory, selectedDuration, sortBy])

  useEffect(() => {
    fetchPackages()
  }, [])

  useEffect(() => {
    filterPackages()
  }, [filterPackages])

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages")
      const data = await response.json()
      setPackages(data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch packages:", error)
      // Fallback data
      const fallbackData = [
        {
          id: 1,
          title: "European Grand Tour",
          duration: "14 Days",
          countries: 5,
          destinations: ["Paris", "Rome", "Barcelona", "Amsterdam", "Prague"],
          image: "/images/tour.jpeg?height=200&width=300",
          price: 2999,
          originalPrice: 3499,
          discount: "15% OFF",
          rating: 4.8,
          reviews: 234,
          description: "Experience the best of Europe with this comprehensive tour covering 5 amazing countries",
          category: "Cultural",
          includes: ["Accommodation", "Breakfast", "Guided tours", "Transportation"],
        },
        {
          id: 2,
          title: "Southeast Asia Adventure",
          duration: "10 Days",
          countries: 3,
          destinations: ["Bangkok", "Siem Reap", "Ho Chi Minh City"],
          image: "/images/adventure.jpeg?height=200&width=300",
          price: 1899,
          originalPrice: 2199,
          discount: "12% OFF",
          rating: 4.7,
          reviews: 189,
          description: "Discover the rich culture and stunning landscapes of Southeast Asia",
          category: "Adventure",
          includes: ["Accommodation", "All meals", "Activities", "Local guide"],
        },
        {
          id: 3,
          title: "African Safari Experience",
          duration: "7 Days",
          countries: 2,
          destinations: ["Serengeti", "Ngorongoro", "Masai Mara"],
          image: "/images/safari.jpeg?height=200&width=300",
          price: 3299,
          originalPrice: 3799,
          discount: "13% OFF",
          rating: 4.9,
          reviews: 156,
          description: "Witness the Big Five and the Great Migration in East Africa",
          category: "Wildlife",
          includes: ["Luxury lodges", "All meals", "Game drives", "Park fees"],
        },
        {
          id: 4,
          title: "Japan Cultural Journey",
          duration: "12 Days",
          countries: 1,
          destinations: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
          image: "/images/culture.jpg?height=200&width=300",
          price: 2799,
          originalPrice: 3199,
          discount: "10% OFF",
          rating: 4.8,
          reviews: 298,
          description: "Immerse yourself in Japanese culture, from ancient temples to modern cities",
          category: "Cultural",
          includes: ["Hotels", "JR Pass", "Cultural experiences", "Some meals"],
        },
        {
          id: 5,
          title: "Caribbean Island Hopping",
          duration: "8 Days",
          countries: 3,
          destinations: ["Barbados", "St. Lucia", "Martinique"],
          image: "/images/island.jpg?height=200&width=300",
          price: 2199,
          originalPrice: 2599,
          discount: "15% OFF",
          rating: 4.6,
          reviews: 167,
          description: "Relax on pristine beaches and explore tropical paradise",
          category: "Beach",
          includes: ["Beach resorts", "Island transfers", "Water activities", "Breakfast"],
        },
        {
          id: 6,
          title: "Himalayan Trekking Adventure",
          duration: "16 Days",
          countries: 2,
          destinations: ["Kathmandu", "Everest Base Camp", "Pokhara"],
          image: "/images/himaliya.jpg?height=200&width=300",
          price: 2499,
          originalPrice: 2899,
          discount: "14% OFF",
          rating: 4.9,
          reviews: 89,
          description: "Challenge yourself with an epic trek to Everest Base Camp",
          category: "Adventure",
          includes: ["Teahouse accommodation", "All meals", "Permits", "Sherpa guide"],
        },
      ]
      setPackages(fallbackData)
      setLoading(false)
    }
  }

  const getDurationCategory = (duration: string) => {
    const days = Number.parseInt(duration)
    if (days <= 7) return "short"
    if (days <= 14) return "medium"
    return "long"
  }

  const categories = ["all", "Cultural", "Adventure", "Beach", "Wildlife", "City"]
  const durations = [
    { value: "all", label: "All Durations" },
    { value: "short", label: "1-7 Days" },
    { value: "medium", label: "8-14 Days" },
    { value: "long", label: "15+ Days" },
  ]

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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Travel Packages</h1>
          <p className="text-lg text-gray-600">Curated travel experiences at unbeatable prices</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search packages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

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

              <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                <SelectTrigger>
                  <SelectValue placeholder="Duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
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
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredPackages.length} of {packages.length} packages
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card
              key={pkg.id}
              className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
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
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                    <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {pkg.rating} ({pkg.reviews})
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Badge variant="secondary">{pkg.category}</Badge>
                </div>
                <h3 className="font-bold text-xl mb-2">{pkg.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {pkg.countries} {pkg.countries === 1 ? "Country" : "Countries"}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {pkg.destinations.slice(0, 2).join(", ")}
                      {pkg.destinations.length > 2 ? ` +${pkg.destinations.length - 2} more` : ""}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-gray-700">Includes:</p>
                  <div className="flex flex-wrap gap-1">
                    {pkg.includes.slice(0, 3).map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                    {pkg.includes.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{pkg.includes.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                    <span className="text-sm text-gray-500 line-through ml-2">${pkg.originalPrice}</span>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                    <Link href={`/packages/${pkg.id}`}>
                      Book Now
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
                setSelectedDuration("all")
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
