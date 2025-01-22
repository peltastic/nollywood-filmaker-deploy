export interface IFetchWalletbalance {
  _id: string;
  cid: string;
  balance: number;
  availableBalance: number;
  status: "verified";
  dateCreated: string;
}

export interface IConsultantWithdrawal {
  _id: string;
  cid: string;
  amount: string;
  type: string;
  status: "sent" | "pending";
  orderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConsultantWithdrawalResponse {
  withdrawals: IConsultantWithdrawal[];
}

export interface IConsultantRevenue {
  _id: string;
  cid: string;
  amount: string;
  type: "deposit";
  status: "completed";
  createdAt: string;
  orderId: string;
  movie_title: string;
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


export interface IConsultantRevenueResponse {
  deposits: IConsultantRevenue[]
}