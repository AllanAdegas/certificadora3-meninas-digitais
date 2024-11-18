"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { updateUserInfo } from "@/services/users";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

export default function UserSettingsPage() {
  const { user, setUser, loading } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSave = async () => {
    if (!name.trim()) {
      setError("O nome não pode estar vazio.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      await updateUserInfo(user.id, { name });
      setUser({ ...user, name }); // Atualiza localmente
      setSuccess("Informações atualizadas com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar informações do usuário:", err);
      setError("Erro ao atualizar informações. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

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
        Configurações do Usuário
      </Typography>

      <TextField
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mb: 3, maxWidth: 400 }}
      />

      <Button
        variant="contained"
        sx={{ backgroundColor: "#552E89", color: "#FFFFFF", mb: 2 }}
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Salvando..." : "Salvar Alterações"}
      </Button>

      {error && (
        <Typography variant="body2" color="error" textAlign="center">
          {error}
        </Typography>
      )}
      {success && (
        <Typography variant="body2" color="success.main" textAlign="center">
          {success}
        </Typography>
      )}
    </Box>
  );
}
