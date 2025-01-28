"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation'; 
import EventCalendar from "@/components/EventCalendar";
import { calendarEvents } from "@/services/events";
import Modal from "@/components/Modal";
import "tailwindcss/tailwind.css";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

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

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await calendarEvents();
        console.log("Eventos carregados:", data);
        setEvents(data);
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    loadEvents();
  }, []);

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-5">Calendário de Eventos</h1>
      <EventCalendar events={events} onSelectEvent={handleSelectEvent} />
      {isModalOpen && selectedEvent && (
        <Modal onClose={closeModal}>
          <h2 className="text-center text-xl font-bold">{selectedEvent.title}</h2>
          <p>
            <strong>Início:</strong> {selectedEvent.start.toLocaleDateString("pt-BR")} às {selectedEvent.start.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}h
          </p>
          <p>
            <strong>Fim:</strong> {selectedEvent.end.toLocaleDateString("pt-BR")} às {selectedEvent.end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}h
          </p>
          <p>
            <strong>Descrição:</strong> {selectedEvent.descricao || "Não informado"}
          </p>
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
