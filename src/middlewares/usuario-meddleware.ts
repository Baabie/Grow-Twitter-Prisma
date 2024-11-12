import { NextFunction, Request, Response } from "express";

export class UsuarioMiddleware {
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { nome, email, username, password } = req.body;

    if (!nome) {
      res.status(400).json({
        ok: false,
        message: "Nome é obrigatório.",
      });
    }

    if (!email) {
      res.status(400).json({
        ok: false,
        message: "Email é obrigatório.",
      });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        ok: false,
        message: "Formato de email inválido.",
      });
    }

    if (!username) {
      res.status(400).json({
        ok: false,
        message: "Username é obrigatório.",
      });
    }

    if (!password) {
      res.status(400).json({
        ok: false,
        message: "Senha é obrigatória.",
      });
    }

    if (password.length < 6) {
      res.status(400).json({
        ok: false,
        message: "A senha deve ter pelo menos 6 caracteres.",
      });
    }

    // Se todas as validações passarem, chama next()
    next();
  }
}
