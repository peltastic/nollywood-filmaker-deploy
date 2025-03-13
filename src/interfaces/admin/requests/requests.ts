export interface ICustomerRequest {
  _id: string;
  stattusof: "pending" | "completed" | "ready" | "ongoing";
  nameofservice: "Chat With A Professional" | "Read my Script and advice";
  orderId: string;
  date: string;
  chat_title?: string;
  movie_title?: string;
  rating?: string;
  createdAt: string;
  user: {
    fname: string;
    lname: string;
    email: string;
    profilepics: string;
  };
  assignedConsultant: {
    fname: string
    lname: string
  } | null
}

export interface IFetchCustomerRequestsResponse {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalDocuments: number;
  };
  requests: ICustomerRequest[];
}

export interface IAssignServiceToConsultantPayload {
  date: string;
  uid: string;
  cid: string;
  orderId: string;
  expertise: string;
  nameofservice: string;
  type: "request";
  status: "pending";
}
