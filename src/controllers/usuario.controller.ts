import { Request, Response } from "express";
import { CreateUsuarioDto } from "../dtos/usuario.dto";
import { UsuarioService } from "../services";

export class UsuarioController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, username, password } = req.body;

      const data: CreateUsuarioDto = {
        nome,
        email,
        username,
        password,
      };

      const service = new UsuarioService();
      const result = await service.create(data);
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public async follow(req: Request, res: Response): Promise<void> {
    try {
      const { followerId, followingId } = req.body;

      const service = new UsuarioService();
      const response = await service.follow(followerId, followingId);
      res.status(response.code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public async unfollow(req: Request, res: Response): Promise<void> {
    try {
      const { followerId, followingId } = req.body;

      const service = new UsuarioService();
      const response = await service.unfollow(followerId, followingId);
      res.status(response.code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public async findAll(req: Request, res: Response): Promise<void> {
    try {
      const { nome } = req.query;
      const service = new UsuarioService();
      const result = await service.findAll({
        nome: nome as string,
      });

      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  public async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new UsuarioService();
      const result = await service.findOneById(id);
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }
}
