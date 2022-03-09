import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

import { Post } from "../../store";
import CommentsForPost from "./CommentsForPost";

interface PostCartProps {
  post: Post;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const PostCart = ({ post, onOpen, onClose, isOpen }: PostCartProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Карточка поста</DialogTitle>
      <DialogContent>
        <Stack spacing={2} direction="row">
          <Box mr={4} sx={{ width: "37px" }}>
            <Typography fontWeight="bold">{post.id}</Typography>
          </Box>
          <Box>
            <Typography fontWeight="bold">{post.title}</Typography>
            <Typography>{post.body}</Typography>
          </Box>
        </Stack>
        <CommentsForPost postId={post.id} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostCart;
