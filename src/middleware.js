import { NextResponse } from "next/server";
import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS = createRemoteJWKSet(
  new URL(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
  )
);

/**
 * Middleware function to handle authentication and admin verification.
 * @param {import("next/server").NextRequest} request - The incoming request object.
 * @returns {Promise<import("next/server").NextResponse>} - The response object.
 */
export async function middleware(request) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get("authToken")?.value;

  // Redirect to login if no token is found
  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`,
      audience: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      algorithms: ["RS256"],
    });

    // For admin routes, verify admin status
    if (
      request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/dashboard")
    ) {
      // Call the API route to verify admin status
      const adminCheckResponse = await fetch(
        `${request.nextUrl.origin}/api/auth/verify-admin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Redirect to login if the user is not an admin
      if (!adminCheckResponse.ok) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
      }
    }

    // Allow the request to proceed
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification failed:", error);
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

// Middleware configuration
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
