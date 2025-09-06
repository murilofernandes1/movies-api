import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/sessions", async (req, res) => {
  const { id } = req.params;
  try {
    const verSessoes = await prisma.sessao.findMany({
      where: {
        id,
      },
    });
    if (!verSessoes) {
      res.status(404).json({ message: "Sessões não encontradas" });
    }
    res.status(200).json({ message: `Sessões disponiveis:`, verSessoes });
  } catch (error) {
    res.status(500).json({ message: "Ocorreu um erro no servidor", error });
  }
});

export default router;
