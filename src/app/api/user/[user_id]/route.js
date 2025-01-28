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
export async function GET(request) {
  console.log("GET /api/user/[user_id]");

  // Gambiarra para pegar o ID do usuário
  // Já que o next simplesmente não tá afim de me passar os parâmetros de URL
  const url = new URL(request.url);
  const userId = url.pathname.split("/").pop(); // Get the last segment of the URL

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

    const userDocument = await firestore
      .collection("usuarios")
      .doc(userId)
      .get();

    const userData = userDocument.data();
    return NextResponse.json(userData);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
