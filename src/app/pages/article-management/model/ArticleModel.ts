export interface ArticleModel {
  createdAt: string;
  updatedAt: string;
  status: number;
  id: number;
  title: string;
  detail: string;
  description: string;
  image: string;
  campaignId: number;
  numberOfLike: number;
  campaignTitle: string;
}

export interface FilterSearchArticle {
  keyword: string;
  endDateCreateAt: string;
  startDateCreateAt: string;
  campaignTitle: string;
  campaignId: number;
  status: number;
  id: number;
  limit: number;
  offset: number;
}
