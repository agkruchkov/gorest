import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { getUsers, loadUsers } from "../../store";
import UserRow from "./UserRow";

export const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsers);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (_event: any, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(loadUsers(currentPage));
  }, [currentPage]);

  if (!users.data)
    return <Typography>Список пользователей загружается...</Typography>;

  return (
    <>
      <Typography gutterBottom variant="h6">
        Пользователи
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWight: 650 }} aria-label="users list">
          <TableHead>
            <TableRow>
              <TableCell>Имя</TableCell>
              <TableCell>Емейл</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.data.map((user) => (
              <UserRow user={user} key={user.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={users.totalPages}
        page={users.currentPage}
        onChange={handleChange}
      />
    </>
  );
};

export default UsersList;
