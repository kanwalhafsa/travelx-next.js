"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plane, Twitter, Instagram, Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Plane className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TravelX</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your gateway to amazing travel experiences around the world. Discover, explore, and create memories that
              last a lifetime.
            </p>
            <div className="flex space-x-4">
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white" asChild>
                <Link
                  href="https://www.linkedin.com/in/hafsa-kanwal-2945442b7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white" asChild>
                <Link href="https://x.com/kanwal51911" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-400 hover:text-white" asChild>
                <Link href="https://github.com/kanwalhafsa" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </Link>
              </Button>
              
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { href: "/destinations", label: "Destinations" },
                { href: "/packages", label: "Travel Packages" },
                { href: "/hotels", label: "Hotels" },
                { href: "/flights", label: "Flights" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2">
              {[
                { href: "/help", label: "Help Center" },
                { href: "/faq", label: "FAQ" },
                { href: "/terms", label: "Terms of Service" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/refund", label: "Refund Policy" },
                { href: "/support", label: "Customer Support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>info@travelx.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>123 Travel St, Adventure City</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Newsletter</h5>
              <p className="text-sm text-gray-400">Subscribe for travel deals and updates</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => {
                    const emailInput = document.querySelector('input[placeholder="Your email"]') as HTMLInputElement
                    if (emailInput && emailInput.value) {
                      alert(`Thank you for subscribing with email: ${emailInput.value}`)
                      emailInput.value = ""
                    } else {
                      alert("Please enter your email address")
                    }
                  }}
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 TravelX. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/refund" className="text-gray-400 hover:text-white text-sm transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
