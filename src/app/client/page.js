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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  getActiveEvents,
  enrollUserInEvent,
  removeUserFromEvent,
} from "@/services/events";
import {
  getUserEnrolledEvents,
  addEventToUser,
  removeEventFromUser,
} from "@/services/users";
import { UserProvider, useUser } from "@/context/UserContext";

const EventList = () => {
  const [events, setEvents] = useState([]); // Eventos disponíveis
  const [enrolledEvents, setEnrolledEvents] = useState([]); // Eventos inscritos do usuário
  const [filteredEvents, setFilteredEvents] = useState([]); // Eventos disponíveis filtrados
  const [filteredEnrolledEvents, setFilteredEnrolledEvents] = useState([]); // Eventos inscritos filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Termo de pesquisa
  const [activeTab, setActiveTab] = useState(0); // Aba ativa
  const [openModal, setOpenModal] = useState(false); // Controle do modal
  const [selectedEvent, setSelectedEvent] = useState(null); // Evento selecionado
  const [confirmUnenrollModal, setConfirmUnenrollModal] = useState(false); // Modal de confirmação
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  }); // Controle do Snackbar
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchEventsAndEnrolled = async () => {
      try {
        // Carrega eventos disponíveis
        const eventList = await getActiveEvents();
        setEvents(eventList);
        setFilteredEvents(eventList);

        // Carrega eventos inscritos após eventos disponíveis
        if (user?.uid) {
          const enrolledEventIds = await getUserEnrolledEvents(user?.uid);
          const enrolledEventList = eventList.filter((event) =>
            enrolledEventIds.includes(event.id)
          );
          setEnrolledEvents(enrolledEventList);
          setFilteredEnrolledEvents(enrolledEventList);
        }
      } catch (error) {
        console.error(
          "Erro ao carregar eventos ou eventos inscritos:",
          error.message
        );
      }
    };

    if (user?.email) {
      fetchEventsAndEnrolled();
    }
  }, [user]);

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
        await enrollUserInEvent(selectedEvent.id, user?.email);
        await addEventToUser(user?.uid, selectedEvent.id);
        setSnackbar({
          open: true,
          message: "Inscrição confirmada!",
          severity: "success",
        });
        handleCloseModal();
        const enrolledEventIds = await getUserEnrolledEvents(user?.uid);
        const updatedEnrolledEvents = events.filter((event) =>
          enrolledEventIds.includes(event.id)
        );
        setEnrolledEvents(updatedEnrolledEvents);
        setFilteredEnrolledEvents(updatedEnrolledEvents);
      } catch (error) {
        console.error(
          "Erro ao se inscrever no evento (ID: " + selectedEvent.id + "):",
          error.message
        );
        setSnackbar({
          open: true,
          message: "Erro ao se inscrever no evento.",
          severity: "error",
        });
      }
    }
  };

  const handleUnenroll = async () => {
    if (selectedEvent) {
      try {
        await removeUserFromEvent(selectedEvent.id, user?.email);
        await removeEventFromUser(user?.uid, selectedEvent.id);
        setSnackbar({
          open: true,
          message: "Você foi desinscrito do evento.",
          severity: "success",
        });
        setConfirmUnenrollModal(false);
        const enrolledEventIds = await getUserEnrolledEvents(user?.uid);
        const updatedEnrolledEvents = events.filter((event) =>
          enrolledEventIds.includes(event.id)
        );
        setEnrolledEvents(updatedEnrolledEvents);
        setFilteredEnrolledEvents(updatedEnrolledEvents);
      } catch (error) {
        console.error(
          "Erro ao desinscrever do evento (ID: " + selectedEvent.id + "):",
          error.message
        );
        setSnackbar({
          open: true,
          message: "Erro ao desinscrever do evento.",
          severity: "error",
        });
      }
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
              {activeTab === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: "16px" }}
                  onClick={() => handleOpenModal(event)}
                >
                  Inscrever-se
                </Button>
              )}
              {activeTab === 1 && (
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ marginTop: "16px" }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setConfirmUnenrollModal(true);
                  }}
                >
                  Desinscrever-se
                </Button>
              )}
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

      <Modal
        open={confirmUnenrollModal}
        onClose={() => setConfirmUnenrollModal(false)}
      >
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
                Confirmar Desinscrição
              </Typography>
              <Typography variant="body2">
                Você realmente deseja se desinscrever do evento "
                {selectedEvent.title}"?
              </Typography>
              <Box mt={3} display="flex" justifyContent="space-between">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUnenroll}
                >
                  Confirmar
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setConfirmUnenrollModal(false)}
                >
                  Cancelar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventList;
