import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { UsuarioRoutes } from "./routes/usuario.routes";
import { ReplyRoutes } from "./routes/replie.routes";
import { repository } from "./repository.prisma";
import { PrismaClient } from "@prisma/client";

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

// DATABASE CONECTION
const prisma = new PrismaClient();

app.get("/usuarios", (req: Request, res: Response) => {
  const { nome, email, username, password } = req.body;

  // Validacoes de dados obrigatórios
  if (!nome) {
    res.status(400).json({ ok: false, message: "Nome é obrigatório." });
  }

  if (!email) {
    res.status(400).json({ ok: false, message: "Email é obrigatório." });
  }

  if (!username) {
    res.status(400).json({ ok: false, message: "Username é obrigatório." });
  }

  if (!password) {
    res.status(400).json({ ok: false, message: "password é obrigatório." });
  }

  // Tipo de dado

  if (typeof nome !== "string") {
    res.status(400).json({ ok: false, message: "Nome deve ser uma string." });
  }

  if (typeof email !== "string") {
    res.status(400).json({ ok: false, message: "E-mail deve ser uma string." });
  }

  if (typeof username !== "string") {
    res
      .status(400)
      .json({ ok: false, message: "Username deve ser uma string." });
  }

  if (typeof password !== "string") {
    res
      .status(400)
      .json({ ok: false, message: "Password deve ser uma string." });
  }

  if (nome.length < 3) {
    res
      .status(400)
      .json({ ok: false, message: "Nome deve ter pelo menos 3 caracteres." });
  }

  if (email.includes("@") || !email.includes(".com")) {
    res.status(400).json({ ok: false, message: "E-mail inválido." });
  }

  if (username.length < 4) {
    res.status(400).json({
      ok: false,
      message: "Username deve ter pelo menos 4 caracteres.",
    });
  }

  if (password.length < 6) {
    res.status(400).json({
      ok: false,
      message: "Password deve ter pelo menos 6 caracteres.",
    });
  }

  // Verificar colunas unicas

  const usuario = prisma.usuario.findUnique({
    where: { email },
  });

  console.log(usuario);
  res.status(201).json({ ok: true, message: "Usuário criado com sucesso!" });
});

// app.get("/usuarios", async (request: Request, response: Response) => {
//   const usuarios = await repository.usuario.findMany();

//   response.status(200).json({
//     ok: true,
//     message: "Usuários buscados com sucesso! ",
//     data: usuarios,
//   });
// });

// app.get("/usuarios/:id", async (request: Request, response: Response) => {
//   const usuarios = await repository.usuario.findMany();

//   response.status(200).json({
//     ok: true,
//     message: "Usuários buscados com sucesso! ",
//     data: usuarios,
//   });
// });

// app.get("/usuarios/:id", async (request: Request, response: Response) => {
//   const usuarios = await repository.usuario.findMany();

//   response.status(200).json({
//     ok: true,
//     message: "Usuários buscados com sucesso! ",
//     data: usuarios,
//   });
// });

app.use("/replies", ReplyRoutes.execute());

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Servidor rodando na porta: ", process.env.PORT);
});
