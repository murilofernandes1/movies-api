import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/movies", async (req, res) => {
  try {
    const movies = await prisma.filme.findMany();
    res.status(200).json({ movies });
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(500).json({ message: "Erro interno ao buscar filmes", error });
  }
});

router.get("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const movies = await prisma.filme.findUnique({ where: { id } });
    res.status(200).json({ movies });
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    res.status(404).json({ message: "Erro interno ao buscar filmes", error });
  }
});

export default router;
