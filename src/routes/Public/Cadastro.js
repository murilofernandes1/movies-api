import express from "express";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();
const prisma = new PrismaClient();

router.post("/cadastro", async (req, res) => {
  try {
    const user = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);

    const createUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashPassword,
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
