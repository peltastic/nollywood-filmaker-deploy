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
    nameofservice:
      | "Chat With A Professional"
      | "Read my Script and advice"
      | "Watch the Final cut of my film and advice"
      | "Look at my Budget and advice"
      | "Create a Marketing budget"
      | "Create a Pitch based on my Script"
      | "Draft Legal documents"
      | "Create a Production budget";
    stattusof: "pending" | "ongoing" | "ready" | "completed";
    orderId: string;
    synopsis: string;
    files?: string[];
    concerns: string;
    genre: string;
    platform: string;
    time?: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    date: string;
    summary: string;
    chat_title: string;
    productionCompany: string
    contactInfo: string
    movie_title: string;
    link: string;
    consultant: string;
    userId: string;
    expertise: string;
    info: string;
    actors: string;
    days: string
    budgetrange: string;
    socialTarget: string
    oohTarget: string
    visualStyle: string
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
  uid: string;
  cid: string;
  orderId: string;
  expertise: string;
}

export interface IConsultantActiveReq {
  _id: string;
  uid: string;
  cid: string;
  orderId: string;
  date: string;
  request: {
    chat_title?: string;
    movie_title: string;
    nameofservice: "Chat With A Professional";
    stattusof: "ready" | "ongoing" | "completed" | "pending";
  };
}

export interface IConsultantActiveReqResponse {
  appointments?: IConsultantActiveReq[];
}
