import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

import { isValidObjectId } from "mongoose"; // se usar mongoose só pra validar

router.get("/users/:id/reserva", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID do usuário não fornecido" });
  }

  try {
    const reservas = await prisma.reserva.findMany({
      where: { usuarioId: id },
      select: {
        id: true,
        cadeira: { select: { numeracao: true } },
        sessao: {
          select: {
            sala: true,
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
        numeroSala: r.sessao.sala.numeroSala,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar reservas" });
  }
});

router.get("/reserva/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await prisma.reserva.findUnique({
      where: { id },
      select: {
        id: true,
        cadeira: { select: { numeracao: true } },
        sessao: {
          select: {
            sala: true,
            dataHora: true,
            filme: { select: { titulo: true } },
          },
        },
      },
    });

    res.json(reserva);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar reservas" });
  }
});

export default router;
