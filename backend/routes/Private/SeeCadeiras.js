import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/sessions/:sessaoId/cadeiras", async (req, res) => {
  try {
    const { sessaoId } = req.params;

    const sessao = await prisma.sessao.findUnique({
      where: { id: sessaoId },
      include: {
        sala: { include: { cadeiras: true } },
        reservas: true, // pega todas as reservas
      },
    });

    if (!sessao) {
      return res.status(404).json({ message: "Sessão não encontrada" });
    }

    // Mapear cadeiras com status de ocupada
    const cadeiras = sessao.sala.cadeiras.map((c) => ({
      id: c.id,
      numeracao: c.numeracao,
      ocupada: sessao.reservas.some((r) => r.cadeiraId === c.id),
    }));

    res.json(cadeiras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor", error });
  }
});

export default router;
