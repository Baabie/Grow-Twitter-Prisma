import { Usuario } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuario;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: Usuario;
    }
  }
}
