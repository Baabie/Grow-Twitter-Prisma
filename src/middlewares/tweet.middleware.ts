import { NextFunction, Request, Response } from "express";

export class TweetMiddleware {
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { conteudo } = req.body;

    if (!conteudo) {
      res.status(400).json({
        ok: false,
        message: "Conteúdo do tweet é obrigatório.",
      });
    }

    if (conteudo.length > 280) {
      res.status(400).json({
        ok: false,
        message: "O tweet não pode exceder 280 caracteres.",
      });
    }

    return next();
  }
}
