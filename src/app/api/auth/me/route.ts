import { type NextRequest, NextResponse } from "next/server"

// Define User interface
interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

// Extend global interface
declare global {
  var userStore: User[]
}

// Initialize global user store
if (!global.userStore) {
  global.userStore = []
}

// Simple token verification (replace with proper JWT library in production)
function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString())
    if (payload.exp < Date.now()) {
      return null // Token expired
    }
    return { userId: payload.userId, email: payload.email }
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const userStore = global.userStore

    // Find user
    const user = userStore.find((u) => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    // Return user data (without password)
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({ message: "Invalid token" }, { status: 401 })
  }
}
