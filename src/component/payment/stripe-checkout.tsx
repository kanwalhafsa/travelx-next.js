"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Lock } from "lucide-react"

interface StripeCheckoutProps {
  amount: number
  currency?: string
  description: string
  onSuccess?: (paymentIntentId: string) => void
  onError?: (error: string) => void
}

export default function StripeCheckout({
  amount,
  currency = "usd",
  description,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const [loading, setLoading] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Create payment intent
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          metadata: {
            description,
          },
        }),
      })

      const { paymentIntentId } = await response.json()

      // Simulate payment processing (replace with actual Stripe integration)
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful payment
      toast({
        title: "Payment Successful!",
        description: `Your payment of $${amount} has been processed.`,
      })

      onSuccess?.(paymentIntentId)
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Payment failed. Please try again."
      toast({
        title: "Payment Failed",
        description: errorMessage,
        variant: "destructive",
      })
      onError?.(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setCardDetails((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Details
        </CardTitle>
        <CardDescription>
          {description} - ${amount} {currency.toUpperCase()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardholderName">Cardholder Name</Label>
            <Input
              id="cardholderName"
              placeholder="John Doe"
              value={cardDetails.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={cardDetails.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              maxLength={19}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                maxLength={5}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                maxLength={4}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600" disabled={loading}>
            {loading ? (
              "Processing..."
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pay ${amount}
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">Your payment information is secure and encrypted</p>
        </form>
      </CardContent>
    </Card>
  )
}