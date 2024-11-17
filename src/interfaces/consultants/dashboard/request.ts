export interface ICustomerRequestDataResponse {
  assignments: ICustomerRequestData[];
}
export interface ICustomerRequestData {
  assignment: {
    _id: string;
    status: "ready" | "ongoing" | "completed" | "pending";
    createdDate: string;
    orderId: string;
  };
  info: {
    chat_title: string;
    nameofservice: string;
  };
  user: {
    email: string;
    profilepics?: string;
    fullname: string;
  };
}

export interface ICustomerReqDetails {
  request: {
    nameofservice: "Chat With A Professional";
    orderId: string;
    time?: {
      hours: number;
      minutes: number
      seconds: number
    };
    date: string
    summary: string
    chat_title: string
  };
}
