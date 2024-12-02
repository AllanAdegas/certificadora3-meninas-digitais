// Conexão com o firebase do lado do servidor

import { cert, getApps, initializeApp } from "firebase-admin/app";

import service_account from "./service_account/service_account.json";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

/**
 * @type {import('firebase-admin/firestore').Firestore}
 */
let firestore;
/**
 * @type {import('firebase-admin/auth').Auth}
 */
let auth;

const currentApps = getApps();

if (currentApps.length <= 0) {
  const app = initializeApp({
    credential: cert(service_account),
  });

  firestore = getFirestore(app);
  auth = getAuth(app);
} else {
  firestore = getFirestore(currentApps[0]);
  auth = getAuth(currentApps[0]);
}

export { firestore, auth };
