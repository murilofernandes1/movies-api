import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
function generateCadeiras() {
  const cadeiras = [];
  const fileiras = ["A", "B", "C", "D", "E", "F"];
  const porFileira = 5;

  for (let f = 0; f < fileiras.length; f++) {
    for (let n = 1; n <= porFileira; n++) {
      cadeiras.push({ numeracao: `${fileiras[f]}${n}` });
    }
  }
  return cadeiras;
}

router.get("/salas", async (req, res) => {
  try {
    const salas = await prisma.sala.findMany();
    res.status(200).json(salas);
  } catch (error) {
    res
      .status(500)
      .json({ message: error instanceof Error ? error.message : error });
  }
});

router.post("/salas", async (req, res) => {
  const { numeroSala } = req.body;

  try {
    const createSala = await prisma.sala.create({
      data: {
        numeroSala: numeroSala,
      },
    });
    res.status(201).json(createSala);
  } catch (error) {
    res
      .status(500)
      .json({ message: error instanceof Error ? error.message : error });
  }
});

router.delete("/salas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cadeira.deleteMany({ where: { salaId: id } });
    await prisma.sala.delete({ where: { id } });
    res.status(200).json({ message: "Sala deletada com sucesso." });
  } catch (error) {
    res
      .status(500)
      .json({ message: error instanceof Error ? error.message : error });
  }
});

export default router;
