import { prisma } from "../database/prisma.database";
import { CreateLikeDto } from "../dtos/like.dto";

export class LikeService {
  public async create(data: CreateLikeDto) {
    try {
      const like = await prisma.like.create({
        data: {
          tweetId: data.tweetId,
          usuarioId: data.usuarioId,
        },
      });
      return { code: 201, ok: true, data: like };
    } catch (error: any) {
      throw new Error(`Erro ao criar like: ${error.message}`);
    }
  }

  public async findAll(tweetId: string) {
    try {
      const likes = await prisma.like.findMany({
        where: { tweetId },
      });
      return { code: 200, ok: true, data: likes };
    } catch (error: any) {
      throw new Error(`Erro ao buscar likes: ${error.message}`);
    }
  }

  public async findOneById(id: string) {
    try {
      const like = await prisma.like.findUnique({ where: { id } });
      return like
        ? { code: 200, ok: true, data: like }
        : { code: 404, ok: false, message: "Like não encontrado." };
    } catch (error: any) {
      throw new Error(`Erro ao buscar like: ${error.message}`);
    }
  }

  public async update(id: string, data: Partial<CreateLikeDto>) {
    try {
      const like = await prisma.like.update({
        where: { id },
        data: { tweetId: data.tweetId },
      });
      return { code: 200, ok: true, data: like };
    } catch (error: any) {
      return { code: 404, ok: false, message: "Like não encontrado." };
    }
  }

  public async remove(id: string) {
    try {
      await prisma.like.delete({ where: { id } });
      return { code: 200, ok: true, message: "Like removido com sucesso." };
    } catch (error: any) {
      return { code: 404, ok: false, message: "Like não encontrado." };
    }
  }
}
