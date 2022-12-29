export interface PaymentChannel {
  id: number;
  name: string;
  clientId: string;
  secretId: string;
  payerId: string;
}

export interface PaymentChannelRequest {
  name: string;
  clientId: string;
  secretId: string;
  payerId: string;
}
