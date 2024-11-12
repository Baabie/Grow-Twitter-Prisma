import { Request, Response } from "express";
import { CreateUsuarioDto } from "../dtos/usuario.dto";
import { UsuarioService } from "../services/usuario.service";

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor() {
    this.usuarioService = new UsuarioService();
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { nome, email, username, password } = req.body;

      const data: CreateUsuarioDto = {
        nome,
        email,
        username,
        password,
      };

      const result = await this.usuarioService.create(data);
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
      const { followerId, followingId } = req.body; // IDs no corpo da requisição
      const response = await this.usuarioService.follow(
        followerId,
        followingId
      );
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
      const { followerId, followingId } = req.body; // IDs no corpo da requisição
      const response = await this.usuarioService.unfollow(
        followerId,
        followingId
      );
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

      const result = await this.usuarioService.findAll({
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

      const result = await this.usuarioService.findOneById(id);
      const { code, ...response } = result;
      res.status(code).json(response);
    } catch (error: any) {
      res.status(500).json({
        ok: false,
        message: `Erro do servidor: ${error.message}`,
      });
    }
  }

  // Métodos update e remove comentados podem ser descomentados e ajustados conforme necessário.
}
