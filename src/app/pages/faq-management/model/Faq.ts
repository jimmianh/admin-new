export interface Faq {
  id: number;
  campaignId : number;
  detail: string;
  status: number;
}

export interface FaqRequest {
  campaignId : number;
  detail: string;
}
