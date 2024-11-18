"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { Box, Typography, CircularProgress } from "@mui/material";
import { getAllUsers, updateUserRole, deleteUser } from "@/services/users";
import UserTable from "@/components/UserTable";

export default function ManageUsersPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState("");

  // Verificar se o usuário logado é admin
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/dashboard"); // Redirecionar para o Dashboard se não for admin
    }
  }, [user, loading, router]);

  // Buscar todos os usuários
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (err) {
        console.error("Erro ao carregar usuários:", err);
        setError("Erro ao carregar usuários. Tente novamente.");
      } finally {
        setLoadingUsers(false);
      }
    };

    if (user?.role === "admin") {
      fetchUsers();
    }
  }, [user]);

  // Alterar o papel de um usuário
  const handleUpdateRole = async (id, newRole) => {
    try {
      await updateUserRole(id, newRole);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
      );
    } catch (err) {
      console.error("Erro ao atualizar papel do usuário:", err);
      setError("Erro ao atualizar papel. Tente novamente.");
    }
  };

  // Excluir um usuário
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Erro ao excluir usuário:", err);
      setError("Erro ao excluir usuário. Tente novamente.");
    }
  };

  if (loading || loadingUsers) {
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

      <UserTable
        users={users}
        onUpdateRole={handleUpdateRole}
        onDeleteUser={handleDeleteUser}
      />
    </Box>
  );
}
