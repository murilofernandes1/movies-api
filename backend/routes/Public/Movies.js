import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/movies", async (req, res) => {
  const newMovie = req.body;

  const movieData = {
    titulo: newMovie.titulo,
    sinopse: newMovie.sinopse,
    duracao: Number(newMovie.duracao),
    dataLancamento: new Date(newMovie.dataLancamento),
  };
  try {
    const createMovie = await prisma.filme.create({
      data: movieData,
    });
    res.status(201).json(createMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/movies", async (req, res) => {
  const movies = req.body;
  try {
    const showMovies = await prisma.filme.findMany({
      include: { sessao: true },
    });

    res
      .status(200)
      .json({ message: "Filmes listados com sucesso", movies: showMovies });
  } catch (error) {
    res.status(500).json({ message: "Nenhum filme encontrado", error });
  }
});

export default router;
