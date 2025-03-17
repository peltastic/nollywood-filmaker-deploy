export interface IGetUserConversations {
  _id: string;
  stattusof: "ongoing" | "completed" | "pending" | "ready";
  orderId: string;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  startTime: string;
  endTime: string;
  booktime: string;
  userId: string;
  date: string;
  nameofservice: "Chat With A Professional";
  continueCount?: number;
  chat_title: string;
  cid: {
    cid: string;
  };
  userinfo: {
    profilepics: string;
  };
  consultantId: string;
}
export interface IGetUserConversationsResponse {
  requests: IGetUserConversations[];
}

export interface IReportIssuePayload {
  uid: string;
  orderId: string;
  title: string;
  complain: string;
  cid: string;
}
