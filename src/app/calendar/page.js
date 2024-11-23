"use client";

import React from "react"; 
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getEvents } from "@/services/events"; // Função para buscar eventos
import "tailwindcss/tailwind.css";

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      const fetchedEvents = await getEvents(); // Busca eventos do Firebase
      setEvents(
        fetchedEvents.map((event) => ({
          title: event.title,
          start: event.date, 
        }))
      );
    }
    fetchEvents();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calendário de Eventos</h1>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventColor="#1e40af" 
        locale="pt-br"
        height="auto"
      />
    </div>
  );
}
