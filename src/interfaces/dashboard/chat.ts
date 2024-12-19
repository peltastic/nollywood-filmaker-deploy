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
  date: string;
  nameofservice: "Chat With A Professional";
  chat_title: string;
  userinfo: {
    profilepics: string;
  };
}
export interface IGetUserConversationsResponse {
  requests: IGetUserConversations[];
}
