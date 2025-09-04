import express from "express";
import { PrismaClient } from "@prisma/client";
import generateCadeiras from "../../utils/GenerateCadeiras";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/sessao/:id/salas", async (req, res) => {
  const sessoesId = req.params.id;
  const { numero } = req.body;

  try {
    const createSala = await prisma.sala.create({
      data: {
        numero,
        sessoes: { connect: { id: sessoesId } }, // conecta à sessão existente
        cadeiras: {
          create: generateCadeiras(), // cria as 30 cadeiras automaticamente
        },
      },
    });
    res.status(201).json(createSala);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/salas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cadeiras = await prisma.cadeira.findMany({
      where: { cadeira: { salaId: id } },
    });
    for (const cadeira of cadeiras) {
      await prisma.cadeira.deleteMany({
        where: { salaId: id },
      });
    }
    await prisma.sala.delete({ where: { id } });
    res.status(200).json({ message: "Sala deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
