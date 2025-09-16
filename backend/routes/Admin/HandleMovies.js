import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/movies", async (req, res) => {
  const { titulo, sinopse, duracao, dataLancamento, posterUrl } = req.body;
  try {
    const createMovie = await prisma.filme.create({
      data: {
        titulo,
        sinopse,
        posterUrl:
          posterUrl || "https://via.placeholder.com/200x300?text=Sem+Imagem",
        duracao: Number(duracao),
        dataLancamento: new Date(dataLancamento),
      },
    });
    res.status(201).json(createMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, sinopse, duracao, dataLancamento } = req.body;
  try {
    const updateMovie = await prisma.filme.update({
      where: { id },
      data: {
        titulo,
        sinopse,
        duracao: Number(duracao),
        dataLancamento: new Date(dataLancamento),
      },
    });
    res.status(200).json(updateMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteMovie = await prisma.filme.delete({
      where: { id },
    });
    res.status(200).json({ message: "Filme deletado com sucesso." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
