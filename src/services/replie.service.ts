import { prisma } from "../database/prisma.database";
import { Reply } from "@prisma/client";

export class ReplyService {
  public async create(
    usuarioId: string,
    tweetId: string,
    descricao: string
  ): Promise<Reply> {
    return await prisma.reply.create({
      data: {
        descricao,
        usuarioId,
        tweetId,
      },
    });
  }

  public async findAllByTweetId(tweetId: string): Promise<Reply[]> {
    return await prisma.reply.findMany({
      where: { tweetId },
      orderBy: { createdAt: "desc" },
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.reply.delete({
      where: { id },
    });
  }
}
