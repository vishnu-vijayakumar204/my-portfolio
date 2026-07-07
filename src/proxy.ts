import { NextResponse, type NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "admin_session";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || !session || session !== adminPassword) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
