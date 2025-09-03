import express from "express";
import Cadastro from "./routes/Public/Cadastro.js";
import Login from "./routes/Public/Login.js";
import Users from "./routes/Private/Users.js";
import auth from "./middleware/auth.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", Login, Cadastro);
app.use("/", auth, Users);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});

export default app;
