
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  Headphones,
  MessageCircle,
  Mail,
  Phone,
  AlertCircle,
  BookOpen,
  Calendar,
  FileText,
  Settings,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    category: "",
    priority: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const supportChannels = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our travel experts",
      contact: "+1 (555) 123-4567",
      hours: "Mon-Fri: 9AM-6PM EST",
      availability: "Available",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help through live chat",
      contact: "Start Chat",
      hours: "24/7 Available",
      availability: "Online",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us detailed questions via email",
      contact: "support@travelx.com",
      hours: "Response within 24 hours",
      availability: "Always Open",
    },
    {
      icon: AlertCircle,
      title: "Emergency Support",
      description: "24/7 emergency travel assistance",
      contact: "+1 (555) 911-HELP",
      hours: "24/7 Emergency Line",
      availability: "Always Available",
    },
  ]

  const commonIssues = [
    {
      title: "Booking Modification",
      description: "Change dates, destinations, or passenger details",
      category: "booking",
      urgency: "medium",
    },
    {
      title: "Cancellation Request",
      description: "Cancel your booking and request refund",
      category: "cancellation",
      urgency: "high",
    },
    {
      title: "Payment Issues",
      description: "Problems with payment processing or charges",
      category: "payment",
      urgency: "high",
    },
    {
      title: "Travel Documents",
      description: "Questions about visas, passports, or requirements",
      category: "documents",
      urgency: "medium",
    },
    {
      title: "Special Requests",
      description: "Dietary requirements, accessibility, or special needs",
      category: "special",
      urgency: "low",
    },
    {
      title: "Technical Problems",
      description: "Website issues or account access problems",
      category: "technical",
      urgency: "medium",
    },
  ]

  const handleTicketSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Ticket Submitted!",
        description: "We've received your support request and will respond within 24 hours.",
      })

      // Reset form
      setTicketForm({
        subject: "",
        category: "",
        priority: "",
        description: "",
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit ticket. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setTicketForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Headphones className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Support</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {"We're here to help! Get assistance with your bookings, travel questions, or any issues you may have."}
          </p>
        </div>

        <Tabs defaultValue="contact" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="ticket">Submit Ticket</TabsTrigger>
            <TabsTrigger value="help">Self Help</TabsTrigger>
          </TabsList>

          {/* Contact Methods */}
          <TabsContent value="contact" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportChannels.map((channel, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <channel.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{channel.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                    <div className="space-y-2">
                      <p className="font-medium text-blue-600">{channel.contact}</p>
                      <p className="text-xs text-gray-500">{channel.hours}</p>
                      <Badge
                        variant={
                          channel.availability === "Available" || channel.availability === "Online"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {channel.availability}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you can do right now</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/dashboard">
                      <Calendar className="w-6 h-6" />
                      <span>View My Bookings</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/faq">
                      <HelpCircle className="w-6 h-6" />
                      <span>Browse FAQ</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/contact">
                      <Mail className="w-6 h-6" />
                      <span>Contact Form</span>
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Ticket */}
          <TabsContent value="ticket" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Submit Support Ticket</CardTitle>
                <CardDescription>Provide detailed information about your issue for faster resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTicketSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={ticketForm.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={ticketForm.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Booking Issues</SelectItem>
                          <SelectItem value="payment">Payment Problems</SelectItem>
                          <SelectItem value="cancellation">Cancellation</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={ticketForm.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={ticketForm.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Please provide detailed information about your issue..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Self Help */}
          <TabsContent value="help" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {commonIssues.map((issue, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg">{issue.title}</h3>
                      <Badge
                        variant={
                          issue.urgency === "high"
                            ? "destructive"
                            : issue.urgency === "medium"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {issue.urgency}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{issue.description}</p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <Link href="/help">Get Help</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resources */}
            <Card>
              <CardHeader>
                <CardTitle>Helpful Resources</CardTitle>
                <CardDescription>Find answers and guides for common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/faq">
                      <BookOpen className="w-6 h-6" />
                      <span>FAQ</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/terms">
                      <FileText className="w-6 h-6" />
                      <span>Terms of Service</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/privacy">
                      <Settings className="w-6 h-6" />
                      <span>Privacy Policy</span>
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent"
                    asChild
                  >
                    <Link href="/contact">
                      <Mail className="w-6 h-6" />
                      <span>Contact Us</span>
                    </Link>
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
