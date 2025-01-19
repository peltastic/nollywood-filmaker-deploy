export interface IAdminUserConversations {
  appointment: {
    _id: number;
    orderId: number;
  };
  request: {
    _id: string;
    stattusof: "ongoing" | "completed" | "pending" | "ready";
    nameofservice: "Chat With A Professional";
    orderId: string;
    time: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    date: string;
    chat_title: string;
    booktime: string;
    endTime: string;
    createdAt: string;
  };
}


export interface IAdminUserConversationsResponse {
    data: IAdminUserConversations[]
    pagination: {
        total: number
        page: number
        limit: number
        totalPages: number
    }
}