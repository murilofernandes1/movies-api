import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/movies/:id/sessao", async (req, res) => {
  const id = req.params.id;
  const { filmeId, data, hora, salaId } = req.body;

  if (!data || !hora || !filmeId || !salaId) {
    return res
      .status(400)
      .json({ message: "Dados incompletos para criar sessão" });
  }
  const dataHora = new Date(`${data}T${hora}`);
  try {
    const createSession = await prisma.sessao.create({
      data: {
        dataHora,
        filmeId,
        salaId,
      },
    });
    res.status(201).json(createSession);
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
