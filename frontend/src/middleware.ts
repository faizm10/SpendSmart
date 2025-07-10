import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // Protect all /dashboard routes
  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    const session = await getSession();
    if (!session) {
      const signInUrl = new URL("/sign-in", request.url);
      return NextResponse.redirect(signInUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
}; 