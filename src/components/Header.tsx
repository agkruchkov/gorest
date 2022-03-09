import { Button, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

import { getToken, onChanged } from "../store";

export const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector(getToken);

  const handleChangeToken = (event: any) => {
    dispatch(onChanged(event.target.value));
  };

  return (
    <header className="header-site container clearfix">
      <TextField
        fullWidth
        required
        label="Токен"
        helperText="Введите токен"
        onChange={handleChangeToken}
        defaultValue={token}
      />
      <Stack direction="row" spacing={2} m={4}>
        <Button component={RouterLink} to="/">
          На главную
        </Button>
        <Button component={RouterLink} to="/users">
          Пользователи
        </Button>
        <Button component={RouterLink} to="/posts">
          Посты
        </Button>
      </Stack>
    </header>
  );
};

export default Header;
