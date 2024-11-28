"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

export default function NewEventPage() {
  const router = useRouter();

  // Estados para os campos do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("ativo");
  const [error, setError] = useState("");

  // Função para salvar o evento no Firestore
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!title || !date || !status) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      await addDoc(collection(db, "eventos"), {
        titulo: title,
        descricao: description,
        data: date,
        status: status,
      });
      router.push("/dashboard"); // Redireciona para o Dashboard após criação
    } catch (err) {
      console.error("Erro ao criar evento:", err);
      setError("Erro ao criar evento. Tente novamente.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 3,
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Criar Novo Evento
      </Typography>
      <Box
        component="form"
        onSubmit={handleCreateEvent}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: 600,
        }}
      >
        {/* Campo: Título */}
        <TextField
          label="Título do Evento"
          type="text"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Campo: Descrição */}
        <TextField
          label="Descrição"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Campo: Data */}
        <TextField
          label="Data do Evento"
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Campo: Status */}
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="ativo">Ativo</MenuItem>
            <MenuItem value="cancelado">Cancelado</MenuItem>
          </Select>
        </FormControl>

        {/* Exibe erro, se houver */}
        {error && (
          <Typography variant="body2" color="error" textAlign="center">
            {error}
          </Typography>
        )}

        {/* Botão de Submissão */}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: "#552E89", color: "#FFFFFF" }}
          fullWidth
        >
          Criar Evento
        </Button>
      </Box>
    </Box>
  );
}
