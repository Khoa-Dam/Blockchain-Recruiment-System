import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip profile pages
  if (pathname.startsWith("/profile/")) {
    return NextResponse.next();
  }

  // Get wallet address from cookie
  const address = request.cookies.get("wallet_address")?.value;

  if (address) {
    // Add your profile check logic here
    return NextResponse.redirect(new URL(`/profile/${address}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/jobs/:path*",
    // Thêm các routes khác cần bảo vệ
  ],
};
