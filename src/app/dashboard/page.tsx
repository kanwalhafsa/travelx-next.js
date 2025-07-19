"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, CreditCard, Heart, Settings, Plane, Hotel, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface UserData {
  id: string
  name: string
  email: string
  avatar?: string
  memberSince: string
  totalTrips: number
  upcomingTrips: number
  favoriteDestinations: number
}

interface Booking {
  id: string
  type: "flight" | "hotel" | "package"
  title: string
  destination: string
  date: string
  status: "confirmed" | "pending" | "cancelled"
  price: number
  image: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchUserData()
    fetchBookings()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me")
      if (response.ok) {
        const userData = await response.json()
        setUser({
          ...userData,
          memberSince: "January 2024",
          totalTrips: 5,
          upcomingTrips: 2,
          favoriteDestinations: 8,
        })
      } else {
        router.push("/auth/login")
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error)
      router.push("/auth/login")
    }
  }

  const fetchBookings = async () => {
    try {
      // Mock bookings data
      const mockBookings: Booking[] = [
        {
          id: "1",
          type: "package",
          title: "European Grand Tour",
          destination: "Europe",
          date: "2024-06-15",
          status: "confirmed",
          price: 2999,
          image: "/images/tour2.jpg?height=100&width=150",
        },
        {
          id: "2",
          type: "flight",
          title: "Flight to Tokyo",
          destination: "Tokyo, Japan",
          date: "2024-05-20",
          status: "confirmed",
          price: 899,
          image: "/images/tokyo.jpg?height=100&width=150",
        },
        {
          id: "3",
          type: "hotel",
          title: "Luxury Resort Bali",
          destination: "Bali, Indonesia",
          date: "2024-07-10",
          status: "pending",
          price: 1200,
          image: "/images/bali1.jpg?height=100&width=150",
        },
      ]
      setBookings(mockBookings)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch bookings:", error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="w-4 h-4" />
      case "hotel":
        return <Hotel className="w-4 h-4" />
      case "package":
        return <MapPin className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const handlePaymentMethodsClick = () => {
    router.push("/settings?tab=payment")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600">Member since {user.memberSince}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Trips</p>
                  <p className="text-2xl font-bold text-gray-900">{user.totalTrips}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">{user.upcomingTrips}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Heart className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorites</p>
                  <p className="text-2xl font-bold text-gray-900">{user.favoriteDestinations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Star className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Points</p>
                  <p className="text-2xl font-bold text-gray-900">2,450</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Manage your travel bookings and reservations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={booking.image || "/placeholder.svg"}
                        alt={booking.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getTypeIcon(booking.type)}
                          <h3 className="font-semibold">{booking.title}</h3>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{booking.destination}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CreditCard className="w-4 h-4" />
                            <span>${booking.price}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/bookings/${booking.id}`}>
                          View Details
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/bookings">View All Bookings</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Destinations</CardTitle>
                <CardDescription>Places you've saved for future trips</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: "Bali, Indonesia", image: "/images/bali2.jpg?height=150&width=200" },
                    { name: "Tokyo, Japan", image: "/images/tokyo.jpg?height=150&width=200" },
                    { name: "Santorini, Greece", image: "/images/greece3.jpg?height=150&width=200" },
                  ].map((destination, index) => (
                    <div key={index} className="relative group cursor-pointer">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.name}
                        className="w-full h-32 rounded-lg object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-end p-3">
                        <p className="text-white font-semibold">{destination.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="text-xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Change Photo
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <Button variant="outline" className="justify-start bg-transparent" asChild>
                    <Link href="/settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start bg-transparent"
                    onClick={handlePaymentMethodsClick}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment Methods
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
