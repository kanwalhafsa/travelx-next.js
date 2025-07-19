"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"

interface FAQItem {
  id: number
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "How do I book a trip with TravelX?",
      answer:
        "You can book a trip by browsing our destinations or packages, selecting your preferred option, and following the booking process. You can also contact our travel specialists for personalized assistance.",
      category: "booking",
    },
    {
      id: 2,
      question: "What is your cancellation policy?",
      answer:
        "Cancellation policies vary by booking type and supplier. Generally, you can cancel up to 24-48 hours before departure for a full refund. Please check your booking confirmation for specific terms.",
      category: "cancellation",
    },
    {
      id: 3,
      question: "Do you offer travel insurance?",
      answer:
        "Yes, we partner with leading insurance providers to offer comprehensive travel insurance. This includes coverage for trip cancellation, medical emergencies, lost luggage, and more.",
      category: "insurance",
    },
    {
      id: 4,
      question: "How can I modify my existing booking?",
      answer:
        "You can modify your booking through your account dashboard or by contacting our customer support team. Modification fees may apply depending on the supplier's terms.",
      category: "booking",
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through encrypted channels.",
      category: "payment",
    },
    {
      id: 6,
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use industry-standard SSL encryption to protect your personal and payment information. We never share your data with third parties without your consent.",
      category: "security",
    },
    {
      id: 7,
      question: "Do you provide 24/7 customer support?",
      answer:
        "Yes, we offer 24/7 emergency support for travelers. Our regular customer service is available Monday-Friday 9AM-6PM, and weekends 10AM-4PM.",
      category: "support",
    },
    {
      id: 8,
      question: "Can I earn rewards or loyalty points?",
      answer:
        "Yes! Our TravelX Rewards program lets you earn points on every booking. Points can be redeemed for discounts on future trips, upgrades, and exclusive experiences.",
      category: "rewards",
    },
    {
      id: 9,
      question: "What happens if my flight is cancelled?",
      answer:
        "If your flight is cancelled, we'll work with the airline to rebook you on the next available flight at no extra cost. If no suitable alternative is available, you'll receive a full refund.",
      category: "support",
    },
    {
      id: 10,
      question: "Do you offer group booking discounts?",
      answer:
        "Yes, we offer special rates for group bookings of 10 or more people. Contact our group travel specialists for customized packages and pricing.",
      category: "booking",
    },
  ]

  const toggleItem = (id: number) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about our services</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-6 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  {openItems.includes(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="mt-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600">
                <a href="/contact">Contact Support</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="tel:+15551234567">Call Us: +1 (555) 123-4567</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
