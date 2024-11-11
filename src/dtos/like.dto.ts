export interface CreateLikeDto {
  tweetId: string;
  usuarioId: string;
}

export interface LikeDto {
  id: string;
  usuarioId: string;
  createdAt: Date;
  tweetId: string;
}

export interface TweetDto {
  id: string;
  descricao: string;
  usuarioId: string;
  likes: LikeDto[];
}
