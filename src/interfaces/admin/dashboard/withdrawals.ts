export interface IAdminWithdrawals {
  _id: string;
  cid: string;
  amount: number;
  type: "withdrawal";
  status: "pending" | "sent";
  orderId: string;
  bankname: string;
  accountnumber: string;
  createdAt: string;
  updatedAt: string;
  consultant: {
    fname: string
    lname: string
    email: string
  }
}

export interface IAdminWithdrawalsResponse {
  currentPage: number;
  totalPages: number;
  totalWithdrawals: number;
  withdrawals: IAdminWithdrawals[]
}
