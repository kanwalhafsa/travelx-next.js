"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, HelpCircle, MessageCircle, Phone, Mail, Clock, ChevronRight } from "lucide-react"
import Link from "next/link"

interface HelpArticle {
  id: number
  title: string
  description: string
  category: string
  readTime: string
  helpful: number
}

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const helpArticles: HelpArticle[] = [
    {
      id: 1,
      title: "How to book your first trip",
      description: "Step-by-step guide to booking your perfect vacation",
      category: "Getting Started",
      readTime: "5 min read",
      helpful: 245,
    },
    {
      id: 2,
      title: "Understanding our cancellation policy",
      description: "Learn about cancellation terms and refund processes",
      category: "Policies",
      readTime: "3 min read",
      helpful: 189,
    },
    {
      id: 3,
      title: "Managing your booking",
      description: "How to modify, cancel, or view your reservations",
      category: "Account",
      readTime: "4 min read",
      helpful: 156,
    },
    {
      id: 4,
      title: "Payment methods and security",
      description: "Secure payment options and protecting your information",
      category: "Payments",
      readTime: "6 min read",
      helpful: 203,
    },
    {
      id: 5,
      title: "Travel insurance guide",
      description: "Everything you need to know about travel protection",
      category: "Insurance",
      readTime: "8 min read",
      helpful: 167,
    },
    {
      id: 6,
      title: "Loyalty program benefits",
      description: "Maximize your rewards and earn points on every trip",
      category: "Rewards",
      readTime: "5 min read",
      helpful: 134,
    },
    {
      id: 7,
      title: "Flight booking tips",
      description: "Best practices for finding and booking flights",
      category: "Booking",
      readTime: "7 min read",
      helpful: 298,
    },
    {
      id: 8,
      title: "Hotel reservation guide",
      description: "How to find and book the perfect accommodation",
      category: "Booking",
      readTime: "6 min read",
      helpful: 234,
    },
    {
      id: 9,
      title: "Troubleshooting login issues",
      description: "Common login problems and their solutions",
      category: "Technical",
      readTime: "4 min read",
      helpful: 178,
    },
    {
      id: 10,
      title: "Mobile app features",
      description: "Complete guide to using our mobile application",
      category: "Technical",
      readTime: "10 min read",
      helpful: 156,
    },
  ]

  const categories = [
    { name: "Getting Started", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Booking", count: 18, color: "bg-green-100 text-green-800" },
    { name: "Payments", count: 8, color: "bg-purple-100 text-purple-800" },
    { name: "Account", count: 15, color: "bg-orange-100 text-orange-800" },
    { name: "Policies", count: 6, color: "bg-red-100 text-red-800" },
    { name: "Technical", count: 9, color: "bg-gray-100 text-gray-800" },
    { name: "Insurance", count: 4, color: "bg-yellow-100 text-yellow-800" },
    { name: "Rewards", count: 7, color: "bg-pink-100 text-pink-800" },
  ]

  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory ? article.category === selectedCategory : true

    return matchesSearch && matchesCategory
  })

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-lg text-gray-600 mb-8">Find answers, guides, and get the support you need</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 py-4 text-lg border-2 border-gray-200 focus:border-blue-500"
            />
            {(searchTerm || selectedCategory) && (
              <Button onClick={clearFilters} variant="outline" size="sm" className="absolute right-2 top-2 bg-white">
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Get instant help from our support team</p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">Speak directly with our travel experts</p>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="tel:+15551234567">+1 (555) 123-4567</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/contact">Send Email</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedCategory === category.name ? "bg-blue-50 border-2 border-blue-200" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge className={category.color}>{category.count}</Badge>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-medium">9AM - 6PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium">10AM - 4PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium">10AM - 2PM</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between">
                    <span>Emergency Support</span>
                    <span className="font-medium text-green-600">24/7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {searchTerm || selectedCategory ? `Search Results (${filteredArticles.length})` : "Popular Articles"}
              </h2>
              <p className="text-gray-600">
                {searchTerm
                  ? `Results for &quot;${searchTerm}&quot;${selectedCategory ? ` in ${selectedCategory}` : ""}`
                  : selectedCategory
                    ? `Articles in ${selectedCategory}`
                    : "Most helpful articles from our community"}
              </p>
            </div>

            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{article.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <span>{article.helpful} people found this helpful</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (searchTerm || selectedCategory) && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t find any articles matching your search. Try different keywords or browse by category.
                </p>
                <Button onClick={clearFilters} variant="outline" className="bg-transparent">
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Still Need Help */}
            <Card className="mt-8">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Still need help?</h3>
                <p className="text-gray-600 mb-6">
                  Can&apos;t find what you&apos;re looking for? Our support team is ready to assist you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                  <Button variant="outline" className="bg-transparent" asChild>
                    <Link href="/faq">View FAQ</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
