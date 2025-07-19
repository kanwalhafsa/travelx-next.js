import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, category, message } = await request.json()

    // Log the message for debugging
    console.log("Contact Form Submission:", {
      name,
      email,
      phone,
      subject,
      category,
      message,
      timestamp: new Date().toISOString(),
    })

    // Check if email service is configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // Only try to send email if nodemailer is available
        const nodemailer = await import("nodemailer").catch(() => null)

        if (nodemailer) {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          })

          await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: process.env.SMTP_USER,
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
              <h3>New Contact Form Submission</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
              <p><strong>Category:</strong> ${category || "General"}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
              <hr>
              <p><small>Sent from TravelX Contact Form</small></p>
            `,
          })

          console.log("Email sent successfully")
        }
      } catch (emailError) {
        console.error("Email sending failed:", emailError)
        // Don't fail the entire request if email fails
      }
    }

    return NextResponse.json({
      message: "Message sent successfully",
      success: true,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        message: "Failed to send message",
        success: false,
      },
      { status: 500 },
    )
  }
}
