export interface CreateTweetDto {
  descricao: string;
}

export interface TweetDto {
  id: string;
  descricao: string;
  likes: LikeDto[];
}

export interface LikeDto {
  id: string;
}
