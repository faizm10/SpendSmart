import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Resend } from "resend";
import { randomBytes } from "crypto";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Validation schema
const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

// Email sending function with strong typing and error handling
const sendVerificationEmail = async (
  email: string,
  name: string,
  verificationToken: string
): Promise<boolean> => {
  try {
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/verify-email?token=${verificationToken}`;

    await resend.emails.send({
      from: "verification@resend.dev", // Use a consistent sender address
      to: email,
      subject: "Verify your email",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px; text-align: center;">
          <h1 style="color: #333;">Welcome ${name}!</h1>
          <p style="color: #555; font-size: 16px;">Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
          <a href="${verificationUrl}" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p style="color: #555; font-size: 14px; margin-top: 20px;">If you did not create an account, you can safely ignore this email.</p>
          <footer style="margin-top: 20px; font-size: 12px; color: #aaa;">
            <p>Thank you for joining us!</p>
          </footer>
        </div>
      `,
    });

    return true;
  } catch (error) {
    console.error("Error sending verification email:", error);
    return false;
  }
};

// Generate verification token
const generateVerificationToken = (): string => {
  return randomBytes(32).toString("hex");
};

export async function POST(req: Request) {
  try {
    // Parse and validate request body
    const body = await req.json();
    const validatedData = signupSchema.parse(body);

    // Check for existing user
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Generate verification token and hash password
    const verificationToken = generateVerificationToken();
    const hashedPassword = await hash(validatedData.password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        password: hashedPassword,
        emailVerificationToken: verificationToken,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    // Send verification email
    const emailSent = await sendVerificationEmail(
      validatedData.email,
      validatedData.name,
      verificationToken
    );
    console.log("emailSent", emailSent);
    if (!emailSent) {
      // If email fails, we might want to delete the user or handle it differently
      // For now, we'll just inform the user to request a new verification email
      return NextResponse.json(
        {
          message:
            "Account created but there was an issue sending the verification email. Please request a new one.",
          userId: user.id,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Please check your email to verify your account" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
