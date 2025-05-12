import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

const authRoutes = ["/login", "/register"];

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Get the current user
  const userInfo = await getCurrentUser();

  console.log(userInfo)

  // Handle auth routes (login/register)
  if (authRoutes.includes(pathname)) {
    // If user is already logged in, redirect to dashboard
    if (userInfo) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    // Otherwise allow access to auth routes
    return NextResponse.next();
  }

  // If not logged in and trying to access protected route, redirect to login
  if (!userInfo) {
    return NextResponse.redirect(
      new URL(`/login?redirectPath=${pathname}`, request.url)
    );
  }
};

export const config = {
  matcher: ["/login", "/register"],
};
