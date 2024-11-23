import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await resend.emails.send({
      from: "welcome@resend.dev",
      to: email,
      subject: "Welcome to Your App!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; border-radius: 8px; text-align: center;">
          <h1 style="color: #333;">Welcome to Your App, ${name}!</h1>
          <p style="color: #555; font-size: 16px;">We're thrilled to have you with us! Your journey starts here, and we can't wait for you to explore everything we have to offer.</p>
          <p style="color: #555; font-size: 16px;">If you have any questions, feel free to reach out to our support team.</p>
          <footer style="margin-top: 20px; font-size: 12px; color: #aaa;">
            <p>Thank you for joining us!</p>
          </footer>
        </div>
      `,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
  }
};

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }
        if (!user.emailVerified) {
          throw new Error("Please verify your email before signing in");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Check if this is the user's first sign in
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
          select: { id: true },
        });

        if (!existingUser) {
          await sendWelcomeEmail(user.email!, user.name || "there");
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
