"use client";

import React from "react";
import { useState } from "react";
import { sendNotification } from "@/services/notification"; // Função para envio
import "tailwindcss/tailwind.css";

export default function ComunicadosPage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

