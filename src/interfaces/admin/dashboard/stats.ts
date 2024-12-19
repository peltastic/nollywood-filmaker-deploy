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
    profilepics: string
    createdAt: string
}