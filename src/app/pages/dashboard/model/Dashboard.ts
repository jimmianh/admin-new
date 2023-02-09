export interface GeneralityDto {
  totalUser: number;
  totalAmount: number;
  totalCampaign: number;
  totalSponsor: number;
   amountByMonth: AmountByMonth[];
  amountCategories: AmountCategories[];
}

export interface AmountByMonth{
  month: number;
  amount: number;
}

export interface AmountCategories{
  name: string;
  amount: number;
}
