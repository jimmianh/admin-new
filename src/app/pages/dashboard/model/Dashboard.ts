export interface GeneralityDto {
  totalUser: number;
  totalAmount: number;
  totalCampaign: number;
  totalSponsor: number;
   amountByMonth: AmountByMonth[];
}

export interface AmountByMonth{
  month: number;
  amount: number;
}
