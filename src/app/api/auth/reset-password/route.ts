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

// Simple password hashing function (same as used in other auth routes)
function hashPassword(password: string): string {
  return Buffer.from(password).toString("base64")
}

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json({ message: "Missing token or password" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const userStore = global.userStore
    const resetTokens = global.resetTokens

    // Check if token exists and is valid
    const tokenData = resetTokens.get(token)
    if (!tokenData) {
      return NextResponse.json({ message: "Invalid or expired reset token" }, { status: 400 })
    }

    // Check if token is expired (24 hours)
    if (Date.now() > tokenData.expiry) {
      resetTokens.delete(token)
      return NextResponse.json({ message: "Reset token has expired" }, { status: 400 })
    }

    // Find user by email
    const user = userStore.find((u) => u.email === tokenData.email)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Hash the new password
    const hashedPassword = hashPassword(password)

    // Update user's password
    user.password = hashedPassword

    // Remove the used token
    resetTokens.delete(token)

    return NextResponse.json({ message: "Password reset successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error during password reset:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
