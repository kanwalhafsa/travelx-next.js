
"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Plane, Hotel, Car, Search, Download } from "lucide-react"
import Link from "next/link"
import type { JSX } from "react/jsx-runtime"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Booking {
  id: string
  type: "flight" | "hotel" | "package" | "car"
  title: string
  destination: string
  date: string
  endDate?: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  price: number
  image: string
  bookingReference: string
  passengers?: number
  rooms?: number
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const { toast } = useToast()

  const filterBookings = useCallback(() => {
    let filtered = bookings

    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((booking) => booking.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((booking) => booking.type === typeFilter)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchTerm, statusFilter, typeFilter])

  const fetchBookings = useCallback(async () => {
    try {
      // Mock bookings data
      const mockBookings: Booking[] = [
        {
          id: "1",
          type: "package",
          title: "European Grand Tour",
          destination: "Europe",
          date: "2024-06-15",
          endDate: "2024-06-29",
          status: "confirmed",
          price: 2999,
          image: "/images/tour2.jpg?height=100&width=150",
          bookingReference: "TRX-PKG-001",
          passengers: 2,
        },
        {
          id: "2",
          type: "flight",
          title: "Flight to Tokyo",
          destination: "Tokyo, Japan",
          date: "2024-05-20",
          endDate: "2024-05-27",
          status: "confirmed",
          price: 899,
          image: "/images/tokyo.jpg?height=100&width=150",
          bookingReference: "TRX-FLT-002",
          passengers: 1,
        },
        {
          id: "3",
          type: "hotel",
          title: "Luxury Resort Bali",
          destination: "Bali, Indonesia",
          date: "2024-07-10",
          endDate: "2024-07-17",
          status: "pending",
          price: 1200,
          image: "/images/bali1.jpg?height=100&width=150",
          bookingReference: "TRX-HTL-003",
          rooms: 1,
        },
        {
          id: "4",
          type: "car",
          title: "BMW 3 Series Rental",
          destination: "Los Angeles, USA",
          date: "2024-08-05",
          endDate: "2024-08-12",
          status: "confirmed",
          price: 840,
          image: "/images/bmw3.jpeg?height=100&width=150",
          bookingReference: "TRX-CAR-004",
        },
        {
          id: "5",
          type: "flight",
          title: "Flight to Paris",
          destination: "Paris, France",
          date: "2024-03-15",
          endDate: "2024-03-22",
          status: "completed",
          price: 650,
          image: "/images/paris.jpg?height=100&width=150",
          bookingReference: "TRX-FLT-005",
          passengers: 2,
        },
      ]
      setBookings(mockBookings)
      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch bookings:", err)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  useEffect(() => {
    filterBookings()
  }, [filterBookings])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
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
      case "car":
        return <Car className="w-4 h-4" />
      case "package":
        return <MapPin className="w-4 h-4" />
      default:
        return <MapPin className="w-4 h-4" />
    }
  }

  const upcomingBookings = filteredBookings.filter(
    (booking) => booking.status === "confirmed" && new Date(booking.date) > new Date(),
  )
  const pastBookings = filteredBookings.filter(
    (booking) => booking.status === "completed" || new Date(booking.date) < new Date(),
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg h-32"></div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">Manage and track all your travel bookings</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="flight">Flights</SelectItem>
                  <SelectItem value="hotel">Hotels</SelectItem>
                  <SelectItem value="car">Cars</SelectItem>
                  <SelectItem value="package">Packages</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="bg-transparent"
                onClick={() => {
                  toast({
                    title: "Export Started",
                    description: "Your booking data is being exported. You will receive an email shortly.",
                  })
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Bookings ({filteredBookings.length})</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <BookingsList bookings={filteredBookings} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>

          <TabsContent value="upcoming">
            <BookingsList bookings={upcomingBookings} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>

          <TabsContent value="past">
            <BookingsList bookings={pastBookings} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BookingsList({
  bookings,
  getStatusColor,
  getTypeIcon,
}: {
  bookings: Booking[]
  getStatusColor: (status: string) => string
  getTypeIcon: (type: string) => JSX.Element
}) {
  const { toast } = useToast()

  if (bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">You do not have any bookings matching the current filters.</p>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Link href="/">Start Planning Your Trip</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Image
                src={booking.image || "/placeholder.svg"}
                alt={booking.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getTypeIcon(booking.type)}
                  <h3 className="font-semibold text-lg">{booking.title}</h3>
                  <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.destination}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(booking.date).toLocaleDateString()}
                      {booking.endDate && ` - ${new Date(booking.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Ref: {booking.bookingReference}</span>
                  {booking.passengers && <span>{booking.passengers} passenger(s)</span>}
                  {booking.rooms && <span>{booking.rooms} room(s)</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-2">${booking.price}</div>
                <div className="space-y-2">
                  <Button size="sm" asChild>
                    <Link href={`/bookings/${booking.id}`}>View Details</Link>
                  </Button>
                  {booking.status === "confirmed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        toast({
                          title: "Modify Booking",
                          description: "Redirecting to modification page...",
                        })
                      }}
                    >
                      Modify
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
