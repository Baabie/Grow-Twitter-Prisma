import { Request, Response } from "express";
import { ReplyService } from "../services/replie.service";

export class ReplyController {
  private replyService: ReplyService;

  constructor() {
    this.replyService = new ReplyService();
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId, tweetId, content } = req.body; // Assumindo que esses dados vêm do corpo da requisição
      const reply = await this.replyService.create(usuarioId, tweetId, content);
      res.status(201).json(reply);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public async findAllByTweetId(req: Request, res: Response): Promise<void> {
    try {
      const { tweetId } = req.params;
      const replies = await this.replyService.findAllByTweetId(tweetId);
      res.status(200).json(replies);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.replyService.delete(id);
      res.status(204).send(); // No content
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }
}
