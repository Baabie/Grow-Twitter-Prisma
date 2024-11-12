import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioMiddleware } from "../middlewares/usuario-meddleware";

export class UsuarioRoutes {
  public static execute(): Router {
    const router = Router();
    const usuarioController = new UsuarioController();

    // Rota para criar um novo usuário
    router.post("/usuarios", UsuarioMiddleware.validate, (req, res) =>
      usuarioController.create(req, res)
    );

    // Rota para seguir um usuário
    router.post("/follow", (req, res) => usuarioController.follow(req, res));

    // Rota para deixar de seguir um usuário
    router.post("/unfollow", (req, res) =>
      usuarioController.unfollow(req, res)
    );

    router.get("/usuarios", (req, res) => usuarioController.findAll(req, res));

    router.get("/usuarios/:id", (req, res) =>
      usuarioController.findOneById(req, res)
    );

    return router;
  }
}
