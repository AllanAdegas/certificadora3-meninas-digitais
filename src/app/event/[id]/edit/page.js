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
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
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
        setStartTime(eventData.horaInicio || "");
        setEndDate(eventData.data_final || "");
        setEndTime(eventData.horaFinal || "");
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

    if (!title || !startDate || !startTime || !endDate || !endTime || !status) {
      setError("Todos os campos obrigatórios devem ser preenchidos.");
      return;
    }

    try {
      await updateEventById(id, {
        titulo: title,
        descricao: description,
        data: startDate,
        horaInicio: startTime,
        data_final: endDate,
        horaFinal: endTime,
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

        {/* Campos: Data e Hora de Início */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Data de Início"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="Horário"
            type="time"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Box>

        {/* Campos: Data e Hora de Término */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Data de Encerramento"
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <TextField
            label="Horário"
            type="time"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Box>

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
