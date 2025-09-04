import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/sessao/:id/reserva", async (req, res) => {
  const salaId = req.params.id; //pega o id da sala
  const { numeracao } = req.body; //aqui ele requisita a numeraçãoda cadeira
  const usuarioId = req.userId; //e usa o id do usuario para saber quem reservou

  try {
    const cadeira = await prisma.cadeira.findFirst({
      where: { salaId, numeracao }, //aqui é o local onde a cadeira esta
    });
    const reserva = await prisma.reserva.create({
      data: {
        usuarioId, // quem esta reservando
        cadeiraId: cadeira.id, //id da cadeira reservada
        sessaoId, //id da sessão que a cadeira esta sendo reservada
      },
    });
    res
      .status(200)
      .json({ message: `Cadeira ${numeracao} reservada por ${usuarioId}` });
  } catch (error) {
    res.status(500).json({ message: "Erro ao reservar sala", error });
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
