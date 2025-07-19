import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">Last Updated: January 1, 2024</Badge>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                By accessing and using TravelX services, you accept and agree to be bound by the terms and provision of
                this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Booking and Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>2.1 Booking Process</h4>
              <p>
                All bookings are subject to availability and confirmation. A booking is only confirmed when you receive
                a confirmation email from us.
              </p>

              <h4>2.2 Payment</h4>
              <p>
                Full payment is required at the time of booking unless otherwise specified. We accept major credit
                cards, PayPal, and bank transfers.
              </p>

              <h4>2.3 Pricing</h4>
              <p>
                All prices are subject to change without notice until booking is confirmed. Prices include all
                applicable taxes unless otherwise stated.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Cancellation and Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>3.1 Cancellation by Customer</h4>
              <ul>
                <li>Cancellations made 30+ days before departure: Full refund minus processing fee</li>
                <li>Cancellations made 15-29 days before departure: 50% refund</li>
                <li>Cancellations made less than 15 days before departure: No refund</li>
              </ul>

              <h4>3.2 Cancellation by TravelX</h4>
              <p>
                We reserve the right to cancel any booking due to circumstances beyond our control. In such cases, you
                will receive a full refund or alternative arrangements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Travel Documents and Requirements</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                You are responsible for ensuring you have valid travel documents including passports, visas, and health
                certificates. We are not liable for any issues arising from invalid or missing documentation.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                TravelX acts as an intermediary between you and travel service providers. We are not liable for any
                acts, errors, omissions, representations, warranties, breaches or negligence of any such suppliers.
              </p>

              <p>
                Our total liability shall not exceed the total amount paid by you for the specific booking in question.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Force Majeure</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We shall not be liable for any failure to perform our obligations due to circumstances beyond our
                reasonable control, including but not limited to natural disasters, war, terrorism, government actions,
                or pandemic restrictions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and
                protect your personal information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Any disputes arising from these terms shall be resolved through binding arbitration in accordance with
                the rules of the American Arbitration Association.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting. Your continued use of our services constitutes acceptance of any changes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <ul>
                <li>Email: legal@travelx.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>Address: 123 Travel Street, Adventure City, AC 12345</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
