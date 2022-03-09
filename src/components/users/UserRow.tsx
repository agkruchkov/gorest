import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import { User } from "../../store";
import { useDisclosure } from "../../helpers/useDisclosure";
import PostsByUserId from "./PostsByUserId";
import AddPost from "./AddPost";

interface UserRowProps {
  user: User;
}

export const UserRow = ({ user }: UserRowProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <TableRow
        onClick={handleOpen}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          cursor: "pointer",
        }}
      >
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
      </TableRow>
      <Dialog open={isOpen}>
        <DialogTitle>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Карточка пользователя</Typography>
            {user.status === "active" ? (
              <Tooltip title="Активен">
                <CheckCircleOutlineOutlinedIcon color="success" />
              </Tooltip>
            ) : (
              <Tooltip title="Не активен">
                <DoDisturbOnOutlinedIcon />
              </Tooltip>
            )}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Table className="middle__row__cart">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Имя и фамилия:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.name}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">Пол:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.gender}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="bold">E-mail:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{user.email}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <AddPost userId={user.id} />
            <PostsByUserId userId={user.id} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserRow;
