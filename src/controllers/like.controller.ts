import { Request, Response } from "express";
import { CreateLikeDto } from "../dtos/like.dto";
import { LikeService } from "../services/like.service";
export class LikeController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { tweetId } = req.body;
      const usuarioId = req.body.usuarioId || req.usuario?.id;

      if (!tweetId || !usuarioId) {
        res.status(400).json({
          ok: false,
          message: "ID do tweet e usuarioId são obrigatórios.",
        });
        return;
      }

      const data: CreateLikeDto = {
        tweetId,
        usuarioId,
      };

      const service = new LikeService();
      const result = await service.create(data);

      res.status(201).json({
        ok: true,
        message: "Like adicionado com sucesso.",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { tweetId } = req.query;

      const service = new LikeService();
      const result = await service.findAll(tweetId as string);

      res.status(200).json({
        ok: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new LikeService();
      const result = await service.findOneById(id);

      if (!result) {
        res.status(404).json({
          ok: false,
          message: "Like não encontrado.",
        });
        return;
      }

      res.status(200).json({
        ok: true,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { tweetId } = req.body;

      if (!tweetId) {
        res.status(400).json({
          ok: false,
          message: "ID do tweet é obrigatório.",
        });
        return;
      }

      const service = new LikeService();
      const result = await service.update(id, { tweetId });

      if (!result) {
        res.status(404).json({
          ok: false,
          message: "Like não encontrado.",
        });
        return;
      }

      res.status(200).json({
        ok: true,
        message: "Like atualizado com sucesso.",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new LikeService();
      const result = await service.remove(id);

      if (!result) {
        res.status(404).json({
          ok: false,
          message: "Like não encontrado.",
        });
        return;
      }

      res.status(200).json({
        ok: true,
        message: "Like removido com sucesso.",
      });
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }
}
