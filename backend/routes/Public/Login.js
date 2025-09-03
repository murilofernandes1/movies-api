import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();
const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  try {
    const userInfo = req.body;

    //busca usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email: userInfo.email },
    });

    // verifica se o usuário existe
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    //comparando as senhas
    const isMatch = await bcrypt.compare(userInfo.password, user.password); //comparando a senha recebida com a senha que consta no servidor

    if (!isMatch) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    //gerando o token jwt
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" }); //aqui to criando o token e definindo a validade dele

    res.status(200).json(token);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Algo deu errado, tente novamente", error: error });
  }
});

export default router;
