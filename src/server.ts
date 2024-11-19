import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { UsuarioRoutes } from "./routes/usuario.routes";
import { ReplyRoutes } from "./routes/replie.routes";
import { repository } from "./repository.prisma";
import { PrismaClient } from "@prisma/client";
import { CreateUsuarioMiddleware } from "./middlewares/create-usuario.meddleware";
import { UsuarioController } from "./controllers/usuario.controller";

// Criando servidor com express
const app = express();

// Middlewares
app.use(cors({}));
app.use(express.json());

app.use(UsuarioRoutes.execute());
// Rota padrao
app.get("/", (request: Request, response: Response) => {
  response.status(200).json({ message: "Api Prisma" });
});

app.use("/replies", ReplyRoutes.execute());

// ROTAS
app.use(UsuarioRoutes.execute());

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta: ", process.env.PORT);
});
