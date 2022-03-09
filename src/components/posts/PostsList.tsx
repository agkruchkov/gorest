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

import { getPosts, loadPosts } from "../../store";
import PostRow from "./PostRow";

export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleChange = (_event: any, value: number) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(loadPosts(currentPage));
  }, [currentPage]);

  if (!posts.data) return <Typography>Список постов загружается...</Typography>;

  return (
    <>
      <Typography gutterBottom variant="h5">
        Посты
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWight: 650 }} aria-label="users list">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Наименование</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.data.map((post) => (
              <PostRow key={post.id} post={post} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={posts.totalPages}
        page={posts.currentPage}
        onChange={handleChange}
      />
    </>
  );
};

export default PostsList;
