import { Box, Typography } from "@mui/material";

export default function Card({ title, value, color }) {
  return (
    <Box
      sx={{
        backgroundColor: color || "#552E89",
        color: "#FFFFFF",
        padding: 2,
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "100%",
        maxWidth: 300,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ mt: 1, fontWeight: "bold" }}>
        {value}
      </Typography>
    </Box>
  );
}
