import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { AuthService, canAccessRoute } from "@/lib/auth"
import type { UserRole } from "@/types/auth"

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/properties",
  "/tenants",
  "/maintenance", 
  "/vendors",
  "/payments",
  "/reports",
  "/settings",
  "/jobs",
  "/my-jobs",
  "/lease",
  "/messages",
]

// Routes that should redirect authenticated users away
const authRoutes = ["/auth", "/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token from cookies (more secure than localStorage in middleware)
  const token = request.cookies.get("propertyos_access_token")?.value
  const userCookie = request.cookies.get("propertyos_user")?.value
  
  let user = null
  try {
    user = userCookie ? JSON.parse(userCookie) : null
  } catch {
    // Invalid user cookie
  }
  
  const isAuthenticated = !!(token && user)
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
  
  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }
  
  // Redirect unauthenticated users to auth page
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL("/auth", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Check role-based access for authenticated users
  if (isAuthenticated && user && isProtectedRoute) {
    const userRole = user.role as UserRole
    
    if (!canAccessRoute(userRole, pathname)) {
      // Redirect to dashboard if user doesn't have access
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}