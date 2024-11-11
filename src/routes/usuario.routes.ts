import { Router } from "express";
import { UsuarioMiddleware } from "../middlewares/usuario-meddleware";
import { UsuarioController } from "../controllers/usuario.controller";

export class UsuarioRoutes {
  public static execute(): Router {
    const router = Router();

    router.post(
      "/usuarios",
      UsuarioMiddleware.validate,
      UsuarioController.create
    );

    router.get("/usuarios", UsuarioController.findAll);

    router.get("/usuarios/:id", UsuarioController.findOneById);

    return router;
  }
}
