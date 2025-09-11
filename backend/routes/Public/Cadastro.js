import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import bcrypt from "bcrypt";
const router = express.Router();
const prisma = new PrismaClient();

router.post("/users/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const createUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
        role: user.role,
      },
    });
    res.status(201).json(createUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Os dados inseridos são inválidos, tente novamente" });
  }
});

export default router;
