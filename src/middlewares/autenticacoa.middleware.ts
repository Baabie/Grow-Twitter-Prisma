import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ ok: false, message: "Token não fornecido." });
  }

  req.usuario = {
    id: "usuarioIdExemplo",
    nome: "Nome do Usuário",
    email: "usuario@example.com",
    username: "usuario123",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  next();
};
