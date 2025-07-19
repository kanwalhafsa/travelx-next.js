"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, MapPin, CalendarIcon, Users, Plane, Clock, ArrowRight } from "lucide-react"
import { format } from "date-fns"

interface Flight {
  id: number
  airline: string
  flightNumber: string
  from: string
  to: string
  departure: string
  arrival: string
  duration: string
  price: number
  stops: number
  aircraft: string
}

interface BookingData {
  type: string
  title: string
  price: number
  destination: string
}

export default function FlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(false)
  const [searchForm, setSearchForm] = useState({
    from: "",
    to: "",
    departure: undefined as Date | undefined,
    return: undefined as Date | undefined,
    passengers: "1",
    class: "economy",
  })

  const mockFlights: Flight[] = [
    {
      id: 1,
      airline: "Emirates",
      flightNumber: "EK205",
      from: "New York (JFK)",
      to: "Dubai (DXB)",
      departure: "10:30 AM",
      arrival: "11:45 PM",
      duration: "12h 15m",
      price: 899,
      stops: 0,
      aircraft: "Boeing 777",
    },
    {
      id: 2,
      airline: "Qatar Airways",
      flightNumber: "QR711",
      from: "London (LHR)",
      to: "Tokyo (NRT)",
      departure: "2:15 PM",
      arrival: "9:30 AM+1",
      duration: "11h 45m",
      price: 1299,
      stops: 0,
      aircraft: "Airbus A350",
    },
    {
      id: 3,
      airline: "Singapore Airlines",
      flightNumber: "SQ25",
      from: "Singapore (SIN)",
      to: "Sydney (SYD)",
      departure: "6:20 AM",
      arrival: "5:35 PM",
      duration: "8h 15m",
      price: 756,
      stops: 0,
      aircraft: "Airbus A380",
    },
  ]

  const handleSearch = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setFlights(mockFlights)
    setLoading(false)
  }

  const handleBookFlight = (flight: Flight) => {
    const bookingData: BookingData = {
      type: "flight",
      title: `${flight.airline} ${flight.flightNumber}`,
      price: flight.price,
      destination: flight.to,
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
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Search Flights</h1>
          <p className="text-lg text-gray-600">Find and book the best flights for your journey</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Departure city"
                    className="pl-10"
                    value={searchForm.from}
                    onChange={(e) => setSearchForm({ ...searchForm, from: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Destination city"
                    className="pl-10"
                    value={searchForm.to}
                    onChange={(e) => setSearchForm({ ...searchForm, to: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Departure</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchForm.departure ? format(searchForm.departure, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchForm.departure}
                      onSelect={(date) => setSearchForm({ ...searchForm, departure: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Passengers</label>
                <Select
                  value={searchForm.passengers}
                  onValueChange={(value) => setSearchForm({ ...searchForm, passengers: value })}
                >
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
              onClick={handleSearch}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
              disabled={loading}
            >
              <Search className="mr-2 w-4 h-4" />
              {loading ? "Searching..." : "Search Flights"}
            </Button>
          </CardContent>
        </Card>

        {/* Flight Results */}
        {flights.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Available Flights</h2>
            {flights.map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Plane className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{flight.airline}</h3>
                          <p className="text-gray-600">
                            {flight.flightNumber} • {flight.aircraft}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-semibold">{flight.from}</p>
                          <p className="text-lg font-bold text-blue-600">{flight.departure}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-gray-500">Duration</p>
                          <div className="flex items-center justify-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-semibold">{flight.duration}</span>
                          </div>
                          <Badge variant={flight.stops === 0 ? "default" : "secondary"}>
                            {flight.stops === 0 ? "Non-stop" : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-semibold">{flight.to}</p>
                          <p className="text-lg font-bold text-blue-600">{flight.arrival}</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <p className="text-3xl font-bold text-gray-900">${flight.price}</p>
                      <p className="text-sm text-gray-500 mb-4">per person</p>
                      <Button
                        onClick={() => handleBookFlight(flight)}
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

        {flights.length === 0 && !loading && (
          <div className="text-center py-12">
            <Plane className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Search for flights to see available options</p>
          </div>
        )}
      </div>
    </div>
  )
}