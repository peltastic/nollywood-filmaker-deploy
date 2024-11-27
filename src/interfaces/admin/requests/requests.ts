export interface ICustomerRequest {
  _id: string;
  stattusof: "pending" | "completed" | "ready" | "ongoing"
  nameofservice: "Chat With A Professional" | "Read my Script and advice"
  orderId: string;
  date: string;
  chat_title?: string;
  movie_title?: string
  rating?: string;
  user: {
    fname: string
    lname: string
    email: string
  }
}

export interface IFetchCustomerRequestsResponse {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalDocuments: number;
  };
  requests: ICustomerRequest[];
}
