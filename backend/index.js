import express from "express";
import Cadastro from "./routes/Public/Cadastro.js";
import Login from "./routes/Public/Login.js";
import Movies from "./routes/Public/Movies.js";
import handleMovies from "./routes/Admin/HandleMovies.js";
import handleSessions from "./routes/Admin/HandleSessions.js";
import auth from "./middleware/auth.js";
import authADM from "./middleware/authADM.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Rotas públicas
app.use("/", Login, Cadastro, Movies);

// Middleware de autenticação
app.use("/", auth, Movies);

// Middleware de admin + rotas admin
app.use("/", authADM, handleMovies, handleSessions);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

export default app;
