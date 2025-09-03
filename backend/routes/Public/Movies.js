import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/movies", async (req, res) => {
  try {
    const showMovies = await prisma.movies.findMany();
    res.status(200).json({ message: "Filmes listados com sucesso", movies });
  } catch (error) {
    res.status(500).json({ message: "Nenhum filme encontrado", error });
  }
});
