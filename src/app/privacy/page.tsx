import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">Last Updated: January 1, 2024</Badge>
          </div>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>1.1 Personal Information</h4>
              <p>We collect information you provide directly to us, such as:</p>
              <ul>
                <li>Name, email address, phone number</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Travel preferences and special requirements</li>
                <li>Passport and visa information when required</li>
              </ul>

              <h4>1.2 Automatically Collected Information</h4>
              <p>We automatically collect certain information when you use our services:</p>
              <ul>
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use your information to:</p>
              <ul>
                <li>Process and fulfill your travel bookings</li>
                <li>Communicate with you about your reservations</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send you promotional offers and travel deals (with your consent)</li>
                <li>Improve our services and website functionality</li>
                <li>Comply with legal obligations and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Information Sharing and Disclosure</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4>3.1 Service Providers</h4>
              <p>
                We share your information with third-party service providers who help us operate our business, including
                airlines, hotels, car rental companies, and payment processors.
              </p>

              <h4>3.2 Legal Requirements</h4>
              <p>
                We may disclose your information if required by law, court order, or government regulation, or to
                protect our rights and safety.
              </p>

              <h4>3.3 Business Transfers</h4>
              <p>
                In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new
                entity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We implement appropriate technical and organizational measures to protect your personal information:
              </p>
              <ul>
                <li>SSL encryption for all data transmission</li>
                <li>Secure servers with restricted access</li>
                <li>Regular security audits and updates</li>
                <li>Employee training on data protection</li>
                <li>PCI DSS compliance for payment processing</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>We use cookies and similar technologies to:</p>
              <ul>
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Provide personalized content and advertisements</li>
                <li>Improve website functionality and user experience</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences, but some features may not work
                properly if cookies are disabled.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>You have the right to:</p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Delete your account and personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Object to certain processing activities</li>
              </ul>
              <p>
                To exercise these rights, please contact us at privacy@travelx.com or through your account settings.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure
                appropriate safeguards are in place to protect your data in accordance with applicable laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Our services are not intended for children under 13. We do not knowingly collect personal information
                from children under 13. If we become aware of such collection, we will delete the information
                immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by
                posting the new policy on our website and updating the "Last Updated" date.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us:</p>
              <ul>
                <li>Email: privacy@travelx.com</li>
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
