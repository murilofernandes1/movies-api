import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN = "ADMIN";

const authADM = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;

    if (decoded.role !== ADMIN) {
      return res
        .status(403)
        .json({ message: "Acesso restrito a administradores" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
export default authADM;
