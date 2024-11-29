"use client";

import React from "react"; 
import { useEffect, useState } from "react";
import EventCalendar from "@/components/EventCalendar";
import { fetchEvents } from "@/services/events";
import "tailwindcss/tailwind.css";

const CalendarPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(
        data.map((event) => ({
          title: event.title,
          start: new Date(event.startDate), // Certifique-se de formatar como Date
          end: new Date(event.endDate),
          allDay: event.allDay || false,
        }))
      );
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
