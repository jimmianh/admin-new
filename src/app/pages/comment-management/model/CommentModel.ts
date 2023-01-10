export interface CommentModel {
  createdAt: string;
  updatedAt: string;
  status: number;
  id: number;
  content: string;
  accountId: number;
  articleId: number;
  numberOfLike: number;
  articleTitle: string;
  username: string;
}

export interface FilterSearchComment {
  content: string;
  endDateCreateAt: string;
  startDateCreateAt: string;
  articleTitle: string;
  username: string;
  articleId: number;
  accountId: number;
  status: number;
  id: number;
  limit: number;
  offset: number;
}
