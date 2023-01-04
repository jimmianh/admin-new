export interface Categories {
  id: number;
  status: number;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesRequest {
  name: string;
  image: string;
}
