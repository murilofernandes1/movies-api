import express from "express";
import Cadastro from "./routes/Public/Cadastro.js";
import Login from "./routes/Public/Login.js";
import Movies from "./routes/Public/Movies.js";
import handleMovies from "./routes/Admin/HandleMovies.js";
import handleSessions from "./routes/Admin/HandleSessions.js";
import handleSalas from "./routes/Admin/HandleSalas.js";
import handleReserva from "./routes/Private/HandleReserva.js";
import seeSessions from "./routes/Private/SeeSessions.js";
import handleUsers from "./routes/Admin/Users.js";
import seeCadeiras from "./routes/Private/SeeCadeiras.js";
import updateProfile from "./routes/Private/HandleProfile.js";
import seeReservas from "./routes/Private/SeeReservas.js";
import auth from "./middleware/auth.js";
import authADM from "./middleware/authADM.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://cinemao.vercel.app/",
  })
);

app.use("/", Login, Cadastro, Movies, seeSessions);

app.use(
  "/",
  auth,
  Movies,
  handleReserva,
  seeSessions,
  updateProfile,
  seeCadeiras,
  seeReservas
);

app.use(
  "/",
  authADM,
  handleMovies,
  handleSessions,
  handleSalas,
  handleReserva,
  seeSessions,
  handleUsers,
  updateProfile,
  seeCadeiras
);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export default app;
