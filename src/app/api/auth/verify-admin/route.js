import { NextResponse } from "next/server";
import { auth, firestore } from "@/lib/firebase/server";

/**
 * API route to verify if the user is an admin.
 * @param {import("next/server").NextRequest} request - The incoming request object.
 * @returns {Promise<import("next/server").NextResponse>} - The response object.
 */
export async function GET(request) {
  try {
    const authToken = request.headers.get("authorization")?.split("Bearer ")[1];

    // Return unauthorized if no token is provided
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(authToken);
    const userId = decodedToken.uid;

    // Check admin status in Firestore
    const userDoc = await firestore.collection("usuarios").doc(userId).get();

    // Return 404 if the user document does not exist
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data();

    // Return 403 if the user is not an admin
    if (!userData?.isAdmin) {
      return NextResponse.json({ error: "Not an admin" }, { status: 403 });
    }

    // Return success if the user is an admin
    return NextResponse.json({ isAdmin: true }, { status: 200 });
  } catch (error) {
    console.error("Admin verification failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
