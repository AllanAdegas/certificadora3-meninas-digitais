"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { LightMode, DarkMode, Menu, Close, Logout } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { UserProvider, useUser } from "@/context/UserContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import "./globals.css";
import { removeToken } from "@/context/UserContext";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, loading } = useUser();
  const router = useRouter();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Clear auth token cookie
      removeToken();
      setSidebarOpen(false);
      router.push("/login"); // Redireciona para a tela de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const navigateAndRefresh = (path) => {
    // Fecha o sidebar antes de navegar
    setSidebarOpen(false);
    router.push(path);
    router.refresh(); // Força o refresh da página
  };

  return (
    <>
      {/* Header */}
      <AppBar position="fixed" sx={{ backgroundColor: "#552E89" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            {isSidebarOpen ? <Close /> : <Menu />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Meninas Digitais
          </Typography>
          {!loading && user ? (
            <Box sx={{ textAlign: "right", mr: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {user.name || "Sem Nome"}
              </Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Box>
          ) : (
            <Typography variant="body2" sx={{ mr: 2 }}></Typography>
          )}
          {/* <IconButton
            edge="end"
            color="inherit"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <DarkMode /> : <LightMode />}
          </IconButton> */}
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer anchor="left" open={isSidebarOpen} onClose={toggleSidebar}>
        <Box sx={{ width: 250, backgroundColor: "#772B8C", height: "100%" }}>
          <Typography
            variant="h6"
            sx={{ color: "#FFFFFF", textAlign: "center", py: 2 }}
          >
            Meninas Digitais
          </Typography>
          <hr></hr>
          <List>
            {/* Link para Gerenciar Usuários - Apenas Admin */}
            {user?.role === "admin" && (
              <ListItem>
                <ListItemButton
                  onClick={() => navigateAndRefresh("/users")}
                  sx={{ color: "#FFFFFF" }}
                >
                  <ListItemText primary="Usuários" />
                </ListItemButton>
              </ListItem>
            )}

            {/* Link para Eventos */}
            {user?.role === "admin" && (
              <ListItem>
                <ListItemButton
                  onClick={() => navigateAndRefresh("/dashboard")}
                  sx={{ color: "#FFFFFF" }}
                >
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            )}

            {/* Link para Client */}
            <ListItem>
              <ListItemButton
                onClick={() => navigateAndRefresh("/client")}
                sx={{ color: "#FFFFFF" }}
              >
                <ListItemText primary="Inscreva-se" />
              </ListItemButton>
            </ListItem>

            {/* Link para Calendário */}
            <ListItem>
              <ListItemButton
                onClick={() => navigateAndRefresh("/calendar")}
                sx={{ color: "#FFFFFF" }}
              >
                <ListItemText primary="Calendário" />
              </ListItemButton>
            </ListItem>

            {/* Link para Sobre */}
            <ListItem>
              <ListItemButton
                onClick={() => navigateAndRefresh("/sobre")}
                sx={{ color: "#FFFFFF" }}
              >
                <ListItemText primary="Sobre" />
              </ListItemButton>
            </ListItem>

            {/* Link para Sair */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  color: "#FFFFFF",
                  "&:hover": {
                    backgroundColor: "#995C99",
                    cursor: "pointer",
                  },
                }}
              >
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          backgroundColor: "#FFFFFF",
          color: "#0D0D0D",
        }}
      >
        {/* UserProvider para fornecer o contexto global do usuário */}
        <AppRouterCacheProvider>
          <UserProvider>
            <Header />
            {/* Main Content */}
            <Box sx={{ pt: 8, px: 2, minHeight: "100vh" }}>{children}</Box>
            {/* Footer */}
            <Box
              component="footer"
              sx={{
                textAlign: "center",
                py: 2,
                backgroundColor: "#C18B95",
                color: "#0D0D0D",
                margin: 0,
              }}
            >
              <Typography variant="body2">
                © 2024 Meninas Digitais. Todos os direitos reservados.
              </Typography>
            </Box>
          </UserProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
