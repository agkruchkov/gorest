import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Typography } from "@mui/material";

import { getComments, loadComments } from "../../store";
import { useDisclosure } from "../../helpers/useDisclosure";

interface CommentsForPostProps {
  postId: string;
}

export const CommentsForPost = ({ postId }: CommentsForPostProps) => {
  const dispatch = useDispatch();
  const comments = useSelector(getComments);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    if (isOpen) onClose();
    else {
      try {
        await dispatch(loadComments(postId));
        onOpen();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Button onClick={handleClick} fullWidth>
        {isOpen ? "Скрыть комментарии" : "Показать комментарии"}
      </Button>
      {isOpen &&
        (comments.data.length > 0 ? (
          comments.data.map((comment) => (
            <Box
              key={comment.id}
              sx={{ display: "flex", borderBottom: "1px solid #D3D3D3", p: 2 }}
            >
              <Box mr={4} sx={{ width: "200px" }}>
                <Typography fontWeight="bold">{comment.name}</Typography>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="subtitle2"
                  title={comment.email}
                >
                  {comment.email}
                </Typography>
              </Box>
              <Box>{comment.body}</Box>
            </Box>
          ))
        ) : (
          <Typography>Комментариев к посту нет</Typography>
        ))}
    </>
  );
};

export default CommentsForPost;
