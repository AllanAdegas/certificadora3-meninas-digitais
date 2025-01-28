import {
  doc,
  updateDoc,
  collection,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

// Obter todos os usuários
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "usuarios");
    const querySnapshot = await getDocs(usersRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
};

// Atualizar informações do usuário
export const updateUserInfo = async (id, updatedData) => {
  try {
    const userDoc = doc(db, "usuarios", id);
    await updateDoc(userDoc, updatedData);
  } catch (error) {
    console.error("Erro ao atualizar informações do usuário:", error);
    throw error;
  }
};

// Atualizar papel do usuário
export const updateUserRole = async (id, newRole) => {
  try {
    const userDoc = doc(db, "usuarios", id);
    await updateDoc(userDoc, { role: newRole });
  } catch (error) {
    console.error("Erro ao atualizar papel do usuário:", error);
    throw error;
  }
};

// Excluir usuário
export const deleteUser = async (id) => {
  try {
    const userDoc = doc(db, "usuarios", id);
    await deleteDoc(userDoc);
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};

// Adicionar evento à lista de eventos inscritos do usuário
export const addEventToUser = async (userId, eventId) => {
  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const enrolledEvents = userSnapshot.data().enrolledEvents || {};
      enrolledEvents[eventId] = true;
      await updateDoc(userDocRef, { enrolledEvents });
    } else {
      await setDoc(userDocRef, { enrolledEvents: { [eventId]: true } });
    }
  } catch (error) {
    console.error("Erro ao adicionar evento ao usuário:", error);
    throw error;
  }
};

// Remover evento da lista de eventos inscritos do usuário
export const removeEventFromUser = async (userId, eventId) => {
  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const enrolledEvents = userSnapshot.data().enrolledEvents || {};
      if (enrolledEvents[eventId]) {
        delete enrolledEvents[eventId];
        await updateDoc(userDocRef, { enrolledEvents });
      }
    } else {
      console.warn("Usuário não encontrado ou sem eventos inscritos.");
    }
  } catch (error) {
    console.error("Erro ao remover evento do usuário:", error);
    throw error;
  }
};

// Obter eventos inscritos de um usuário
export const getUserEnrolledEvents = async (userId) => {
  try {
    const userDocRef = doc(db, "usuarios", userId);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const enrolledEvents = userSnapshot.data().enrolledEvents || {};
      return Object.keys(enrolledEvents);
    } else {
      await setDoc(userDocRef, { enrolledEvents: {} });
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar eventos inscritos do usuário:", error);
    throw error;
  }
};
