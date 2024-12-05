import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export default function EventCard({ name, date, onEdit, onDetails }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        backgroundColor: "#dddddd",
        color: "#FFFFFF",
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
          variant="outlined"
          sx={{
            borderColor: "#C67F23",
            color: "#C67F23",
            "&:hover": { borderColor: "#772B8C", color: "#772B8C" },
          }}
          onClick={onDetails}
        >
          Detalhes
        </Button>
      </Box>
    </Card>
  );
}
