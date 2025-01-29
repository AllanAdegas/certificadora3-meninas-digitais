import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function EventCard({ name, date, onEdit, onDetails }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        border: "2px solid #552E89",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: "#C67F23" }}>
          {name}
        </Typography>
        <Typography color="#C18B95" sx={{ mb: 2 }}>
          {new Date(date).toLocaleDateString("pt-BR")}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#552E89",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#772B8C" },
          }}
          onClick={onEdit}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#C67F23",
            color: "#FFFFFF",
            "&:hover": { backgroundColor: "#935e19" },
          }}
          onClick={onDetails}
        >
          Detalhes
        </Button>
      </Box>
    </Card>
  );
}
