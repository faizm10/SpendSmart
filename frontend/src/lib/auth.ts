import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export async function getSession() {
  let cookieStore: any = cookies();
  if (typeof cookieStore.then === "function") {
    cookieStore = await cookieStore;
  }
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return null;
    return { id: user.id, email: user.email, name: user.name };
  } catch {
    return null;
  }
} 