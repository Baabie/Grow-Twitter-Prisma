export * from "./usuario.service";
import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      usuario?: {
        id: string;
        nome: string;
        email: string;
        username: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}
