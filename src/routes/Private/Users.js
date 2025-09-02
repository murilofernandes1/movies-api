import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ omit: { password: true } }); //ele omite a senha, nao informando a senha junto do user
    res.status(200).json({ message: "Usuários listados com sucesso:", users });
  } catch (error) {
    res.status(500).json({ message: "Falha no servidor" });
  }
});

export default router;
