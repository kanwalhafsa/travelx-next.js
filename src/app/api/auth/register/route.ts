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

// Simple password hashing function (replace with bcrypt in production)
function hashPassword(password: string): string {
  // This is a simple hash - in production use bcrypt
  return Buffer.from(password).toString("base64")
}

// Initialize global user store
if (!global.userStore) {
  global.userStore = []
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    const userStore = global.userStore

    // Check if user already exists
    const existingUser = userStore.find((user) => user.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "User already exists with this email" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = hashPassword(password)

    // Create user
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    }

    userStore.push(newUser)

    // Return success response (without password)
    const { password: _password, ...userWithoutPassword } = newUser
    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}