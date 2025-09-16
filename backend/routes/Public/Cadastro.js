import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import bcrypt from "bcrypt";
const router = express.Router();
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

router.post("/users/cadastro", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const createUser = await prisma.user.create({
      data: { name, email, password: hashPassword, role },
    });

    const token = jwt.sign(
      { id: createUser.id, email: createUser.email, role: createUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({ user: createUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Os dados inseridos são inválidos, tente novamente",
    });
  }
});

export default router;
