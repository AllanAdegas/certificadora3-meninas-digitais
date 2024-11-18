import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

export default function UserTable({ users, onUpdateRole, onDeleteUser }) {
  return (
    <Table sx={{ maxWidth: 800 }}>
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell>E-mail</TableCell>
          <TableCell>Papel</TableCell>
          <TableCell>Ações</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name || "Sem Nome"}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  onUpdateRole(
                    user.id,
                    user.role === "admin" ? "member" : "admin"
                  )
                }
                sx={{ marginRight: 1 }}
              >
                {user.role === "admin" ? "Rebaixar" : "Promover"}
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDeleteUser(user.id)}
              >
                Excluir
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
