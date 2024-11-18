"use client";

import { useState, useEffect } from "react";
import { getAllUsers, updateUserRole, deleteUser } from "@/services/users";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
} from "@mui/material";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carregar usuários ao montar a página
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
        setError("Erro ao carregar usuários. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Atualizar a função do usuário
  const handleUpdateRole = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
      );
    } catch (err) {
      console.error("Erro ao atualizar função do usuário:", err);
      setError("Erro ao atualizar função. Tente novamente.");
    }
  };

  // Excluir usuário
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      setError("Erro ao excluir usuário. Tente novamente.");
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

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "error.main",
        }}
      >
        <Typography variant="h6">{error}</Typography>
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
        Gerenciar Usuários
      </Typography>

      <Table sx={{ maxWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Função</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name || "Sem Nome"}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleUpdateRole(
                      user.id,
                      user.role === "admin" ? "member" : "admin"
                    )
                  }
                  sx={{ marginRight: 1 }}
                >
                  {user.role === "admin" ? "Rebaixar" : "Promover"}
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {error && (
        <Typography
          variant="body2"
          color="error"
          textAlign="center"
          sx={{ mt: 2 }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
}
