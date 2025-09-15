import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/sessions", async (req, res) => {
  const sessionId = req.params.id;
  try {
    const verSessoes = await prisma.sessao.findMany({
      include: {
        titulo: { select: { titulo: true } },
        filme: { select: { titulo: true } },
      },
    });
    if (!verSessoes) {
      res.status(404).json({ message: "Sessões não encontradas" });
    }
    res.status(200).json(verSessoes);
  } catch (error) {
    console.error("Erro ao buscar sessões", error);
    res.status(500).json({ message: "Ocorreu um erro no servidor", error });
  }
});
router.get("/sessions/:id", async (req, res) => {
  const sessionId = req.params.id;
  try {
    const verSessoes = await prisma.sessao.findMany({
      include: {
        titulo: { select: { titulo: true } },
        filme: { select: { titulo: true } },
      },
    });
    if (!verSessoes) {
      res.status(404).json({ message: "Sessões não encontradas" });
    }
    res.status(200).json(verSessoes);
  } catch (error) {
    console.error("Erro ao buscar sessões", error);
    res.status(500).json({ message: "Ocorreu um erro no servidor", error });
  }
});

router.get("/movies/:id/sessions", async (req, res) => {
  const { id } = req.params;
  try {
    const verSessoes = await prisma.sessao.findMany({
      where: { filmeId: id },
      include: {
        filme: { select: { titulo: true } },
        sala: true,
      },
    });
    if (verSessoes.length === 0) {
      return res.status(404).json({ message: "Sessões não encontradas" });
    }
    res.status(200).json(verSessoes);
  } catch (error) {
    console.error("Erro ao buscar sessões", error);
    res.status(500).json({ message: "Ocorreu um erro no servidor", error });
  }
});

export default router;
