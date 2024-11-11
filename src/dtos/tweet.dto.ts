import { CreateLikeDto, LikeDto } from "./like.dto";

export interface CreateTweetDto {
  descricao: string;
  usuarioId: string;
}

export interface TweetDto {
  id: string;
  descricao: string;
  usuarioId: string;
  likes: LikeDto[];
}

export interface UpdateTweetDto {
  id: string;
}
