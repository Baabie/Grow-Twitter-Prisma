import { TweetDto } from "./tweet.dto";

export interface CreateUsuarioDto {
  nome: string;
  email: string;
  username: string;
  password: string;
}

export interface UsuarioDto {
  id: string;
  nome: string;
  email: string;
  password: string;
  username: string;
  tweets: TweetDto[];
}

export interface QueryFilterDto {
  nome?: string;
  email?: string;
  username?: string;
}
