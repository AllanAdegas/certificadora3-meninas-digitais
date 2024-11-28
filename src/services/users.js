import {
  doc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

// Obter todos os usuários
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");
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
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, updatedData);
  } catch (error) {
    console.error("Erro ao atualizar informações do usuário:", error);
    throw error;
  }
};

// Atualizar papel do usuário
export const updateUserRole = async (id, newRole) => {
  try {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { role: newRole });
  } catch (error) {
    console.error("Erro ao atualizar papel do usuário:", error);
    throw error;
  }
};

// Excluir usuário
export const deleteUser = async (id) => {
  try {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};
