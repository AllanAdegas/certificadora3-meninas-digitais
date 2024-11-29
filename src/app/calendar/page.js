"use client";

import React from "react"; 
import { useEffect, useState } from "react";
import EventCalendar from "@/components/EventCalendar";
import { calendarEvents } from "@/services/events";
import "tailwindcss/tailwind.css";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await calendarEvents();
        console.log("Eventos carregados:", data); 
        setEvents(
        data.map((event) => ({
          title: event.titulo,
          start: new Date(event.data), 
          end: new Date(event.data_final),
        }))
        );
      } catch (error) {
        console.error("Erro ao carregar eventos:", error);
      }
    };
    loadEvents();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-5">Calendário de Eventos</h1>
      <EventCalendar events={events} />
    </div>
  );
};

export default CalendarPage;
