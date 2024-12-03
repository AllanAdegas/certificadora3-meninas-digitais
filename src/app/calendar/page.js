"use client";

import React from "react"; 
import { useEffect, useState } from "react";
import EventCalendar from "@/components/EventCalendar";
import { calendarEvents } from "@/services/events";
import Modal from "@/components/Modal";
import "tailwindcss/tailwind.css";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await calendarEvents();
        console.log("Eventos carregados:", data); 
        setEvents(
        data.map((event) => ({
          title: event.titulo,
          start: new Date(event.data.getTime() + event.data.getTimezoneOffset() * 60000), 
          end: new Date(event.data_final.getTime() + event.data_final.getTimezoneOffset() * 60000),
          description: event.descricao,
        }))
        );
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
          <h2 className="text-xl font-bold">{selectedEvent.title}</h2>
          <p><strong>Início:</strong> {selectedEvent.start.toLocaleString()}</p>
          <p><strong>Fim:</strong> {selectedEvent.end.toLocaleString()}</p>
          <p><strong>Descrição:</strong> {selectedEvent.description}</p>
        </Modal>
      )}
    </div>
  );
};

export default CalendarPage;
