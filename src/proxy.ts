import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIE_NAME, validateToken } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow the login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check auth for all /admin/* routes
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token || !validateToken(token)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
