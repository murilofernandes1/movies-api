import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/users/:id/reserva", async (req, res) => {
  const { id } = req.params;

  try {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId: id },
      select: {
        id: true,
        cadeira: { select: { numeracao: true } },
        sessao: {
          select: {
            dataHora: true,
            filme: { select: { titulo: true } },
          },
        },
      },
    });

    res.json(
      reservas.map((r) => ({
        id: r.id,
        cadeira: r.cadeira.numeracao,
        dataHora: r.sessao.dataHora,
        filme: r.sessao.filme.titulo,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar reservas" });
  }
});

export default router;
