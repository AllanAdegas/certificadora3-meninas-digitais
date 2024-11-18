"use client";

import { useTheme } from "next-themes";
import { LightMode, DarkMode } from "@mui/icons-material";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";

export default function AuthLayout({ title, children }) {
  const { theme, setTheme } = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? <DarkMode /> : <LightMode />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 2,
          backgroundColor: "secondary.main",
          color: "text.primary",
        }}
      >
        <Typography variant="body2">
          © 2024 Meninas Digitais. Todos os direitos reservados.
        </Typography>
      </Box>
    </Box>
  );
}
