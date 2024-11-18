import { NextFunction, Request, Response } from "express";

export class UsuarioMiddleware {
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { nome, email, username, password } = req.body;

    if (!nome) {
      console.log("Erro: Nome não fornecido");
      res.status(400).json({
        ok: false,
        message: "Nome é obrigatório.",
      });
    }

    if (!email) {
      console.log("Erro: Email não fornecido");
      res.status(400).json({
        ok: false,
        message: "Email é obrigatório.",
      });
    }

    if (!username) {
      console.log("Erro: Username não fornecido");
      res.status(400).json({
        ok: false,
        message: "Username é obrigatório.",
      });
    }

    if (!password) {
      console.log("Erro: Senha não fornecida");
      res.status(400).json({
        ok: false,
        message: "Senha é obrigatória.",
      });
    }

    if (password.length < 6) {
      console.log("Erro: Senha muito curta");
      res.status(400).json({
        ok: false,
        message: "A senha deve ter pelo menos 6 caracteres.",
      });
    }

    return next();
  }
}
