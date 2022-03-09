import { Link, Typography } from "@mui/material";

export const Home = () => {
  return (
    <Typography>
      Привет! Это начальная страница. Введи токен в верхней части страницы.
      Персональный токен можно получить{" "}
      <Link href="https://gorest.co.in/">тут</Link>
    </Typography>
  );
};

export default Home;
