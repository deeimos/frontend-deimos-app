import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/.well-known")) {
    return new NextResponse(null, { status: 404 });
  }

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isAuthPage = pathname.startsWith("/auth");
  const isGetRequest = request.method === "GET";
  const isStatic = pathname.startsWith("/_next");

  if (isStatic) {
    return NextResponse.next();
  }

  if (!accessToken && !refreshToken && !isAuthPage && isGetRequest) {
    const loginUrl = new URL("/auth/login", request.url);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.set("callbackUrl", pathname, {
      httpOnly: false,
      path: "/",
    });
    return res;
  }

  if (accessToken && isAuthPage && isGetRequest) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
