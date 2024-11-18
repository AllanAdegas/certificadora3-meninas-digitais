// src/app/create-event/page.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import FeedbackMessage from "@/components/FeedbackMessage";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTheme } from "@mui/material/styles";

const CreateEventPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState("");
  const [spots, setSpots] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleCreateEvent = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await addDoc(collection(db, "events"), {
        title,
        date: date?.toISOString(),
        location,
        spots: parseInt(spots, 10),
        targetAudience,
        description,
      });
      router.push("/dashboard"); // Redireciona para o dashboard após a criação bem-sucedida
    } catch (error) {
      setErrorMessage("Erro ao criar evento. Tente novamente.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={4}
        sx={{
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(4),
          borderRadius: theme.shape.borderRadius,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography variant="h5" component="h1" color="primary" gutterBottom>
          Criar Novo Evento
        </Typography>

        <InputField
          label="Título do Evento"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Data do Evento"
            value={date}
            onChange={(newValue) => setDate(newValue)}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </LocalizationProvider>

        <InputField
          label="Local"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <InputField
          label="Vagas Disponíveis"
          type="number"
          value={spots}
          onChange={(e) => setSpots(e.target.value)}
        />

        <InputField
          label="Público-Alvo"
          type="text"
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
        />

        <InputField
          label="Descrição"
          type="text"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FeedbackMessage message={errorMessage} severity="error" />
        <SubmitButton
          label="Criar Evento"
          onClick={handleCreateEvent}
          disabled={
            loading ||
            !title ||
            !date ||
            !location ||
            !spots ||
            !targetAudience ||
            !description
          }
        />
      </Box>
    </Container>
  );
};

export default CreateEventPage;
