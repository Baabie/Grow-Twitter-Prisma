import { Request, Response } from "express";
import { CreateUsuarioDto } from "../dtos/usuario.dto";
import { UsuarioService } from "../services";
import { prisma } from "../database/prisma.database";

export class UsuarioController {
  public static async create(req: Request, res: Response): Promise<void> {
    const { nome, email, username, password } = req.body;

    // Verificar colunas únicas
    const usuario = await prisma.usuario.findUnique({
      where: { email: email, username: username },
    });

    if (usuario) {
      if (usuario.email === email) {
        res.status(409).json({
          ok: false,
          message: "E-mail já cadastrado.",
        });
        return;
      }

      if (usuario.username === username) {
        res.status(409).json({
          ok: false,
          message: "Usuário já está em uso.",
        });
        return;
      }
    }

    // Criação do usuário no banco de dados
    const usuarioCriado = await prisma.usuario.create({
      data: {
        nome: nome,
        email: email,
        username: username,
        password: password,
      },
    });
    res.status(201).json({
      ok: true,
      message: "Usuário criado com sucesso!",
      data: usuarioCriado,
    });
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
