"use client";
// @ts-check

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import { Button, TextField, Typography, Box } from "@mui/material";

import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Typography variant="h4" align="center" component="h1">
        Bem-vinda :)
      </Typography>
      <TextField
        label="E-mail"
        type="email"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Senha"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <Typography variant="body2" color="error" textAlign="center">
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        sx={{ backgroundColor: "#552E89" }}
        fullWidth
      >
        Entrar
      </Button>
      <Typography component="div" variant="body2" sx={{ textAlign: "center" }}>
        Não tem uma conta?{" "}
        <Link href="/register">
          <span style={{ color: "#772B8C", textDecoration: "none" }}>
            Cadastre-se
          </span>
        </Link>
      </Typography>
    </Box>
  );
}
