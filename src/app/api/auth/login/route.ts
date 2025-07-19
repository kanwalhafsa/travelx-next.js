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

// Simple password verification (replace with bcrypt in production)
function verifyPassword(password: string, hashedPassword: string): boolean {
  return Buffer.from(password).toString("base64") === hashedPassword
}

// Simple JWT creation (replace with proper JWT library in production)
function createToken(userId: string, email: string): string {
  const payload = { userId, email, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }
  return Buffer.from(JSON.stringify(payload)).toString("base64")
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    const userStore = global.userStore

    // Find user
    const user = userStore.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = verifyPassword(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
    }

    // Create token
    const token = createToken(user.id, user.email)

    // Create response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 },
    )

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
