import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/component/navbar"
import Footer from "@/component/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TravelX - Your Gateway to Amazing Adventures",
  description:
    "Discover breathtaking destinations, book amazing experiences, and create memories that last a lifetime with TravelX.",
  keywords: "travel, destinations, hotels, flights, packages, vacation, adventure",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
