import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { Box, Button, Stack, TextField } from "@mui/material";

import { useDisclosure } from "../../helpers/useDisclosure";
import { createPost, getToken } from "../../store";

export interface IFormFields {
  title: string;
  body: string;
}

interface AddPostProps {
  userId: string;
}

export const AddPost = ({ userId }: AddPostProps) => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, errors, control } = useForm<IFormFields>();

  const handleOpenDialog = () => onOpen();

  const handleClose = () => onClose();

  const onSubmit: SubmitHandler<IFormFields> = (post) => {
    dispatch(createPost(post, userId, token));
    onClose();
  };

  return (
    <>
      <Button onClick={handleOpenDialog}>Добавить пост</Button>
      {isOpen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              as={
                <TextField
                  name="title"
                  error={!!errors?.title?.message}
                  label="Заголовок"
                />
              }
              control={control}
              name="title"
              rules={{ required: "Должно быть заполнено" }}
            />
            <Controller
              as={
                <TextField
                  name="body"
                  error={!!errors?.body?.message}
                  label="Содержание"
                />
              }
              control={control}
              name="body"
              rules={{ required: "Должно быть заполнено" }}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button variant="contained" type="submit" sx={{ mr: 2 }}>
                Создать
              </Button>
              <Button onClick={handleClose}>Отменить</Button>
            </Box>
          </Stack>
        </form>
      )}
    </>
  );
};

export default AddPost;
