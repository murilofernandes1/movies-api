import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "minha_chave_secreta";

export default function authADM(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Acesso negado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Acesso restrito a administradores" });
    }
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
