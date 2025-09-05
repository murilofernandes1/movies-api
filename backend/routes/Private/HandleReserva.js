import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/sessao/:id/reserva", async (req, res) => {
  const sessaoId = req.params.id;
  const { numeracao } = req.body;
  const usuarioId = req.userId;

  if (!sessaoId || !numeracao || !usuarioId) {
    return res.status(400).json({ message: "Dados incompletos para reserva" });
  }

  try {
    const sessao = await prisma.sessao.findFirst({
      where: { id: sessaoId },
      include: { sala: { include: { cadeiras: true } } },
    });

    if (!sessao) {
      return res.status(404).json({ message: "Sessão não encontrada" });
    }

    if (!sessao.sala.cadeiras || sessao.sala.cadeiras.length === 0) {
      return res
        .status(404)
        .json({ message: "Sala não tem cadeiras cadastradas" });
    }

    // Procura a cadeira pelo número
    const cadeira = sessao.sala.cadeiras.find((c) => c.numeracao === numeracao);

    if (!cadeira) {
      return res.status(404).json({
        message: "Cadeira não encontrada nessa sessão",
        numeracao,
        cadeirasDisponiveis: sessao.sala.cadeiras.map((c) => c.numeracao),
      });
    }

    // Cria a reserva
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId,
        cadeiraId: cadeira.id,
        sessaoId: sessao.id,
      },
    });

    return res.status(200).json({
      message: `Cadeira ${numeracao} reservada com sucesso`,
      reserva,
    });
  } catch (error) {
    console.error("Erro ao reservar cadeira:", error);
    return res.status(500).json({
      message: "Erro ao reservar cadeira",
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.delete("/reserva/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const acharReserva = await prisma.reserva.findFirst({
      where: {
        id,
      },
    });
    const cancelarReserva = await prisma.reserva.delete({
      where: {
        id,
      },
    });
    res.status(201).json({ message: "Reserva cancelada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao cancelar reserva", error });
  }
});

export default router;
