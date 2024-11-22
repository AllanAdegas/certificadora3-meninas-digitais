"use client";

import { useTheme } from "next-themes";
import { LightMode, DarkMode } from "@mui/icons-material";
import { AppBar, Toolbar, IconButton, Typography, Box } from "@mui/material";

export default function LoginLayout({ children }) {
  const { theme, setTheme } = useTheme();

  return (
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
  );
}
