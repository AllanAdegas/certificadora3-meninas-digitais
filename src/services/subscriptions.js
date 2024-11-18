import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Obter todas as inscrições
export const getSubscriptions = async () => {
  try {
    const subscriptionsRef = collection(db, "inscricoes");
    const querySnapshot = await getDocs(subscriptionsRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao buscar inscrições:", error);
    throw error;
  }
};

// Obter inscrições por evento
export const getSubscriptionsByEvent = async (eventId) => {
  try {
    const subscriptionsRef = collection(db, "inscricoes");
    const q = query(subscriptionsRef, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao buscar inscrições do evento:", error);
    throw error;
  }
};

// Registrar inscrição no evento
export const registerForEvent = async (user, eventId) => {
  try {
    const subscriptionsRef = collection(db, "inscricoes");
    await addDoc(subscriptionsRef, {
      userId: user.uid,
      email: user.email,
      eventId: eventId,
    });
  } catch (error) {
    console.error("Erro ao registrar inscrição:", error);
    throw error;
  }
};

// Excluir uma inscrição pelo ID
export const deleteSubscription = async (id) => {
  try {
    await deleteDoc(doc(db, "inscricoes", id));
  } catch (error) {
    console.error("Erro ao excluir inscrição:", error);
    throw error;
  }
};
