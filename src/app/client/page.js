"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Modal,
} from "@mui/material";
import { getActiveEvents, enrollUserInEvent } from "@/services/events";
import { UserProvider, useUser } from "@/context/UserContext";

const EventList = () => {
  const [events, setEvents] = useState([]); // Armazena os eventos disponíveis
  const [enrolledEvents, setEnrolledEvents] = useState([]); // Armazena os eventos inscritos
  const [filteredEvents, setFilteredEvents] = useState([]); // Eventos filtrados para exibição
  const [filteredEnrolledEvents, setFilteredEnrolledEvents] = useState([]); // Eventos inscritos filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [activeTab, setActiveTab] = useState(0); // Tab ativa
  const [openModal, setOpenModal] = useState(false); // Controle do modal
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento selecionado
  const { user, loading } = useUser();
  console.log(user);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventList = await getActiveEvents();
      setEvents(eventList);
      setFilteredEvents(eventList);
    };

    fetchEvents();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredEvents(events);
      setFilteredEnrolledEvents(enrolledEvents);
    } else {
      setFilteredEvents(
        events.filter((event) =>
          event.title.toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredEnrolledEvents(
        enrolledEvents.filter((event) =>
          event.title.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm("");
  };

  const handleOpenModal = (event) => {
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEvent(null);
  };

  const handleEnroll = async () => {
    if (selectedEvent) {
      try {
        userEmail;
        const userEmail = "usuario@exemplo.com"; // Substituir pelo e-mail do usuário logado
        await enrollUserInEvent(selectedEvent.id, userEmail);
        alert("Inscrição confirmada!");
        handleCloseModal();
      } catch (error) {
        console.error("Erro ao se inscrever no evento:", error);
        alert("Ocorreu um erro ao se inscrever no evento.");
      }
    }
  };

  const renderEvents = (eventsToRender) => (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {eventsToRender.length > 0 ? (
        eventsToRender.map((event) => (
          <Card
            key={event.id}
            sx={{
              maxWidth: "300px",
              flex: "1 1 calc(33.333% - 24px)",
              boxSizing: "border-box",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                {event.title}
              </Typography>
              <Typography variant="body2">
                Data: {event.start || "Sem data"}
              </Typography>
              <Typography variant="body2">
                Descrição: {event.descricao}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "16px" }}
                onClick={() => handleOpenModal(event)}
              >
                Inscrever-se
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          Nenhum evento encontrado.
        </Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ padding: "16px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Eventos
      </Typography>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        sx={{ marginBottom: "16px" }}
      >
        <Tab label="Eventos Disponíveis" />
        <Tab label="Eventos Inscritos" />
      </Tabs>
      <TextField
        label="Pesquisar eventos..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        sx={{ marginBottom: "16px", borderRadius: "8px" }}
      />
      {activeTab === 0
        ? renderEvents(filteredEvents)
        : renderEvents(filteredEnrolledEvents)}

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedEvent && (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                {selectedEvent.title}
              </Typography>
              <Typography variant="body2">
                Data: {selectedEvent.start || "Sem data"}
              </Typography>
              <Typography variant="body2">
                Descrição: {selectedEvent.descricao}
              </Typography>
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEnroll}
                >
                  Confirmar Inscrição
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Cancelar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default EventList;
