"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getEventById, updateEventById } from "@/services/events";
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

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams(); // Obtem o ID do evento da URL

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("ativo");
  const [error, setError] = useState("");

  // Carregar dados do evento ao montar a página
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventData = await getEventById(id);
        setTitle(eventData.titulo || "");
        setDescription(eventData.descricao || "");
        setStartDate(eventData.data || "");
        setEndDate(eventData.data_final || "");
        setStatus(eventData.status || "ativo");
      } catch (err) {
        console.error("Erro ao carregar evento:", err);
        setError("Erro ao carregar os dados do evento.");
      }
    };

    fetchEventData();
  }, [id]);

  // Função para salvar alterações
  const handleUpdateEvent = async (e) => {
    e.preventDefault();

    if (!title || !startDate || !endDate || !status) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      await updateEventById(id, {
        titulo: title,
        descricao: description,
        data: startDate,
        data_final: endDate,
        status: status,
      });

      router.push("/dashboard"); // Redireciona para o Dashboard após edição
    } catch (err) {
      console.error("Erro ao atualizar evento:", err);
      setError("Erro ao atualizar evento. Tente novamente.");
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
        Editar Evento
      </Typography>
      <Box
        component="form"
        onSubmit={handleUpdateEvent}
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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        {/* Campo: Data_final */}
        <TextField
          label="Data de Término"
          type="date"
          fullWidth
          required
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
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
          Salvar Alterações
        </Button>
      </Box>
    </Box>
  );
}
