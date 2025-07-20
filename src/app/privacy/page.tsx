import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
                <li>Analyze website performance and usage</li>
                <li>Deliver personalized advertisements</li>
                <li>Enable social media features</li>
              </ul>
              <p>
                You can manage your cookie preferences through your browser settings or our cookie consent tool.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Children&#39;s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              {/* Test comment to verify file update */}
              <p>
                {"Our services are not intended for children under 13. We don't knowingly collect personal information from children under 13. If we become aware of such collection, we will delete the information immediately."}
              </p>
              <p>
                {"If you're a parent or guardian and believe your child has provided us with personal information, please contact us immediately."}
              </p>
              <p>
                {"We'll take prompt action to investigate and remove any such data from our systems."}
              </p>
              <p>
                {"It's our priority to ensure compliance with all applicable child protection laws."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li>Access: Request a copy of your personal data</li>
                <li>Correction: Request correction of inaccurate data</li>
                <li>Deletion: Request deletion of your data</li>
                <li>Restriction: Restrict how we process your data</li>
                <li>Portability: Receive your data in a portable format</li>
                <li>Objection: Object to certain types of processing, such as marketing</li>
              </ul>
              <p>
                To exercise these rights, please contact us at <a href="mailto:privacy@travelapp.com">privacy@travelapp.com</a>.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Third-Party Links</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or
                content of these websites. We encourage you to review their privacy policies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure that such
                transfers comply with applicable data protection laws.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by posting
                the updated policy on our website or by email.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>11. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p>
                Email: <a href="mailto:support@travelapp.com">support@travelapp.com</a>
              </p>
              <p>
                Address: Travel App Inc., 123 Adventure Lane, Suite 100, Wanderlust City, TX 12345
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}