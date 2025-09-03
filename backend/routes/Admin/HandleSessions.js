import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Criar sessão para um filme
router.post("/:filmeId", async (req, res) => {
  const filmeId = req.params.filmeId;
  const { sala, data, horario } = req.body;

  const dateTime = new Date(`${data}T${horario}`);

  try {
    const createSession = await prisma.sessao.create({
      data: {
        sala,
        dataHora: dateTime,
        filmeId,
      },
    });
    res.status(201).json(createSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Atualizar sessão pelo ID da sessão
router.put("/:id", async (req, res) => {
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

// Deletar sessão pelo ID da sessão
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.sessao.delete({ where: { id } });
    res.status(200).json({ message: "Sessão deletada com sucesso." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
