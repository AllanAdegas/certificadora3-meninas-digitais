// src/pages/_app.js
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica estilos globais */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
