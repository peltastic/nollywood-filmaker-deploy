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
    _id: string;
    nameofservice: "Chat With A Professional";
    stattusof: "pending" | "ongoing" | "ready" | "completed";
    orderId: string;
    time?: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    date: string;
    summary: string;
    chat_title: string;
    consultant: string;
    userId: string
    expertise: string;
  };
  user: {
    fullName: string;
    email: string;
  };
}

export interface IFetchConsultants {
  _id: string;
  fname: string;
  lname: string;
}

export interface IFetchConsultantsResponse {
  consultants: IFetchConsultants[];
}

export interface IAppointConsultantPayload {
  date: string;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  uid: string
  cid: string
  orderId: string
  expertise: string
}
