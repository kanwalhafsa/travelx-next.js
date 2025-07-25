import { NextResponse } from "next/server"

// Mock destinations data
const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    continent: "Asia",
    image: "/images/bali.jpeg?height=300&width=400",
    price: 899,
    rating: 4.8,
    reviews: 2847,
    description: "Tropical paradise with stunning beaches and rich culture",
    category: "Beach",
    highlights: ["Beautiful beaches", "Rich culture", "Affordable luxury", "Great food"],
    bestTime: "April to October",
    duration: "7-10 days",
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan",
    continent: "Asia",
    image: "/images/tokyo.jpg?height=300&width=400",
    price: 1299,
    rating: 4.9,
    reviews: 3521,
    description: "Modern metropolis blending tradition and innovation",
    category: "City",
    highlights: ["Modern architecture", "Traditional temples", "Amazing food", "Technology"],
    bestTime: "March to May, September to November",
    duration: "5-7 days",
  },
  {
    id: 3,
    name: "Santorini",
    country: "Greece",
    continent: "Europe",
    image: "/images/greece.jpeg?height=300&width=400",
    price: 1099,
    rating: 4.7,
    reviews: 1923,
    description: "Iconic white buildings overlooking the Aegean Sea",
    category: "Beach",
    highlights: ["Stunning sunsets", "White architecture", "Wine tasting", "Romantic atmosphere"],
    bestTime: "April to October",
    duration: "4-6 days",
  },
  {
    id: 4,
    name: "Dubai",
    country: "UAE",
    continent: "Asia",
    image: "/images/dubai.jpeg?height=300&width=400",
    price: 1499,
    rating: 4.6,
    reviews: 2156,
    description: "Luxury destination with modern architecture",
    category: "City",
    highlights: ["Luxury shopping", "Modern architecture", "Desert safari", "Fine dining"],
    bestTime: "November to March",
    duration: "4-5 days",
  },
  {
    id: 5,
    name: "Machu Picchu",
    country: "Peru",
    continent: "South America",
    image: "/images/machu.jpeg?height=300&width=400",
    price: 1899,
    rating: 4.9,
    reviews: 1654,
    description: "Ancient Incan citadel high in the Andes Mountains",
    category: "Adventure",
    highlights: ["Ancient ruins", "Mountain hiking", "Rich history", "Breathtaking views"],
    bestTime: "May to September",
    duration: "3-4 days",
  },
  {
    id: 6,
    name: "Safari Kenya",
    country: "Kenya",
    continent: "Africa",
    image: "/images/safari.jpeg?height=300&width=400",
    price: 2299,
    rating: 4.8,
    reviews: 987,
    description: "Wildlife safari in the heart of Africa",
    category: "Adventure",
    highlights: ["Big Five wildlife", "Great migration", "Cultural experiences", "Photography"],
    bestTime: "July to October",
    duration: "7-10 days",
  },
  {
    id: 7,
    name: "Paris",
    country: "France",
    continent: "Europe",
    image: "/images/paris.jpg?height=300&width=400",
    price: 1199,
    rating: 4.7,
    reviews: 4521,
    description: "City of lights and romance",
    category: "City",
    highlights: ["Eiffel Tower", "Art museums", "Fine dining", "Fashion"],
    bestTime: "April to June, September to October",
    duration: "4-6 days",
  },
  {
    id: 8,
    name: "Maldives",
    country: "Maldives",
    continent: "Asia",
    image: "/images/maldives.jpg?height=300&width=400",
    price: 2599,
    rating: 4.9,
    reviews: 1876,
    description: "Tropical paradise with overwater bungalows",
    category: "Beach",
    highlights: ["Crystal clear waters", "Overwater villas", "Snorkeling", "Luxury resorts"],
    bestTime: "November to April",
    duration: "5-7 days",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(destinations)
  } catch (error) {
    console.error("Error fetching destinations:", error)
    return NextResponse.json({ message: "Failed to fetch destinations" }, { status: 500 })
  }
}
