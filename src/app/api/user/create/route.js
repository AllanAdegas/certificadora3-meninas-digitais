import { firestore } from "@/lib/firebase/server";
import { NextResponse } from "next/server";
/**
 * Handles the POST request to create a new user in Firestore with a specific ID.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a NextResponse object containing the ID of the created document or an error message.
 * @throws {Error} - If there is an error during the process, it returns a response with the error message and a status code of 500.
 */
export async function POST(request, { requestParams }) {
  try {
    const { id, ...userData } = await request.json();
    // Create a new doc with the specific ID
    const docRef = firestore.collection("usuarios").doc(id);
    await docRef.set({ ...userData, isAdmin: false });

    return NextResponse.json({ id: docRef.id });
  } catch (error) {
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
