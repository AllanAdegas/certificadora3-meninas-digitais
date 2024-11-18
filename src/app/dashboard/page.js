"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import EventCard from "@/components/EventCard";
import {
  getActiveEventsCount,
  getUpcomingEvents,
  getPastEvents,
} from "@/services/events";
import { Box, Typography, Button } from "@mui/material";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [eventStats, setEventStats] = useState({
    active: 0,
    upcoming: 0,
    past: 0,
  });
  const [events, setEvents] = useState([]); // Lista de eventos

  // Obter informações do usuário logado
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

  // Buscar dados dos eventos no Firestore
  useEffect(() => {
    const fetchEventStats = async () => {
      try {
        const active = await getActiveEventsCount(); // Obter contagem de eventos ativos
        const upcoming = await getUpcomingEvents(); // Obter contagem de eventos futuros
        const past = await getPastEvents(); // Obter contagem de eventos passados

        setEventStats({ active, upcoming, past });
      } catch (error) {
        console.error("Erro ao buscar dados dos eventos:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "eventos");
        const querySnapshot = await getDocs(eventsRef);
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Erro ao buscar eventos cadastrados:", error);
      }
    };

    fetchEventStats();
    fetchEvents();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        padding: 3,
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Boas-vindas */}
      {user && (
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 4, fontWeight: "bold" }}
        >
          Bem-vindo, {userName}!
        </Typography>
      )}

      {/* Resumo dos Eventos */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Card
          title="Eventos Ativos"
          value={eventStats.active}
          color="#552E89"
        />
        <Card
          title="Próximos Eventos"
          value={eventStats.upcoming}
          color="#772B8C"
        />
        <Card
          title="Eventos Passados"
          value={eventStats.past}
          color="#C67F23"
        />
      </Box>

      {/* Ações Principais */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{ backgroundColor: "#552E89", color: "#FFFFFF" }}
          onClick={() => router.push("/event/new")}
        >
          Criar Novo Evento
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#772B8C", color: "#FFFFFF" }}
          onClick={() => router.push("/subscriptions")}
        >
          Gerenciar Inscrições
        </Button>
      </Box>

      {/* Lista de Eventos */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 600,
        }}
      >
        {events.map((event) => (
          <EventCard
            key={event.id}
            name={event.titulo}
            date={event.data}
            onEdit={() => router.push(`/event/${event.id}/edit`)}
            onDetails={() => router.push(`/event/${event.id}`)} // Novo botão para detalhes
          />
        ))}
      </Box>
    </Box>
  );
}
