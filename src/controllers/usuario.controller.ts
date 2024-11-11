import { Request, response, Response } from "express";
import { CreateUsuarioDto } from "../dtos/growTwitter.dto";
import { UsuarioService } from "../services";

export class UsuarioController {
  public static async create(req: Request, res: Response): Promise<void> {
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

  public static async findAll(req: Request, res: Response): Promise<void> {
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
        message: `Error do servidor: ${error.message}`,
      });
    }
  }

  public static async findOneById(req: Request, res: Response): Promise<void> {
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
  // public static async update(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;
  //     const { nome, email, username, password } = req.body;

  //     const service = new UsuarioService();
  //     const result = await service.update(id, {
  //       nome,
  //       email,
  //       username,
  //       password,
  //     });

  //     const { code, ...response } = result;
  //     res.status(code).json(response);
  //   } catch (error: any) {
  //     res.status(500).json({
  //       ok: false,
  //       message: `Erro do servidor: ${error.message}`,
  //     });
  //   }
  // }

  // public static async remove(req: Request, res: Response): Promise<void> {
  //   try {
  //     const { id } = req.params;

  //     const service = new UsuarioService();
  //     const result = await service.remove(id);

  //     const { code, ...response } = result;
  //     res.status(code).json(response);
  //   } catch (error: any) {
  //     res.status(500).json({
  //       ok: false,
  //       message: `Erro do servidor: ${error.message}`,
  //     });
  //   }
  // }
}
