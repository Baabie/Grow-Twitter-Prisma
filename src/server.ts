import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

// Criando servidor com express
const app = express();

// Middlewares
app.use(cors({}));
app.use(express.json());

// Rota padrao
app.get("/", (request: Request, response: Response) => {
  response.status(200).json({ message: "Api Prisma" });
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta: ", process.env.PORT);
});
