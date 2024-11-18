// src/services/auth.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

/**
 * Realiza o login de um usuário.
 * @param {string} email - O e-mail do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise} - Resolve se o login for bem-sucedido, rejeita caso contrário.
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message); // Pode customizar mensagens aqui se necessário
  }
};

/**
 * Realiza o cadastro de um novo usuário.
 * @param {string} email - O e-mail do novo usuário.
 * @param {string} password - A senha do novo usuário.
 * @returns {Promise} - Resolve se o cadastro for bem-sucedido, rejeita caso contrário.
 */
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message); // Pode customizar mensagens aqui se necessário
  }
};
