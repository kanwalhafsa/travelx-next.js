

"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Users, Download, ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"

interface BookingDetail {
  id: string
  type: string
  title: string
  destination: string
  date: string
  endDate?: string
  status: string
  price: number
  image: string
  bookingReference: string
  passengers?: number
  rooms?: number
  details: {
    confirmation: string
    bookedOn: string
    totalAmount: number
    paidAmount: number
    paymentMethod: string
    cancellationPolicy: string
  }
  itinerary?: Array<{
    date: string
    activity: string
    time?: string
    location: string
  }>
}

export default function BookingDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const fetchBookingDetail = useCallback(async () => {
    try {
      const bookingId = params.id as string

      // Mock booking detail data based on ID
      const mockBookings: { [key: string]: BookingDetail } = {
        "1": {
          id: "1",
          type: "package",
          title: "European Grand Tour",
          destination: "Europe",
          date: "2024-06-15",
          endDate: "2024-06-29",
          status: "confirmed",
          price: 2999,
          image: "/images/tour2.jpg?height=300&width=400",
          bookingReference: "TRX-PKG-001",
          passengers: 2,
          details: {
            confirmation: "CONF-2024-001",
            bookedOn: "2024-01-15",
            totalAmount: 2999,
            paidAmount: 2999,
            paymentMethod: "Credit Card ****1234",
            cancellationPolicy: "Free cancellation up to 30 days before departure",
          },
          itinerary: [
            {
              date: "2024-06-15",
              activity: "Arrival in Paris",
              time: "14:00",
              location: "Charles de Gaulle Airport",
            },
            {
              date: "2024-06-16",
              activity: "City Tour of Paris",
              time: "09:00",
              location: "Hotel Lobby",
            },
            {
              date: "2024-06-18",
              activity: "Travel to Rome",
              time: "08:00",
              location: "Paris Gare de Lyon",
            },
            {
              date: "2024-06-20",
              activity: "Vatican City Tour",
              time: "10:00",
              location: "St. Peter&apos;s Square",
            },
          ],
        },
        "2": {
          id: "2",
          type: "flight",
          title: "Tokyo Adventure",
          destination: "Tokyo, Japan",
          date: "2024-07-10",
          endDate: "2024-07-20",
          status: "pending",
          price: 1899,
          image: "/images/tokyo.jpg?height=300&width=400",
          bookingReference: "TRX-FLT-002",
          passengers: 1,
          details: {
            confirmation: "CONF-2024-002",
            bookedOn: "2024-02-10",
            totalAmount: 1899,
            paidAmount: 500,
            paymentMethod: "Credit Card ****5678",
            cancellationPolicy: "Cancellation allowed up to 48 hours before departure",
          },
          itinerary: [
            {
              date: "2024-07-10",
              activity: "Flight to Tokyo",
              time: "08:00",
              location: "JFK Airport",
            },
            {
              date: "2024-07-11",
              activity: "Tokyo City Tour",
              time: "10:00",
              location: "Hotel Shibuya",
            },
            {
              date: "2024-07-15",
              activity: "Mount Fuji Day Trip",
              time: "07:00",
              location: "Hotel Lobby",
            },
          ],
        },
        "3": {
          id: "3",
          type: "hotel",
          title: "Bali Beach Resort",
          destination: "Bali, Indonesia",
          date: "2024-08-05",
          endDate: "2024-08-15",
          status: "completed",
          price: 1299,
          image: "/images/bali1.jpg?height=300&width=400",
          bookingReference: "TRX-HTL-003",
          passengers: 2,
          rooms: 1,
          details: {
            confirmation: "CONF-2024-003",
            bookedOn: "2024-03-20",
            totalAmount: 1299,
            paidAmount: 1299,
            paymentMethod: "Credit Card ****9012",
            cancellationPolicy: "Free cancellation up to 7 days before check-in",
          },
          itinerary: [
            {
              date: "2024-08-05",
              activity: "Check-in at Resort",
              time: "15:00",
              location: "Bali Beach Resort",
            },
            {
              date: "2024-08-07",
              activity: "Snorkeling Trip",
              time: "09:00",
              location: "Resort Marina",
            },
            {
              date: "2024-08-10",
              activity: "Cultural Tour",
              time: "08:00",
              location: "Hotel Lobby",
            },
          ],
        },
      }

      const selectedBooking = mockBookings[bookingId]

      if (selectedBooking) {
        setBooking(selectedBooking)
      } else {
        setBooking(null)
      }

      setLoading(false)
    } catch (err) {
      console.error("Failed to fetch booking detail:", err)
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchBookingDetail()
  }, [fetchBookingDetail])

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

  const handleModifyBooking = () => {
    toast({
      title: "Modify Booking",
      description: "Redirecting to booking modification page...",
    })
    // In a real app, you would navigate to a modify booking page
    setTimeout(() => {
      router.push(`/bookings/${booking?.id}/modify`)
    }, 1000)
  }

  const handleCancelBooking = () => {
    if (confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      setBooking((prev) => (prev ? { ...prev, status: "cancelled" } : null))
      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully. You will receive a confirmation email shortly.",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking not found</h1>
          <p className="text-gray-600 mb-6">The booking you&apos;re looking for does not exist or has been removed.</p>
          <Link href="/bookings">
            <Button>Back to Bookings</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/bookings" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bookings
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{booking.title}</h1>
              <div className="flex items-center space-x-4">
                <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                <span className="text-gray-600">Ref: {booking.bookingReference}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">${booking.price}</div>
              <div className="text-gray-600">Total Amount</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <Image
                    src={booking.image || "/placeholder.svg"}
                    alt={booking.title}
                    width={150}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{booking.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{booking.destination}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(booking.date).toLocaleDateString()}
                          {booking.endDate && ` - ${new Date(booking.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      {booking.passengers && (
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{booking.passengers} passenger(s)</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            {booking.itinerary && (
              <Card>
                <CardHeader>
                  <CardTitle>Itinerary</CardTitle>
                  <CardDescription>Your travel schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {booking.itinerary.map((item, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="text-center min-w-[80px]">
                          <div className="text-sm font-medium text-gray-900">
                            {new Date(item.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                          {item.time && <div className="text-xs text-gray-500">{item.time}</div>}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.activity}</h4>
                          <p className="text-sm text-gray-600">{item.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600">Confirmation Number</div>
                  <div className="font-medium">{booking.details.confirmation}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-gray-600">Booked On</div>
                  <div className="font-medium">{new Date(booking.details.bookedOn).toLocaleDateString()}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-gray-600">Payment Method</div>
                  <div className="font-medium">{booking.details.paymentMethod}</div>
                </div>
                <Separator />
                <div>
                  <div className="text-sm text-gray-600">Total Amount</div>
                  <div className="font-medium">${booking.details.totalAmount}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Amount Paid</div>
                  <div className="font-medium text-green-600">${booking.details.paidAmount}</div>
                </div>
                {booking.details.paidAmount < booking.details.totalAmount && (
                  <div>
                    <div className="text-sm text-gray-600">Remaining Balance</div>
                    <div className="font-medium text-red-600">
                      ${booking.details.totalAmount - booking.details.paidAmount}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  onClick={() => {
                    toast({
                      title: "Voucher Downloaded",
                      description: "Your booking voucher has been downloaded successfully.",
                    })
                  }}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Voucher
                </Button>
                {booking.status === "confirmed" && (
                  <>
                    <Button variant="outline" className="w-full bg-transparent" onClick={handleModifyBooking}>
                      Modify Booking
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent text-red-600 border-red-200 hover:bg-red-50"
                      onClick={handleCancelBooking}
                    >
                      Cancel Booking
                    </Button>
                  </>
                )}
                {booking.status === "pending" && booking.details.paidAmount < booking.details.totalAmount && (
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      toast({
                        title: "Payment Processing",
                        description: "Redirecting to payment page...",
                      })
                    }}
                  >
                    Complete Payment
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <a href="tel:+15551234567">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
                  <Link href="/support">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Support
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader>
                <CardTitle>Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{booking.details.cancellationPolicy}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
