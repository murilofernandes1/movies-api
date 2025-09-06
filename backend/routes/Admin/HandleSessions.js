import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/sessions", async (req, res) => {
  const { filmeId, dataHora, salaId } = req.body;

  try {
    const session = await prisma.sessao.create({
      data: {
        dataHora: new Date(dataHora),
        filme: { connect: { id: filmeId } },
        sala: { connect: { id: salaId } },
      },
    });
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/sessao/:id", async (req, res) => {
  const { id } = req.params;
  const { sala, data, horario } = req.body;

  const dateTime = new Date(`${data}T${horario}`);

  try {
    const updateSession = await prisma.sessao.update({
      where: { id },
      data: { sala, dataHora: dateTime },
    });
    res.status(200).json(updateSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/sessao/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sessao.delete({ where: { id } });
    res.status(200).json({ message: "Sessão deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
