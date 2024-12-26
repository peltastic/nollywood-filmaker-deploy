export interface IssuesResponse {
  issues: {
    _id: string;
    uid: {
      fname: string;
      lname: string;
      phone: string;
      email: string;
      profilepics: string;
    };
    orderId: string;
    title: string;
    complain: string;
    status: "closed" | "opened" | "pending";
    cid: string;
    createdAt: string;
  }[];
}

export interface IPostToIssueThreadPayload {
  isid: string
  reply: string
  uid: string
  role: "admin" | "user";
}
