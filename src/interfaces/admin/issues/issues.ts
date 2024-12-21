export interface IssuesResponse {
  issues: {
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
    status: "ready" | "ongoing" | "completed" | "pending";
    cid: string
    createdAt: string
  }[];
}
