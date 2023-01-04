export interface CampaignModel {
  createdAt: string;
  updatedAt: string;
  status: number;
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  donations: number;
  targetAmount: number;
  currentAmount: number;
  detail: string;
  description: string;
  image: string;
  portal: string;
  categoryId: number;
  accountId: number
}

export interface FilterSearchCampaign {
  keyword: string;
  endDateCreateAt: string;
  startDateCreateAt: string;
  category: string;
  status: number;
  targetAmountStart: string;
  targetAmountEnd: string;
  id: number;
  limit: number;
  offset: number;
}
