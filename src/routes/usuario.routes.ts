import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";

const router = Router();

router.get("/usuarios", UsuarioController.findAll);

export default router;
