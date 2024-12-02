import { NextRequest, NextResponse } from "next/server";
import { auth, firestore } from "@/lib/firebase/server";

/**
 *
 * @typedef {Object} Params
 * @property {string} user_id
 *
 * @param {NextRequest} request
 * @param {{requestParams: Params}}} context
 * @returns {NextResponse}
 */
export async function GET(request, { requestParams }) {
  try {
    if (!firestore)
      return new NextResponse("Internal serer error", { status: 500 });

    const authToken =
      request.headers.get("authorization")?.split("Bearer ")[1] || null;

    if (auth && authToken) {
      try {
        auth.verifyIdToken(authToken);
      } catch (error) {
        console.log(error);
        return new NextResponse("Unauthorized", 401);
      }
    }
    const params = await requestParams;

    const userDocument = firestore
      .collection("usuarios")
      .doc(params.user_id)
      .get();

    const userData = userDocument.data();

    return NextResponse.json(userData);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
