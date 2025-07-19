"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Heart, Share2, ArrowLeft, Clock, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

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
  itinerary: Array<{
    day: number
    city: string
    activities: string[]
  }>
  gallery: string[]
}

export default function PackageDetailsPage() {
  const params = useParams()
  const [packageData, setPackageData] = useState<Package | null>(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchPackage()
  }, [params.id])

  const fetchPackage = async () => {
    try {
      const packageId = Number(params.id)

      // Mock packages data based on ID
      const packages: { [key: number]: Package } = {
        1: {
          id: 1,
          title: "European Grand Tour",
          duration: "14 Days",
          countries: 5,
          destinations: ["Paris", "Rome", "Barcelona", "Amsterdam", "Prague"],
          image: "/images/tour.jpeg?height=400&width=600&text=Europe",
          price: 2999,
          originalPrice: 3499,
          discount: "15% OFF",
          rating: 4.8,
          reviews: 234,
          description:
            "Experience the best of Europe with this comprehensive tour covering 5 amazing countries. Visit iconic landmarks, taste local cuisines, and immerse yourself in rich European culture.",
          category: "Cultural",
          includes: ["Accommodation", "Breakfast", "Guided tours", "Transportation", "Museum entries"],
          itinerary: [
            { day: 1, city: "Paris", activities: ["Arrival", "Eiffel Tower visit", "Seine River cruise"] },
            { day: 2, city: "Paris", activities: ["Louvre Museum", "Notre Dame", "Champs-Élysées"] },
            { day: 3, city: "Rome", activities: ["Colosseum", "Roman Forum", "Vatican City"] },
            { day: 4, city: "Rome", activities: ["Trevi Fountain", "Spanish Steps", "Pantheon"] },
            { day: 5, city: "Barcelona", activities: ["Sagrada Familia", "Park Güell", "Gothic Quarter"] },
          ],
          gallery: [
            "/images/tour1.jpg?height=300&width=400&text=Paris",
            "/images/tour2.jpg?height=300&width=400&text=Rome",
            "/images/tour3.jpg?height=300&width=400&text=Barcelona",
            "/images/tour4.jpg?height=300&width=400&text=Amsterdam",
          ],
        },
        2: {
          id: 2,
          title: "Southeast Asia Adventure",
          duration: "10 Days",
          countries: 3,
          destinations: ["Bangkok", "Siem Reap", "Ho Chi Minh City"],
          image: "/images/adventure.jpeg?height=400&width=600&text=Asia",
          price: 1899,
          originalPrice: 2199,
          discount: "12% OFF",
          rating: 4.7,
          reviews: 189,
          description:
            "Discover the rich culture and stunning landscapes of Southeast Asia. From bustling markets to ancient temples, this adventure offers unforgettable experiences.",
          category: "Adventure",
          includes: ["Accommodation", "All meals", "Activities", "Local guide", "Transportation"],
          itinerary: [
            { day: 1, city: "Bangkok", activities: ["Arrival", "Grand Palace", "Wat Pho Temple"] },
            { day: 2, city: "Bangkok", activities: ["Floating market", "Thai cooking class"] },
            { day: 3, city: "Siem Reap", activities: ["Angkor Wat sunrise", "Angkor Thom"] },
            { day: 4, city: "Siem Reap", activities: ["Ta Prohm", "Banteay Srei"] },
            { day: 5, city: "Ho Chi Minh City", activities: ["Cu Chi Tunnels", "War Museum"] },
          ],
          gallery: [
            "/images/adventure1.jpg?height=300&width=400&text=Bangkok",
            "/images/adventure2.jpg?height=300&width=400&text=Angkor+Wat",
            "/images/adventure3.jpg?height=300&width=400&text=Ho+Chi+Minh",
            "/images/adventure4.jpg?height=300&width=400&text=Thai+Food",
          ],
        },
        3: {
          id: 3,
          title: "African Safari Experience",
          duration: "7 Days",
          countries: 2,
          destinations: ["Serengeti", "Ngorongoro", "Masai Mara"],
          image: "/images/safari.jpeg?height=400&width=600&text=Safari",
          price: 3299,
          originalPrice: 3799,
          discount: "13% OFF",
          rating: 4.9,
          reviews: 156,
          description:
            "Witness the Big Five and the Great Migration in East Africa. This safari experience offers incredible wildlife viewing and cultural encounters.",
          category: "Wildlife",
          includes: ["Luxury lodges", "All meals", "Game drives", "Park fees", "Professional guide"],
          itinerary: [
            { day: 1, city: "Serengeti", activities: ["Arrival", "Evening game drive"] },
            { day: 2, city: "Serengeti", activities: ["Full day safari", "Big Five spotting"] },
            { day: 3, city: "Ngorongoro", activities: ["Crater tour", "Masai village visit"] },
            { day: 4, city: "Masai Mara", activities: ["Great Migration viewing", "Hot air balloon"] },
            { day: 5, city: "Masai Mara", activities: ["Final game drive", "Cultural experience"] },
          ],
          gallery: [
            "/images/safari1.jpg?height=300&width=400&text=Lions",
            "/images/safari2.jpg?height=300&width=400&text=Elephants",
            "/images/safari3.jpg?height=300&width=400&text=Masai+Mara",
            "/images/safari4.jpg?height=300&width=400&text=Safari+Lodge",
          ],
        },
        4: {
          id: 4,
          title: "Japan Cultural Journey",
          duration: "12 Days",
          countries: 1,
          destinations: ["Tokyo", "Kyoto", "Osaka", "Hiroshima"],
          image: "/images/culture.jpg?height=400&width=600&text=Japan",
          price: 2799,
          originalPrice: 3199,
          discount: "10% OFF",
          rating: 4.8,
          reviews: 298,
          description:
            "Immerse yourself in Japanese culture, from ancient temples to modern cities. Experience traditional ceremonies, cuisine, and hospitality.",
          category: "Cultural",
          includes: ["Hotels", "JR Pass", "Cultural experiences", "Some meals", "English guide"],
          itinerary: [
            { day: 1, city: "Tokyo", activities: ["Arrival", "Shibuya crossing", "Tokyo Tower"] },
            { day: 2, city: "Tokyo", activities: ["Senso-ji Temple", "Tsukiji Market", "Imperial Palace"] },
            { day: 3, city: "Kyoto", activities: ["Fushimi Inari", "Kinkaku-ji", "Gion district"] },
            { day: 4, city: "Kyoto", activities: ["Bamboo Grove", "Tea ceremony", "Kiyomizu-dera"] },
            { day: 5, city: "Osaka", activities: ["Osaka Castle", "Dotonbori", "Street food tour"] },
          ],
          gallery: [
            "/images/culture1.jpg?height=300&width=400&text=Tokyo+Skyline",
            "/images/culture2.jpg?height=300&width=400&text=Kyoto+Temple",
            "/images/culture3.jpg?height=300&width=400&text=Cherry+Blossoms",
            "/images/culture4.jpg?height=300&width=400&text=Japanese+Food",
          ],
        },
        5: {
          id: 5,
          title: "Caribbean Island Hopping",
          duration: "8 Days",
          countries: 3,
          destinations: ["Barbados", "St. Lucia", "Martinique"],
          image: "/images/island.jpg?height=400&width=600&text=Caribbean",
          price: 2199,
          originalPrice: 2599,
          discount: "15% OFF",
          rating: 4.6,
          reviews: 167,
          description:
            "Relax on pristine beaches and explore tropical paradise. Island hop through the Caribbean's most beautiful destinations.",
          category: "Beach",
          includes: ["Beach resorts", "Island transfers", "Water activities", "Breakfast", "Snorkeling gear"],
          itinerary: [
            { day: 1, city: "Barbados", activities: ["Arrival", "Beach relaxation", "Sunset cruise"] },
            { day: 2, city: "Barbados", activities: ["Snorkeling", "Rum distillery tour"] },
            { day: 3, city: "St. Lucia", activities: ["Pitons hike", "Sulphur springs"] },
            { day: 4, city: "St. Lucia", activities: ["Catamaran cruise", "Beach time"] },
            { day: 5, city: "Martinique", activities: ["Rainforest tour", "Local market visit"] },
          ],
          gallery: [
            "/images/island1.jpg?height=300&width=400&text=Caribbean+Beach",
            "/images/island2.jpg?height=300&width=400&text=St+Lucia+Pitons",
            "/images/island3.jpg?height=300&width=400&text=Snorkeling",
            "/images/island4.jpg?height=300&width=400&text=Sunset+Cruise",
          ],
        },
        6: {
          id: 6,
          title: "Himalayan Trekking Adventure",
          duration: "16 Days",
          countries: 2,
          destinations: ["Kathmandu", "Everest Base Camp", "Pokhara"],
          image: "/images/himaliya.jpg?height=400&width=600&text=Himalayas",
          price: 2499,
          originalPrice: 2899,
          discount: "14% OFF",
          rating: 4.9,
          reviews: 89,
          description:
            "Challenge yourself with an epic trek to Everest Base Camp. Experience breathtaking mountain views and Sherpa culture.",
          category: "Adventure",
          includes: ["Teahouse accommodation", "All meals", "Permits", "Sherpa guide", "Equipment"],
          itinerary: [
            { day: 1, city: "Kathmandu", activities: ["Arrival", "Durbar Square", "Preparation"] },
            { day: 2, city: "Lukla", activities: ["Flight to Lukla", "Trek to Phakding"] },
            { day: 3, city: "Namche", activities: ["Trek to Namche Bazaar", "Acclimatization"] },
            { day: 4, city: "Tengboche", activities: ["Trek to Tengboche", "Monastery visit"] },
            { day: 5, city: "Base Camp", activities: ["Everest Base Camp", "Celebration"] },
          ],
          gallery: [
            "/images/himaliya1.jpg?height=300&width=400&text=Everest+Base+Camp",
            "/images/himaliya2.jpg?height=300&width=400&text=Himalayan+Views",
            "/images/himaliya3.jpg?height=300&width=400&text=Sherpa+Culture",
            "/images/himaliya4.jpg?height=300&width=400&text=Mountain+Trek",
          ],
        },
      }

      const foundPackage = packages[packageId]
      if (foundPackage) {
        setPackageData(foundPackage)
      }
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch package:", error)
      setLoading(false)
    }
  }

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? "Package removed from your wishlist" : "Package added to your wishlist",
    })
  }

  const handleBookNow = () => {
    if (packageData) {
      const bookingData = {
        type: "package",
        title: packageData.title,
        price: packageData.price.toString(),
        destination: packageData.destinations.join(", "),
      }

      const params = new URLSearchParams(bookingData as any)
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

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Package not found</h1>
          <Link href="/packages">
            <Button>Back to Packages</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/packages" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Packages
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Image
              src={packageData.image || "/placeholder.svg"}
              alt={packageData.title}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{packageData.title}</h1>
                <Badge variant="secondary">{packageData.category}</Badge>
              </div>
              <div className="flex items-center gap-1 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{packageData.destinations.slice(0, 2).join(", ")}</span>
                {packageData.destinations.length > 2 && <span> +{packageData.destinations.length - 2} more</span>}
              </div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold ml-1">{packageData.rating}</span>
                </div>
                <span className="text-gray-500">({packageData.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {packageData.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="w-4 h-4" />
                  {packageData.countries} {packageData.countries === 1 ? "Country" : "Countries"}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-blue-600">${packageData.price}</span>
                  <span className="text-lg text-gray-500 line-through">${packageData.originalPrice}</span>
                </div>
                <Badge className="bg-red-500 hover:bg-red-600 mt-2">{packageData.discount}</Badge>
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
            <TabsTrigger value="includes">What's Included</TabsTrigger>
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Package</h2>
                <p className="text-gray-600 leading-relaxed">{packageData.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="includes">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageData.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="itinerary">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Itinerary</h2>
                <div className="space-y-4">
                  {packageData.itinerary.map((day, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <h3 className="font-semibold text-lg">
                        Day {day.day} - {day.city}
                      </h3>
                      <ul className="mt-2 space-y-1">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="text-gray-600 flex items-center gap-2">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            {activity}
                          </li>
                        ))}
                      </ul>
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
                  {packageData.gallery.map((image, index) => (
                    <Image
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${packageData.title} ${index + 1}`}
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
