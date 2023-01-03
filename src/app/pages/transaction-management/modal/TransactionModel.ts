export interface Transaction {
  id: number
  senderName: string
  message: string
  amount: number
  sendingTime: string
  campaign: number
  paymentChannel: number
  account: number
  paymentStatus: string
  paypalTransactionId: string
}

