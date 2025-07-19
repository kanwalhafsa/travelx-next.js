"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Calendar, Users, Heart, Share2, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

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
  highlights: string[]
  bestTime: string
  duration: string
  gallery: string[]
}

export default function DestinationDetailsPage() {
  const params = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  const fetchDestination = useCallback(async () => {
    try {
      const destinationId = Number(params.id)

      // Mock destinations data based on ID
      const destinations: { [key: number]: Destination } = {
        1: {
          id: 1,
          name: "Bali",
          country: "Indonesia",
          continent: "Asia",
          image: "/images/bali.jpeg?height=400&width=600&text=Bali",
          price: "$899",
          rating: 4.8,
          reviews: 2847,
          description:
            "Bali is a tropical paradise known for its stunning beaches, rich culture, and spiritual atmosphere. From ancient temples to vibrant rice terraces, this Indonesian island offers an unforgettable experience for every traveler.",
          category: "Beach",
          highlights: [
            "Beautiful beaches",
            "Rich culture",
            "Affordable luxury",
            "Great food",
            "Spiritual temples",
            "Rice terraces",
          ],
          bestTime: "April to October",
          duration: "7-10 days",
          gallery: [
            "/images/bali1.jpg?height=300&width=400&text=Bali+Beach",
            "/images/bali2.jpg?height=300&width=400&text=Bali+Temple",
            "/images/bali3.jpg?height=300&width=400&text=Rice+Terraces",
            "/images/bali4.jpg?height=300&width=400&text=Bali+Culture",
          ],
        },
        2: {
          id: 2,
          name: "Tokyo",
          country: "Japan",
          continent: "Asia",
          image: "/images/tokyo.jpg?height=400&width=600&text=Tokyo",
          price: "$1299",
          rating: 4.9,
          reviews: 1923,
          description:
            "Tokyo is a vibrant metropolis that seamlessly blends traditional Japanese culture with cutting-edge modernity. Experience bustling streets, incredible cuisine, and unique attractions.",
          category: "City",
          highlights: [
            "Modern architecture",
            "Amazing food",
            "Rich traditions",
            "Shopping districts",
            "Cherry blossoms",
            "Nightlife",
          ],
          bestTime: "March to May, September to November",
          duration: "5-7 days",
          gallery: [
            "/images/tokyo1.jpg?height=300&width=400&text=Tokyo+Skyline",
            "/images/tokyo2.jpg?height=300&width=400&text=Shibuya+Crossing",
            "/images/tokyo3.jpg?height=300&width=400&text=Tokyo+Temple",
            "/images/culture3.jpg?height=300&width=400&text=Cherry+Blossoms",
          ],
        },
        3: {
          id: 3,
          name: "Santorini",
          country: "Greece",
          continent: "Europe",
          image: "/images/greece.jpeg?height=400&width=600&text=Santorini",
          price: "$1199",
          rating: 4.7,
          reviews: 1456,
          description:
            "Santorini is famous for its dramatic cliffs, stunning sunsets, and iconic white-washed buildings with blue domes. This Greek island paradise offers romance and beauty.",
          category: "Beach",
          highlights: [
            "Stunning sunsets",
            "White architecture",
            "Wine tasting",
            "Volcanic beaches",
            "Romantic atmosphere",
            "Greek cuisine",
          ],
          bestTime: "April to October",
          duration: "4-6 days",
          gallery: [
            "/images/greece1.jpg?height=300&width=400&text=Santorini+Sunset",
            "/images/greece2.jpg?height=300&width=400&text=Blue+Domes",
            "/images/greece3.jpg?height=300&width=400&text=Oia+Village",
            "/images/greece4.jpg?height=300&width=400&text=Red+Beach",
          ],
        },
        4: {
          id: 4,
          name: "Dubai",
          country: "UAE",
          continent: "Asia",
          image: "/images/dubai.jpeg?height=400&width=600&text=Dubai",
          price: "$1599",
          rating: 4.6,
          reviews: 2134,
          description:
            "Dubai is a city of superlatives, featuring the world's tallest building, largest shopping malls, and most luxurious hotels. Experience modern Arabian hospitality.",
          category: "City",
          highlights: [
            "Burj Khalifa",
            "Luxury shopping",
            "Desert safari",
            "Modern architecture",
            "Fine dining",
            "Beach resorts",
          ],
          bestTime: "November to March",
          duration: "4-5 days",
          gallery: [
            "/images/dubai1.jpg?height=300&width=400&text=Burj+Khalifa",
            "/images/dubai2.jpg?height=300&width=400&text=Dubai+Mall",
            "/images/dubai3.jpg?height=300&width=400&text=Desert+Safari",
            "/images/dubai4.jpg?height=300&width=400&text=Dubai+Marina",
          ],
        },
        5: {
          id: 5,
          name: "Machu Picchu",
          country: "Peru",
          continent: "South America",
          image: "/images/machu.jpeg?height=400&width=600&text=Machu+Picchu",
          price: "$1899",
          rating: 4.9,
          reviews: 987,
          description:
            "Machu Picchu is an ancient Incan citadel set high in the Andes Mountains. This UNESCO World Heritage site offers breathtaking views and incredible history.",
          category: "Cultural",
          highlights: [
            "Ancient ruins",
            "Mountain views",
            "Inca Trail",
            "Historical significance",
            "Photography",
            "Adventure hiking",
          ],
          bestTime: "May to September",
          duration: "3-5 days",
          gallery: [
            "/images/machu1.jpg?height=300&width=400&text=Machu+Picchu+Ruins",
            "/images/machu2.jpg?height=300&width=400&text=Inca+Trail",
            "/images/machu3.jpg?height=300&width=400&text=Andes+Mountains",
            "/images/machu4.jpg?height=300&width=400&text=Llamas",
          ],
        },
        6: {
          id: 6,
          name: "Safari Kenya",
          country: "Kenya",
          continent: "Africa",
          image: "/images/safari.jpeg?height=400&width=600&text=Safari",
          price: "$2299",
          rating: 4.8,
          reviews: 756,
          description:
            "Experience the ultimate African safari in Kenya's world-famous national parks. Witness the Big Five and the Great Migration in their natural habitat.",
          category: "Wildlife",
          highlights: [
            "Big Five animals",
            "Great Migration",
            "Masai culture",
            "Game drives",
            "Photography",
            "Conservation",
          ],
          bestTime: "July to October",
          duration: "7-10 days",
          gallery: [
            "/images/safari1.jpg?height=300&width=400&text=Lions",
            "/images/safari4.jpg?height=300&width=400&text=Elephants",
            "/images/safari3.jpg?height=300&width=400&text=Masai+Mara",
            "/images/safari5.jpg?height=300&width=400&text=Safari+Vehicle",
          ],
        },
        7: {
          id: 7,
          name: "Paris",
          country: "France",
          continent: "Europe",
          image: "/images/paris.jpg?height=400&width=600&text=Paris",
          price: "$1199",
          rating: 4.7,
          reviews: 4521,
          description:
            "Paris, the City of Light, is renowned for its timeless elegance, world-class art museums, iconic landmarks, and romantic atmosphere. From the Eiffel Tower to charming cafés, Paris offers an unforgettable cultural experience with exquisite cuisine, fashion, and architecture.",
          category: "City",
          highlights: [
            "Eiffel Tower",
            "Art museums",
            "Fine dining",
            "Fashion capital",
            "Historic architecture",
            "Seine River cruises",
            "Charming neighborhoods",
            "World-class shopping",
          ],
          bestTime: "April to June, September to October",
          duration: "4-6 days",
          gallery: [
            "/images/paris1.jpg?height=300&width=400&text=Eiffel+Tower",
            "/images/paris2.jpg?height=300&width=400&text=Louvre+Museum",
            "/images/paris3.jpg?height=300&width=400&text=Notre+Dame",
            "/images/paris4.jpg?height=300&width=400&text=Champs+Elysees",
          ],
        },
        8: {
          id: 8,
          name: "Maldives",
          country: "Maldives",
          continent: "Asia",
          image: "/images/maldives.jpg?height=400&width=600&text=Maldives",
          price: "$2599",
          rating: 4.9,
          reviews: 1876,
          description:
            "The Maldives is a tropical paradise consisting of 1,190 coral islands scattered across the Indian Ocean. Known for its crystal-clear turquoise waters, pristine white sand beaches, and luxurious overwater bungalows, it\'s the perfect destination for romance, relaxation, and underwater adventures.",
          category: "Beach",
          highlights: [
            "Crystal clear waters",
            "Overwater villas",
            "Snorkeling paradise",
            "Luxury resorts",
            "Private beaches",
            "Dolphin watching",
            "Spa treatments",
            "Sunset cruises",
          ],
          bestTime: "November to April",
          duration: "5-7 days",
          gallery: [
            "/images/maldives1.jpg?height=300&width=400&text=Overwater+Bungalows",
            "/images/maldives2.jpg?height=300&width=400&text=Crystal+Waters",
            "/images/maldives3.jpg?height=300&width=400&text=Coral+Reef",
            "/images/maldives4.jpg?height=300&width=400&text=Beach+Villa",
          ],
        },
      }

      const foundDestination = destinations[destinationId]
      if (foundDestination) {
        setDestination(foundDestination)
      }
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch destination:", error)
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchDestination()
  }, [fetchDestination])

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? "Destination removed from your wishlist" : "Destination added to your wishlist",
    })
  }

  const handleBookNow = () => {
    if (destination) {
      const bookingData: Record<string, string> = {
        type: "destination",
        title: `${destination.name}, ${destination.country}`,
        price: destination.price.replace("$", ""),
        destination: `${destination.name}, ${destination.country}`,
      }

      const params = new URLSearchParams(bookingData)
      window.location.href = `/checkout?${params.toString()}`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <Link href="/destinations">
            <Button>Back to Destinations</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/destinations" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Destinations
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Image
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{destination.name}</h1>
                <Badge variant="secondary">{destination.category}</Badge>
              </div>
              <div className="flex items-center gap-1 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{destination.country}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold ml-1">{destination.rating}</span>
                </div>
                <span className="text-gray-500">({destination.reviews} reviews)</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-blue-600">{destination.price}</span>
                <span className="text-gray-500 ml-2">per person</span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Best time: {destination.bestTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Duration: {destination.duration}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  size="lg"
                >
                  Book Now
                </Button>
                <div className="flex gap-2">
                  <Button onClick={handleAddToWishlist} variant="outline" className="flex-1 bg-transparent">
                    <Heart className={`w-4 h-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </Button>
                  <Button variant="outline" size="icon" className="bg-transparent">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="highlights">Highlights</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.name}</h2>
                <p className="text-gray-600 leading-relaxed">{destination.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="highlights">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {destination.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {destination.gallery.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${destination.name} ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}