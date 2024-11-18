"use client";

import { useTheme } from "next-themes";
import { LightMode, DarkMode } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";

export default function RegisterLayout({ children }) {
  const { theme, setTheme } = useTheme();

  return (
    <html lang="pt-BR">
      <body
        style={{
          backgroundColor: theme === "dark" ? "#0D0D0D" : "#FFFFFF",
          color: theme === "dark" ? "#FFFFFF" : "#0D0D0D",
        }}
      >
        {/* Header */}
        <AppBar position="static" sx={{ backgroundColor: "#552E89" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Cadastro
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
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
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
            backgroundColor: "#C18B95",
            color: "#0D0D0D",
          }}
        >
          <Typography variant="body2">
            © 2024 Meninas Digitais. Todos os direitos reservados.
          </Typography>
        </Box>
      </body>
    </html>
  );
}
