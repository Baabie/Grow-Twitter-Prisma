import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { UsuarioMiddleware } from "../middlewares/usuario-meddleware";

export class UsuarioRoutes {
  public static execute(): Router {
    const router = Router();
    const usuarioController = new UsuarioController();

    // Rota para criar um novo usuário
    router.post(
      "/usuarios",
      UsuarioMiddleware.validate,
      usuarioController.create
    );

    // Rota para seguir um usuário
    router.post("/follow", usuarioController.follow);

    // Rota para deixar de seguir um usuário
    router.post("/unfollow", usuarioController.unfollow);

    router.get("/usuarios", usuarioController.findAll);

    router.get("/usuarios/:id", usuarioController.findOneById);

    return router;
  }
}
