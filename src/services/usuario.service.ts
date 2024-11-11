import { PrismaClient, Prisma, Usuario } from "@prisma/client";
import { prisma } from "../database/prisma.database";
import {
  CreateUsuarioDto,
  QueryFilterDto,
  UsuarioDto,
} from "../dtos/usuario.dto";
import { ResponseApi } from "../types/response";
import { Bcrypt } from "../utils/bcrypt";

export class UsuarioService {
  public async create(createUsuario: CreateUsuarioDto): Promise<ResponseApi> {
    const { nome, email, username, password } = createUsuario;

    const usuario = await prisma.usuario.findFirst({
      where: {
        OR: [{ email: email }, { username }],
      },
    });

    if (usuario) {
      if (usuario.email === email) {
        return {
          ok: false,
          code: 409,
          message: "E-mail já está em uso.",
        };
      }

      if (usuario.username === username) {
        return {
          ok: false,
          code: 409,
          message: "Username já está em uso.",
        };
      }
    }

    const bcrypt = new Bcrypt();
    const passwordHash = await bcrypt.generateHash(password);

    const usuarioCreated = await prisma.usuario.create({
      data: {
        nome: nome,
        email: email,
        username: username,
        password: passwordHash,
      },
    });

    return {
      ok: true,
      code: 201,
      message: "Usuário cadastrado com sucesso!",
      data: this.mapToDto(usuarioCreated),
    };
  }

  public async findAll(query: { nome?: string }): Promise<ResponseApi> {
    const where: Prisma.UsuarioWhereInput = {};

    if (query.nome) {
      where.nome = { contains: query.nome, mode: "insensitive" }; // Busca insensível ao caso
    }

    try {
      const usuarios = await prisma.usuario.findMany({
        where,
      });

      return {
        ok: true,
        code: 200,
        message: "Usuários buscados com sucesso!",
        data: usuarios, // Retorna a lista de usuários
      };
    } catch (error: any) {
      return {
        ok: false,
        code: 500,
        message: `Erro ao buscar usuários: ${error.message}`,
        data: [],
      };
    }
  }

  public async findOneById(id: string): Promise<ResponseApi> {
    try {
      const usuario = await prisma.usuario.findUnique({
        where: { id },
      });

      if (!usuario) {
        return {
          ok: false,
          code: 404,
          message: "Usuário não encontrado",
          data: null,
        };
      }

      return {
        ok: true,
        code: 200,
        message: "Usuário encontrado com sucesso!",
        data: usuario, // Retorna o usuário encontrado
      };
    } catch (error: any) {
      return {
        ok: false,
        code: 500,
        message: `Erro ao buscar usuário: ${error.message}`,
        data: null,
      };
    }
  }

  private mapToDto(usuario: Usuario): UsuarioDto {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      username: usuario.username,
    };
  }
}
