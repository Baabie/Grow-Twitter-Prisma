import { NextFunction, Request, Response } from "express";

export class CreateUsuarioMiddleware {
  public static validateRequired(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { nome, email, username, password } = req.body;

    if (!nome) {
      res.status(400).json({ ok: false, message: "Nome é obrigatório." });
    }

    if (!email) {
      res.status(400).json({ ok: false, message: "Email é obrigatório." });
    }

    if (!username) {
      res.status(400).json({ ok: false, message: "Username é obrigatório." });
    }

    if (!password) {
      res.status(400).json({ ok: false, message: "password é obrigatório." });
    }

    return next();
  }

  public static validateTypes(req: Request, res: Response, next: NextFunction) {
    const { nome, email, username, password } = req.body;

    if (typeof nome !== "string") {
      res.status(400).json({ ok: false, message: "Nome deve ser uma string." });
    }

    if (typeof email !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "E-mail deve ser uma string." });
    }

    if (typeof username !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "Username deve ser uma string." });
    }

    if (typeof password !== "string") {
      res
        .status(400)
        .json({ ok: false, message: "Password deve ser uma string." });
    }

    return next();
  }

  public static validateData(req: Request, res: Response, next: NextFunction) {
    const { nome, email, username, password } = req.body;

    if (nome.length < 3) {
      res
        .status(400)
        .json({ ok: false, message: "Nome deve ter pelo menos 3 caracteres." });
    }

    if (!email.includes("@") || !email.includes(".com")) {
      res.status(400).json({ ok: false, message: "E-mail inválido." });
    }

    if (username.length < 4) {
      res.status(400).json({
        ok: false,
        message: "Username deve ter pelo menos 4 caracteres.",
      });
    }

    if (password.length < 6) {
      res.status(400).json({
        ok: false,
        message: "Password deve ter pelo menos 6 caracteres.",
      });
    }

    return next();
  }
}
