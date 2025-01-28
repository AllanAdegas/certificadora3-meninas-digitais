"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { sendNotification } from "@/services/notification"; // Função para envio
import "tailwindcss/tailwind.css";

export default function ComunicadosPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
    const [user, setUser] = useState(null);
    
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserName(userData.name || "No Name");
        } else {
          setUserName("No Name");
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSend = async () => {
    setIsLoading(true);
    try {
      await sendNotification({ message });
      alert("Comunicado enviado com sucesso!");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar comunicado.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enviar Comunicados</h1>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-md"
        rows="5"
        placeholder="Digite a mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className={`mt-2 px-4 py-2 text-white rounded-md ${
          isLoading && "opacity-50 cursor-not-allowed"
        }`}
        style={{ backgroundColor: "#552E89" }}
        onClick={handleSend}
        disabled={isLoading}
      >
        {isLoading ? "Enviando..." : "Enviar"}
      </button>
    </div>
  );
}

