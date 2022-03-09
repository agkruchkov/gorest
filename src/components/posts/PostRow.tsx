import { useState } from "react";

import { Box, IconButton, TableCell, TableRow } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Post } from "../../store";
import PostCart from "./PostCart";
import { useDisclosure } from "../../helpers/useDisclosure";
import EditPost from "./EditPost";

interface PostProps {
  post: Post;
}

export const PostRow = ({ post }: PostProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  const handleEdit = (event: any) => {
    event.stopPropagation();
    setIsEdit(true);
  };

  const handleCloseEdit = () => setIsEdit(false);

  return (
    <>
      <TableRow
        onClick={handleOpen}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          cursor: "pointer",
          "&: hover .middle-site__posts__row__edit": {
            visibility: "visible",
          },
        }}
      >
        <TableCell>{post.id}</TableCell>
        <TableCell>{post.title}</TableCell>
        <TableCell>
          <Box
            className="middle-site__posts__row__edit"
            sx={{ visibility: "hidden" }}
          >
            <IconButton onClick={handleEdit}>
              <EditOutlinedIcon />
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>
      <PostCart
        post={post}
        onOpen={handleOpen}
        onClose={handleClose}
        isOpen={isOpen}
      />
      <EditPost post={post} onClose={handleCloseEdit} isOpen={isEdit} />
    </>
  );
};

export default PostRow;
