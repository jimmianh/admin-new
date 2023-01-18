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
  category: Category;
  sponsor: {
    id: number;
    name: string;
    image: string;
  };
  account: {
    id: number;
    username: string;
  }
}

export interface Category {
  id: number;
  name: string;
  image: string;
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

export interface ResponseTransactionCampaign {
  totalElements: number,
  totalPages: number,
  offset: number,
  limit: number,
  items: TransactionDto[]
}

export interface TransactionDto {
  senderName: string;
  message: string;
  amount: number;
  sendingTime: string;
  campaign: string;
  paymentChannel: string;
  paymentStatus: string;
  paypalTransactionId: string;
}
