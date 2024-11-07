export interface CreateUsuarioDto {
  nome: string;
  email: string;
  username: string;
  password: string;
}

export interface CreateTweetDto {
  descricao: string;
}

export interface UsuarioDto {
  id: string;
  nome: string;
  email: string;
  password: string;
  username: string;
  tweets: TweetDto[];
}

export interface TweetDto {
  id: string;
  descricao: string;
  likes: LikeDto[];
}

export interface LikeDto {
  id: string;
}
