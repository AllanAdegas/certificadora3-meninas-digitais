"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/auth"; // Função Firebase para cadastro
import { db } from "@/lib/firebase"; // Firestore
import { doc, setDoc } from "firebase/firestore"; // Para salvar dados do usuário no Firestore
import { Button, TextField, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState(""); // Nome do usuário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem. Tente novamente.");
      return;
    }

    try {
      const user = await register(email, password); // Função para criar usuário no Firebase Auth
      // Salvar nome e outros dados no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
      });
      router.push("/login"); // Redireciona para o login após o cadastro
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError("Erro ao criar conta. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSignup}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Typography variant="h4" align="center" component="h1" gutterBottom>
        Crie uma conta
      </Typography>
      <TextField
        label="Nome"
        type="text"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <TextField
        label="Confirme a Senha"
        type="password"
        fullWidth
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
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
        Cadastrar-se
      </Button>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Já tem uma conta?{" "}
        <Link href="/login">
          <span style={{ color: "#772B8C", textDecoration: "none" }}>
            Faça login
          </span>
        </Link>
      </Typography>
    </Box>
  );
}