import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Globe, Award, Heart, Plane } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  const stats = [
    { icon: Users, label: "Happy Travelers", value: "50,000+" },
    { icon: Globe, label: "Destinations", value: "200+" },
    { icon: Award, label: "Awards Won", value: "25+" },
    { icon: Plane, label: "Years Experience", value: "15+" },
  ]

  const team = [
    {
      name: "Jack Johnson",
      role: "CEO & Founder",
      image: "/images/story1.jpg?height=300&width=300",
      bio: "Travel enthusiast with 20+ years in the industry",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/images/story2.jpg?height=300&width=300",
      bio: "Expert in travel logistics and customer experience",
    },
    {
      name: "Alfie Rodriguez",
      role: "Travel Specialist",
      image: "/images/story3.jpg?height=300&width=300",
      bio: "Passionate about creating unforgettable journeys",
    },
    {
      name: "David Kim",
      role: "Technology Director",
      image: "/images/story4.jpg?height=300&width=300",
      bio: "Building the future of travel technology",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion for Travel",
      description: "We believe travel transforms lives and creates lasting memories",
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction and safety are our top priorities",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting you to amazing destinations worldwide",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to delivering exceptional travel experiences",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About TravelX</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Your trusted travel companion for over 15 years, creating unforgettable journeys around the world
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2009, TravelX began as a small travel agency with a big dream: to make extraordinary travel
                  experiences accessible to everyone. What started as a passion project by a group of travel enthusiasts
                  has grown into one of the most trusted names in the travel industry.
                </p>
                <p>
                  Over the years, {"we've"} helped more than 50,000 travelers explore 200+ destinations across the globe.
                  From romantic getaways to family adventures, business trips to solo expeditions, {"we've"} been there
                  every step of the way.
                </p>
                <p>
                  Today, we continue to innovate and expand our services, always keeping our core mission at heart: to
                  create meaningful travel experiences that enrich lives and create lasting memories.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/story.jpeg?height=400&width=600"
                alt="TravelX Story"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The passionate people behind your amazing travel experiences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed">
            {"To inspire and enable people to explore the world by providing exceptional travel experiences, personalized service, and innovative solutions that create lasting memories and meaningful connections."}
          </p>
        </div>
      </section>
    </div>
  )
}