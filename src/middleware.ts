import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

const authRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  
  const userInfo = await getCurrentUser(); 


  if (authRoutes.includes(pathname)) {
    if (userInfo) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

 
  if (pathname.startsWith("/admin")) {
    if (!userInfo) {
      return NextResponse.redirect(new URL(`/login?redirectPath=${pathname}`, request.url));
    }
    if (userInfo.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", request.url)); 
    }
    return NextResponse.next();
  }

 
  if (pathname.startsWith("/user")) {
    if (!userInfo) {
      return NextResponse.redirect(new URL(`/login?redirectPath=${pathname}`, request.url));
    }
    if (userInfo.role !== "USER") {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    return NextResponse.next();
  }

  
  if (!userInfo) {
    return NextResponse.redirect(new URL(`/login?redirectPath=${pathname}`, request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/login", "/register", "/admin/:path*", "/user/:path*"],
};
