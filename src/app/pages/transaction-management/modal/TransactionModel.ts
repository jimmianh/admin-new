export interface Transaction {
  id: number
  senderName: string
  message: string
  amount: number
  sendingTime: string
  campaignId: number
  paymentChannel: number
  accountId: number
  paymentStatus: string
  paypalTransactionId: string
}

