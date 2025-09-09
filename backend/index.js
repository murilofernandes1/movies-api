import express from "express";
import Cadastro from "./routes/Public/Cadastro.js";
import Login from "./routes/Public/Login.js";
import Movies from "./routes/Public/Movies.js";
import handleMovies from "./routes/Admin/HandleMovies.js";
import handleSessions from "./routes/Admin/HandleSessions.js";
import handleSalas from "./routes/Admin/HandleSalas.js";
import handleReserva from "./routes/Private/HandleReserva.js";
import seeSessions from "./routes/Private/SeeSessions.js";
import auth from "./middleware/auth.js";
import authADM from "./middleware/authADM.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", Login, Cadastro);

app.use("/", auth, Movies, handleReserva, seeSessions);

app.use(
  "/",
  authADM,
  handleMovies,
  handleSessions,
  handleSalas,
  handleReserva,
  seeSessions
);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

export default app;
