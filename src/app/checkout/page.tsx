"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import StripeCheckout from "@/component/payment/stripe-checkout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

export default function CheckoutPage() {
  const searchParams = useSearchParams()
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // Get booking details from URL params
  const bookingType = searchParams.get("type") || "package"
  const bookingTitle = searchParams.get("title") || "Travel Package"
  const bookingPrice = Number(searchParams.get("price")) || 999
  const bookingDestination = searchParams.get("destination") || "Amazing Destination"

  const handlePaymentSuccess = (paymentIntentId: string) => {
    setPaymentSuccess(true)
    console.log("Payment successful:", paymentIntentId)
    // Redirect to success page or show confirmation
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
  }

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-green-600">Payment Successful!</CardTitle>
            <CardDescription>
              Your booking has been confirmed. You will receive a confirmation email shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-gray-600">Booking ID: #{Date.now()}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{bookingType}</Badge>
              </div>

              <div>
                <h3 className="font-semibold text-lg">{bookingTitle}</h3>
                <div className="flex items-center gap-1 text-gray-600 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{bookingDestination}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Base Price</span>
                  <span>${bookingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>${Math.round(bookingPrice * 0.1)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>${bookingPrice + Math.round(bookingPrice * 0.1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <div>
            <StripeCheckout
              amount={bookingPrice + Math.round(bookingPrice * 0.1)}
              description={`${bookingTitle} - ${bookingDestination}`}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
