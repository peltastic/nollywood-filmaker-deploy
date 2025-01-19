export interface IFetchWalletbalance {
  _id: string;
  cid: string;
  balance: number;
  availableBalance: number;
  status: "verified";
  dateCreated: string;
}
