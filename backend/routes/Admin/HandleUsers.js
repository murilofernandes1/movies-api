import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

const ADMIN = "ADMIN";

router.put("/users/:id/updateRole", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID não encontrado" });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: { role: ADMIN },
    });

    res.status(200).json({ message: "Usuário agora é ADMIN", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Falha no servidor", error: error.message });
  }
});

export default router;
