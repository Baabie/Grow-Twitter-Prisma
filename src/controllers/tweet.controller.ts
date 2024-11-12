import { Request, Response } from "express";
import { Like, PrismaClient, Tweet } from "@prisma/client";
import { CreateTweetDto, TweetDto } from "../dtos/tweet.dto";
import { QueryFilterDto } from "../dtos/usuario.dto";
import { ResponseApi } from "../types/response";
import { TweetService } from "../services/tweet-service";
const prisma = new PrismaClient();

export class TweetController {
  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const { descricao, usuarioId } = req.body;

      const data: CreateTweetDto = {
        descricao,
        usuarioId,
      };

      const service = new TweetService();
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

  public async findAll({
    descricao,
    usuarioId,
  }: QueryFilterDto): Promise<ResponseApi> {
    const tweets = await prisma.tweet.findMany({
      where: {
        descricao: descricao
          ? { contains: descricao, mode: "insensitive" }
          : undefined,
        usuarioId: usuarioId ? { equals: usuarioId } : undefined,
      },
      orderBy: { createdAt: "desc" },
      include: {
        likes: true,
      },
    });
    console.log(tweets);
    return {
      ok: true,
      code: 200,
      message: "Tweets buscados com sucesso!",
      data: tweets.map((tweet) => this.mapToDto(tweet)),
    };
  }

  public static async findOneById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const service = new TweetService();
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

  private mapToDto(tweet: Tweet & { likes: Like[] }): TweetDto {
    return {
      id: tweet.id,
      descricao: tweet.descricao,
      usuarioId: tweet.usuarioId,
      likes: tweet.likes.map((like) => ({
        id: like.id,
        usuarioId: like.usuarioId,
        createdAt: like.createdAt,
        tweetId: like.tweetId,
      })),
    };
  }
}
