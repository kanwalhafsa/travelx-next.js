"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RefreshCw, Clock, CheckCircle, XCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RefundPage() {
  const refundPolicies = [
    {
      type: "Flights",
      icon: "✈️",
      policies: [
        {
          condition: "Cancellation within 24 hours of booking",
          refund: "100% refund",
          timeframe: "Immediate",
          status: "guaranteed",
        },
        {
          condition: "Cancellation 7+ days before departure",
          refund: "80% refund",
          timeframe: "3-5 business days",
          status: "standard",
        },
        {
          condition: "Cancellation 1-6 days before departure",
          refund: "50% refund",
          timeframe: "5-7 business days",
          status: "partial",
        },
        {
          condition: "No-show or same-day cancellation",
          refund: "No refund",
          timeframe: "N/A",
          status: "none",
        },
      ],
    },
    {
      type: "Hotels",
      icon: "🏨",
      policies: [
        {
          condition: "Cancellation 48+ hours before check-in",
          refund: "100% refund",
          timeframe: "2-3 business days",
          status: "guaranteed",
        },
        {
          condition: "Cancellation 24-48 hours before check-in",
          refund: "75% refund",
          timeframe: "3-5 business days",
          status: "standard",
        },
        {
          condition: "Cancellation within 24 hours of check-in",
          refund: "25% refund",
          timeframe: "5-7 business days",
          status: "partial",
        },
        {
          condition: "No-show",
          refund: "No refund",
          timeframe: "N/A",
          status: "none",
        },
      ],
    },
    {
      type: "Packages",
      icon: "📦",
      policies: [
        {
          condition: "Cancellation 30+ days before departure",
          refund: "90% refund",
          timeframe: "5-7 business days",
          status: "guaranteed",
        },
        {
          condition: "Cancellation 15-29 days before departure",
          refund: "70% refund",
          timeframe: "7-10 business days",
          status: "standard",
        },
        {
          condition: "Cancellation 7-14 days before departure",
          refund: "50% refund",
          timeframe: "10-14 business days",
          status: "partial",
        },
        {
          condition: "Cancellation within 7 days of departure",
          refund: "No refund",
          timeframe: "N/A",
          status: "none",
        },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "guaranteed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "standard":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "partial":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "none":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "guaranteed":
        return "bg-green-100 text-green-800"
      case "standard":
        return "bg-blue-100 text-blue-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "none":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-500 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We understand that travel plans can change. Here's everything you need to know about our refund policies for
            different types of bookings.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Request Refund</h3>
              <p className="text-gray-600 mb-4">Start a refund request for your booking</p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Check Status</h3>
              <p className="text-gray-600 mb-4">Track your existing refund requests</p>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/dashboard">View Status</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
              <p className="text-gray-600 mb-4">Contact our support team</p>
              <Button variant="outline" className="bg-transparent" asChild>
                <Link href="/support">Get Support</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Refund Policies */}
        <div className="space-y-8">
          {refundPolicies.map((category) => (
            <Card key={category.type}>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <span className="text-2xl mr-3">{category.icon}</span>
                  {category.type} Refund Policy
                </CardTitle>
                <CardDescription>Refund terms and conditions for {category.type.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.policies.map((policy, index) => (
                    <div key={index}>
                      <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 mt-1">{getStatusIcon(policy.status)}</div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-gray-900">{policy.condition}</h4>
                            <Badge className={getStatusColor(policy.status)}>{policy.refund}</Badge>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Processing time: {policy.timeframe}</span>
                          </div>
                        </div>
                      </div>
                      {index < category.policies.length - 1 && <Separator className="my-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Important Notes */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-yellow-600" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Processing Times</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Refunds are processed within the stated timeframes</li>
                  <li>• Bank processing may take additional 1-3 business days</li>
                  <li>• Credit card refunds appear as credits on your statement</li>
                  <li>• PayPal refunds are typically instant</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Special Circumstances</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Medical emergencies may qualify for full refunds</li>
                  <li>• Natural disasters and travel advisories considered</li>
                  <li>• Travel insurance may cover additional scenarios</li>
                  <li>• Documentation required for special circumstances</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="mt-8">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Questions about refunds?</h3>
            <p className="text-gray-600 mb-6">
              Our customer support team is here to help you understand our refund policies and process your requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600" asChild>
                <Link href="/support">Contact Support</Link>
              </Button>
              <Button variant="outline" className="bg-transparent" asChild>
                <a href="tel:+15551234567">Call: +1 (555) 123-4567</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
