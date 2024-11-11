import { NextFunction, Request, Response } from "express";

export class LikeMiddleware {
  public static validate(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { tweetId } = req.params;

    if (!tweetId) {
      res.status(400).json({
        ok: false,
        message: "ID do tweet é obrigatório.",
      });
    }

    return next();
  }
}
