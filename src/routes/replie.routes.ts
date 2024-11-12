import { Router } from "express";
import { ReplyController } from "../controllers/replie.controller";

export class ReplyRoutes {
  public static execute(): Router {
    const router = Router();
    const replyController = new ReplyController();

    // Rota para criar uma resposta
    router.post("/", (req, res) => replyController.create(req, res));

    // Rota para listar respostas de um tweet
    router.get("/:tweetId", (req, res) =>
      replyController.findAllByTweetId(req, res)
    );

    // Rota para deletar uma resposta
    router.delete("/:id", (req, res) => replyController.delete(req, res));

    return router;
  }
}
