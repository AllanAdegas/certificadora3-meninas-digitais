import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/lib/firebase/server";

/**
 *
 * @typedef {Object} Params
 *
 * @param {NextRequest} request
 * @param {{params: Params}}} context
 * @returns {NextResponse}
 */

export async function GET(request, { params }) {
  if (!firestore) return new NextResponse("Internal Server Error", 500);

  let collection = firestore.collection("usuarios");
}
