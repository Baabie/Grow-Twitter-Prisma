import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";
import { CreateUsuarioMiddleware } from "../middlewares/create-usuario.meddleware";

export class UsuarioRoutes {
  public static execute(): Router {
    const router = Router();
    const usuarioController = new UsuarioController();

    // CREATE - POST
    router.post(
      "/usuarios",
      [
        CreateUsuarioMiddleware.validateRequired,
        CreateUsuarioMiddleware.validateTypes,
        CreateUsuarioMiddleware.validateData,
      ],
      UsuarioController.create
    );

    //FRIND ALL - GET

    router.get("/usuarios/:id", usuarioController.findOneById);

    // Rota para seguir um usuário
    router.post("/follow", usuarioController.follow);

    // Rota para deixar de seguir um usuário
    router.post("/unfollow", usuarioController.unfollow);

    return router;
  }
}
