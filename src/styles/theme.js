// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#552E89", // cor principal
      contrastText: "#FFFFFF", // texto claro para botões
    },
    secondary: {
      main: "#772B8C",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#C67F23",
    },
    info: {
      main: "#C18B95",
    },
    background: {
      default: "#0D0D0D", // cor de fundo
      paper: "#FFFFFF", // cor de fundo para componentes em cima do default
    },
    text: {
      primary: "#0D0D0D", // cor de texto principal
      secondary: "#552E89",
    },
  },
});

export default theme;
