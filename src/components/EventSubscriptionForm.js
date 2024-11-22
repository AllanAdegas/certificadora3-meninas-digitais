"use client";

import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from "@mui/material";

export default function EventSubscriptionForm({ event }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    additionalInfo: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simula envio ao servidor (Firebase ou outro backend)
      console.log("Formulário enviado:", formData);
      setSubmitted(true);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", p: 4, mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inscrição no Evento: {event.title}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        {event.description}
      </Typography>
      {submitted && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Inscrição realizada com sucesso! Verifique seu e-mail para mais
          detalhes.
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Nome Completo"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
        />
        <TextField
          label="Informações Adicionais"
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitted}
        >
          {submitted ? "Inscrito com Sucesso!" : "Inscrever-se"}
        </Button>
      </Box>
    </Paper>
  );
}
