import { type NextRequest, NextResponse } from "next/server"

// Define types for better TypeScript support
interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

interface ResetTokenData {
  email: string
  expiry: number
}

// Extend global interface to include our custom properties
declare global {
  var userStore: User[]
  var resetTokens: Map<string, ResetTokenData>
}

// Initialize global stores
if (!global.userStore) {
  global.userStore = []
}
if (!global.resetTokens) {
  global.resetTokens = new Map<string, ResetTokenData>()
}

// Generate a simple reset token
function generateResetToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Basic email validation
    if (!email || !email.includes("@")) {
      return NextResponse.json({ message: "Invalid email address" }, { status: 400 })
    }

    const userStore = global.userStore
    const resetTokens = global.resetTokens

    // Check if user exists
    const user = userStore.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json(
        { message: "If an account with that email exists, we've sent a reset link." },
        { status: 200 },
      )
    }

    // Generate reset token
    const resetToken = generateResetToken()
    const expiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours

    // Store reset token
    resetTokens.set(resetToken, {
      email: user.email,
      expiry: expiry,
    })

    // In a real application, you would send an email here
    // For demo purposes, we'll log the reset link
    console.log(
      `Password reset link: ${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/auth/reset-password?token=${resetToken}`,
    )

    return NextResponse.json(
      {
        message: "If an account with that email exists, we've sent a reset link.",
        // For demo purposes only - remove in production
        resetLink: `/auth/reset-password?token=${resetToken}`,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error during forgot password:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
