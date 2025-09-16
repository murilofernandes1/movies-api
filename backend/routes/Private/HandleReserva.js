import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/sessions/:sessaoId/:cadeiraId/:userId/reserva",
  async (req, res) => {
    try {
      const { sessaoId, userId, cadeiraId } = req.params;
      const sessao = await prisma.sessao.findUnique({
        where: { id: sessaoId },
        include: { sala: { include: { cadeiras: true } }, reservas: true },
      });
      if (!sessao)
        return res.status(404).json({ message: "Sessão não encontrada" });

      const cadeira = sessao.sala.cadeiras.find((c) => c.id === cadeiraId);
      if (!cadeira)
        return res.status(404).json({ message: "Cadeira não encontrada" });

      const ocupada = sessao.reservas.some((r) => r.cadeiraId === cadeiraId);
      if (ocupada)
        return res.status(400).json({ message: "Cadeira já reservada" });

      const reserva = await prisma.reserva.create({
        data: {
          sessaoId,
          cadeiraId,
          usuarioId: userId,
        },
      });

      res.json({ message: "Cadeira reservada com sucesso", reserva });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao reservar a cadeira", error });
    }
  }
);
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
