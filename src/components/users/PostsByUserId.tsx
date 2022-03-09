import { useDispatch, useSelector } from "react-redux";
import { getPosts, loadPosts } from "../../store";
import { useDisclosure } from "../../helpers/useDisclosure";
import { Box, Button, Typography } from "@mui/material";

interface PostsByUserIdProps {
  userId: string;
}

export const PostsByUserId = ({ userId }: PostsByUserIdProps) => {
  const dispatch = useDispatch();
  const postsForUser = useSelector(getPosts);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    if (isOpen) onClose();
    else {
      try {
        await dispatch(loadPosts(1, userId));
        onOpen();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Button onClick={handleClick}>
        {isOpen ? "Скрыть посты" : "Показать посты пользователя"}
      </Button>
      {isOpen &&
        (postsForUser.data.length > 0 ? (
          postsForUser.data.map((post) => (
            <Box
              key={post.id}
              sx={{ display: "flex", borderBottom: "1px solid #D3D3D3", p: 2 }}
            >
              <Box mr={4} sx={{ width: "37px" }}>
                <Typography fontWeight="bold">{post.id}</Typography>
              </Box>
              <Box>
                <Typography fontWeight="bold">{post.title}</Typography>
                <Typography>{post.body}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>Постов у пользователя нет</Typography>
        ))}
    </>
  );
};

export default PostsByUserId;
