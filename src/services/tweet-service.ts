import { Like, Tweet } from "@prisma/client";
import { prisma } from "../database/prisma.database";
import { CreateTweetDto, TweetDto, UpdateTweetDto } from "../dtos/tweet.dto";
import { ResponseApi } from "../types/response";
import { QueryFilterDto } from "../dtos/usuario.dto";

export class TweetService {
  public async create(createTweet: CreateTweetDto): Promise<ResponseApi> {
    const { descricao, usuarioId } = createTweet;

    const user = await prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!user) {
      return {
        ok: false,
        code: 404,
        message: "Usuário não encontrado!",
      };
    }

    const tweetCreated = await prisma.tweet.create({
      data: {
        descricao,
        usuarioId,
      },
    });

    console.log(tweetCreated);

    return {
      ok: true,
      code: 201,
      message: "Tweet cadastrado com sucesso!",
      data: this.mapToDto(tweetCreated),
    };
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

    return {
      ok: true,
      code: 200,
      message: "Tweets buscados com sucesso!",
      data: tweets.map((tweet) => this.mapToDto(tweet)),
    };
  }

  public async findOneById(id: string): Promise<ResponseApi> {
    const tweet = await prisma.tweet.findUnique({
      where: { id },
      include: { likes: true },
    });

    if (!tweet) {
      return {
        ok: false,
        code: 404,
        message: "Tweet não encontrado!",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Tweet buscado com sucesso!",
      data: this.mapToDto(tweet),
    };
  }

  public async update(
    id: string,
    updateTweet: UpdateTweetDto
  ): Promise<ResponseApi> {
    // Verifica se o tweet existe
    const tweet = await prisma.tweet.findUnique({
      where: { id },
      include: {
        likes: true,
      },
    });

    if (!tweet) {
      return {
        ok: false,
        code: 404,
        message: "Tweet não encontrado!",
      };
    }

    await prisma.tweet.update({
      where: { id },
      data: { ...updateTweet },
    });

    const updatedTweet = await prisma.tweet.findUnique({
      where: { id },
      include: {
        likes: true,
      },
    });

    if (!updatedTweet) {
      return {
        ok: false,
        code: 404,
        message: "Tweet não encontrado após a atualização!",
      };
    }

    return {
      ok: true,
      code: 200,
      message: "Tweet atualizado com sucesso!",
      data: this.mapToDto(updatedTweet),
    };
  }

  public async remove(id: string): Promise<ResponseApi> {
    const tweet = await prisma.tweet.findUnique({
      where: { id },
      include: {
        likes: true,
      },
    });

    if (!tweet) {
      return {
        ok: false,
        code: 404,
        message: "Tweet não encontrado!",
      };
    }

    const tweetDto = this.mapToDto(tweet);

    await prisma.tweet.delete({
      where: { id },
    });

    return {
      ok: true,
      code: 200,
      message: "Tweet excluído com sucesso!",
      data: tweetDto,
    };
  }

  private mapToDto(tweet: {
    id: string;
    descricao: string;
    usuarioId: string;
    createdAt: Date;
    updatedAt: Date;
    likes?: any[];
  }): TweetDto {
    return {
      id: tweet.id,
      descricao: tweet.descricao,
      usuarioId: tweet.usuarioId,
      likes: tweet.likes
        ? tweet.likes.map((like) => ({
            id: like.id,
            usuarioId: like.usuarioId,
            createdAt: like.createdAt,
            updatedAt: like.updatedAt,
            tweetId: like.tweetId,
          }))
        : [],
    };
  }
}
