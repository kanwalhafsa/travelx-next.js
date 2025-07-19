"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, MapPin, CalendarIcon, Car, Users, Fuel, Settings, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

interface CarRental {
  id: number
  name: string
  category: string
  seats: number
  transmission: string
  fuel: string
  price: number
  image: string
  features: string[]
  company: string
}

export default function CarsPage() {
  const [cars, setCars] = useState<CarRental[]>([])
  const [loading, setLoading] = useState(false)
  const [searchForm, setSearchForm] = useState({
    location: "",
    pickup: undefined as Date | undefined,
    dropoff: undefined as Date | undefined,
    carType: "economy",
  })

  const mockCars: CarRental[] = [
    {
      id: 1,
      name: "Toyota Corolla",
      category: "Economy",
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      price: 45,
      image: "/images/toyota.png?height=200&width=300",
      features: ["Air Conditioning", "Bluetooth", "GPS"],
      company: "Hertz",
    },
    {
      id: 2,
      name: "BMW 3 Series",
      category: "Luxury",
      seats: 5,
      transmission: "Automatic",
      fuel: "Petrol",
      price: 120,
      image: "/images/bmw3.jpeg?height=200&width=300",
      features: ["Leather Seats", "Premium Audio", "GPS", "Sunroof"],
      company: "Avis",
    },
    {
      id: 3,
      name: "Ford Explorer",
      category: "SUV",
      seats: 7,
      transmission: "Automatic",
      fuel: "Petrol",
      price: 85,
      image: "/images/ford.jpeg?height=200&width=300",
      features: ["4WD", "Large Boot", "GPS", "7 Seats"],
      company: "Enterprise",
    },
  ]

  const handleSearch = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setCars(mockCars)
    setLoading(false)
  }

  const handleBookCar = (car: CarRental) => {
    const bookingData = {
      type: "car",
      title: `${car.name} - ${car.category}`,
      price: car.price,
      destination: searchForm.location,
    }

    const params = new URLSearchParams(bookingData as any)
    window.location.href = `/checkout?${params.toString()}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Rent a Car</h1>
          <p className="text-lg text-gray-600">Find and book the perfect car for your journey</p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pick-up Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Pick-up location"
                    className="pl-10"
                    value={searchForm.location}
                    onChange={(e) => setSearchForm({ ...searchForm, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Pick-up Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchForm.pickup ? format(searchForm.pickup, "PPP") : "Pick-up date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchForm.pickup}
                      onSelect={(date) => setSearchForm({ ...searchForm, pickup: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Drop-off Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {searchForm.dropoff ? format(searchForm.dropoff, "PPP") : "Drop-off date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={searchForm.dropoff}
                      onSelect={(date) => setSearchForm({ ...searchForm, dropoff: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Car Type</label>
                <Select
                  value={searchForm.carType}
                  onValueChange={(value) => setSearchForm({ ...searchForm, carType: value })}
                >
                  <SelectTrigger>
                    <Car className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Economy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="midsize">Midsize</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
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
              {loading ? "Searching..." : "Search Cars"}
            </Button>
          </CardContent>
        </Card>

        {/* Car Results */}
        {cars.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Available Cars</h2>
            {cars.map((car) => (
              <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <Image
                        src={car.image || "/placeholder.svg"}
                        alt={car.name}
                        width={300}
                        height={200}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
                            <Badge variant="secondary">{car.category}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">by {car.company}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{car.seats} seats</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Settings className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{car.transmission}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Fuel className="w-4 h-4 text-gray-400" />
                              <span className="text-sm">{car.fuel}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-gray-900">${car.price}</p>
                          <p className="text-sm text-gray-500">per day</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {car.features.map((feature, index) => (
                          <Badge key={index} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Button
                        onClick={() => handleBookCar(car)}
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

        {cars.length === 0 && !loading && (
          <div className="text-center py-12">
            <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Search for cars to see available options</p>
          </div>
        )}
      </div>
    </div>
  )
}
