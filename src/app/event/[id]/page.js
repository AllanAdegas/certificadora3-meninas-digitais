"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { getEventById } from "@/services/events";
import { getSubscriptionsByEvent } from "@/services/subscriptions";
import { deleteEvent } from "@/services/events";
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";

export default function EventDetailsPage() {
  const { id } = useParams(); // Obter o ID do evento da URL
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

  // Carregar dados do evento e inscrições
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await getEventById(id);
        setEvent(eventData);
        console.log(eventData);

        const subscriptionsData = eventData.inscritos;
        setSubscriptions(subscriptionsData);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setError("Erro ao carregar detalhes do evento.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  const handleDelete = () => {
    deleteEvent(event.id);
    router.push("/dashboard");
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "error.main",
        }}
      >
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

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
      {/* Detalhes do Evento */}
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        {event?.titulo || "Evento"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Descrição:</strong> {event?.descricao || "Sem descrição"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Início:</strong> {event?.data || "Data não disponível"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        <strong>Término:</strong> {event?.data_final || "Data não disponível"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        <strong>Status:</strong> {event?.status || "Indefinido"}
      </Typography>

      {/* Botões de Ações */}
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#552E89", color: "#FFFFFF" }}
          onClick={() => router.push(`/event/${id}/edit`)}
        >
          Editar Evento
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete()}
        >
          Excluir Evento
        </Button>
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: "#C67F23", color: "#FFFFFF" }}
          onClick={() => router.push(`/comunicados`)}
        >
          Enviar Comunicado
        </Button> */}
      </Box>

      {/* Lista de Inscrições */}
      <Typography variant="h5" component="h2" sx={{ mb: 3 }}>
        Participantes Inscritos
      </Typography>
      {subscriptions.length > 0 ? (
        <Table sx={{ maxWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>E-mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions.map((sub) => (
              <TableRow key={sub}>
                <TableCell>{sub}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Nenhum participante inscrito neste evento.
        </Typography>
      )}
    </Box>
  );
}
