"use client";

import React from "react";
import { useState } from "react";
import { submitFeedback } from "@/services/feedback";
import "tailwindcss/tailwind.css";

export default function PesquisaSatisfacaoPage() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null); // Armazena a avaliação selecionada
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      alert("Por favor, selecione uma avaliação.");
      return;
    }

    try {
        await submitFeedback({ feedback });
        setIsSubmitted(true);
    } catch (error) {
        console.error(error);
        alert("Erro ao enviar feedback.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Pesquisa de Satisfação</h1>
        {!isSubmitted ? (
          <>
            <p className="text-gray-600 mb-4">
              Avalie sua experiência e deixe seus comentários para que possamos melhorar.
            </p>

            {/* Seção de Avaliação */}
            <div className="mb-4">
              <p className="font-medium text-gray-700 mb-2">Como foi sua experiência?</p>
              <div className="flex space-x-2">
                {["Ruim", "Regular", "Bom", "Muito Bom", "Excelente"].map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border rounded-md text-sm transition ${
                      rating === option
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                    onClick={() => setRating(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Campo de Comentários */}
            <div className="mb-4">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700"
              >
                Comentários (opcional)
              </label>
              <textarea
                id="feedback"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                rows="4"
                placeholder="Compartilhe sua experiência..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </div>

            {/* Botão de Enviar */}
            <button
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              onClick={handleSubmit}
            >
              Enviar
            </button>
          </>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-bold text-xl mb-2">
              Obrigado pelo seu feedback!
            </p>
            <p className="text-gray-600">
              Sua opinião é muito importante para nós.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
