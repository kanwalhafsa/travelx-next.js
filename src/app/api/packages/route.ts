import { NextResponse } from "next/server"

// Mock packages data
const packages = [
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
    includes: ["Accommodation", "Breakfast", "Guided tours", "Transportation", "Museum entries"],
    itinerary: [
      { day: 1, city: "Paris", activities: ["Arrival", "Eiffel Tower visit", "Seine River cruise"] },
      { day: 2, city: "Paris", activities: ["Louvre Museum", "Notre Dame", "Champs-Élysées"] },
      { day: 3, city: "Rome", activities: ["Colosseum", "Roman Forum", "Vatican City"] },
    ],
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
    includes: ["Accommodation", "All meals", "Activities", "Local guide", "Transportation"],
    itinerary: [
      { day: 1, city: "Bangkok", activities: ["Arrival", "Grand Palace", "Wat Pho Temple"] },
      { day: 2, city: "Bangkok", activities: ["Floating market", "Thai cooking class"] },
      { day: 3, city: "Siem Reap", activities: ["Angkor Wat sunrise", "Angkor Thom"] },
    ],
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
    includes: ["Luxury lodges", "All meals", "Game drives", "Park fees", "Professional guide"],
    itinerary: [
      { day: 1, city: "Serengeti", activities: ["Arrival", "Evening game drive"] },
      { day: 2, city: "Serengeti", activities: ["Full day safari", "Big Five spotting"] },
      { day: 3, city: "Ngorongoro", activities: ["Crater tour", "Masai village visit"] },
    ],
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
    includes: ["Hotels", "JR Pass", "Cultural experiences", "Some meals", "English guide"],
    itinerary: [
      { day: 1, city: "Tokyo", activities: ["Arrival", "Shibuya crossing", "Tokyo Tower"] },
      { day: 2, city: "Tokyo", activities: ["Senso-ji Temple", "Tsukiji Market", "Imperial Palace"] },
      { day: 3, city: "Kyoto", activities: ["Fushimi Inari", "Kinkaku-ji", "Gion district"] },
    ],
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
    includes: ["Beach resorts", "Island transfers", "Water activities", "Breakfast", "Snorkeling gear"],
    itinerary: [
      { day: 1, city: "Barbados", activities: ["Arrival", "Beach relaxation", "Sunset cruise"] },
      { day: 2, city: "Barbados", activities: ["Snorkeling", "Rum distillery tour"] },
      { day: 3, city: "St. Lucia", activities: ["Pitons hike", "Sulphur springs"] },
    ],
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
    includes: ["Teahouse accommodation", "All meals", "Permits", "Sherpa guide", "Equipment"],
    itinerary: [
      { day: 1, city: "Kathmandu", activities: ["Arrival", "Durbar Square", "Preparation"] },
      { day: 2, city: "Lukla", activities: ["Flight to Lukla", "Trek to Phakding"] },
      { day: 3, city: "Namche", activities: ["Trek to Namche Bazaar", "Acclimatization"] },
    ],
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return NextResponse.json(packages)
  } catch (error) {
    console.error("Error fetching packages:", error)
    return NextResponse.json({ message: "Failed to fetch packages" }, { status: 500 })
  }
}
