export interface IGetUserIssuesResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  issues: {
    _id: string;
    title: string;
    complain: string;
    status: "closed" | "pending" | "opened";
    createdAt: string;
  }[];
}

export interface IGetSingleUserIssuesResponse {
  issue: {
    _id: string;
    uid: {
      _id: string;
      fname: string;
      lname: string;
      phone: string;
      email: string;
      profilepics: string;
    };
    orderId: string;
    title: string;
    complain: string;
    status: "closed" | "pending" | "opened";
    createdAt: string;
  };
  issueThreads: {
    reply: string
    role: "admin" | "user"
  }[];
  consultant: {
    fname: string;
    lname: string;
    phone: string;
    email: string;
  };
}
