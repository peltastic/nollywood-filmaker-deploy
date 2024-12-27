export interface IGetTransactionStatsResponse {
  completedCount: number;
  totalTransactionsCount: number;
  failedOrPendingCount: number;
  totalCompletedPrice: number;
}

export interface IGetTotalCustomersAndConsultantsResponse {
  totalUsers: number;
  totalConsultants: number;
}


export interface IGetNewestUsers {
    _id: string
    fname: string
    lname: string
    email: string
    profilepics: string
    createdAt: string
}

export interface IGetSalesReportResponse {
  data: {
    month: string
    totalPrice: number
    totalTransactions: number
  }[]
}