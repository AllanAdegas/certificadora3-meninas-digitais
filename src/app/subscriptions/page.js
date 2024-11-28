"use client";

import { useState, useEffect } from "react";
import { getSubscriptions, deleteSubscription } from "@/services/subscriptions";
import { getActiveEvents } from "@/services/events";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

import { auth } from "@/lib/firebase/client";

export default function ManageSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(""); // Evento selecionado para filtro
  const [error, setError] = useState("");

  // Carregar eventos e inscrições ao montar a página
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getActiveEvents();
        console.log("Eventos carregados:", eventsData); // Verifique se os eventos estão sendo carregados
        setEvents(eventsData);

        const subscriptionsData = await getSubscriptions();
        console.log("Inscrições carregadas:", subscriptionsData); // Verifique as inscrições
        setSubscriptions(subscriptionsData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar dados. Tente novamente.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado.");
    } else {
      console.log("Usuário autenticado:", user.email);
    }
  }, []);

  // Função para excluir uma inscrição
  const handleDeleteSubscription = async (id) => {
    try {
      await deleteSubscription(id);
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id)); // Remove localmente
    } catch (err) {
      console.error("Erro ao excluir inscrição:", err);
      setError("Erro ao excluir inscrição. Tente novamente.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        backgroundColor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Gerenciar Inscrições
      </Typography>

      {/* Filtro por Evento */}
      <Select
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
        displayEmpty
        fullWidth
        sx={{ mb: 4, maxWidth: 400 }}
      >
        <MenuItem value="">
          <em>Todos os Eventos</em>
        </MenuItem>
        {Array.isArray(events) &&
          events.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {event.titulo}
            </MenuItem>
          ))}
      </Select>

      {/* Lista de Inscrições */}
      <Table sx={{ maxWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Evento</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subscriptions
            .filter((sub) => !selectedEvent || sub.eventId === selectedEvent)
            .map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.name}</TableCell>
                <TableCell>{sub.email}</TableCell>
                <TableCell>{sub.eventTitle}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteSubscription(sub.id)}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      {/* Exibe erro, se houver */}
      {error && (
        <Typography
          variant="body2"
          color="error"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
