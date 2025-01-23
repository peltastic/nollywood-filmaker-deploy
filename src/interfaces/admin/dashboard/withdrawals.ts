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
    fname: string;
    lname: string;
    email: string;
  };
}

export interface IAdminWithdrawalsResponse {
  currentPage: number;
  totalPages: number;
  totalWithdrawals: number;
  withdrawals: IAdminWithdrawals[];
}

export interface IAdminRevenueHistory {
  _id: string;
  cid: string;
  amount: number;
  type: "Chat";
  status: "ready" | "ongoing" | "completed" | "pending";
  createdAt: string;
  updatedAt: string;
  orderId: string;
  chat_title: string;
  movie_title: string
  nameofservice:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
}


export interface IAdminRevenueHistoryResponse {
  deposits: IAdminRevenueHistory[]
}