import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { editPost, getToken, Post } from "../../store";

export interface IFormFields {
  title: string;
  body: string;
}

interface EditPostProps {
  post: Post;
  onClose: () => void;
  isOpen: boolean;
}

export const EditPost = ({ post, onClose, isOpen }: EditPostProps) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const { handleSubmit, errors, control } = useForm<IFormFields>();

  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    dispatch(
      editPost(
        {
          id: post.id,
          title: data.title,
          body: data.body,
          user_id: post.user_id,
        },
        token
      )
    );
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} maxWidth="xl">
        <DialogTitle>Редактирование поста</DialogTitle>
        <DialogContent sx={{ width: "800px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} mt={2}>
              <Controller
                as={
                  <TextField
                    fullWidth
                    multiline
                    maxRows={2}
                    name="title"
                    error={!!errors?.title?.message}
                    label="Заголовок"
                  />
                }
                defaultValue={post.title}
                control={control}
                name="title"
                rules={{ required: "Должно быть заполнено" }}
              />
              <Controller
                as={
                  <TextField
                    fullWidth
                    multiline
                    maxRows={5}
                    name="body"
                    error={!!errors?.body?.message}
                    label="Содержание"
                  />
                }
                defaultValue={post.body}
                control={control}
                name="body"
                rules={{ required: "Должно быть заполнено" }}
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Сохранить
          </Button>
          <Button onClick={onClose}>Отменить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditPost;
