export interface ICustomerRequestDataResponse {
  assignments: ICustomerRequestData[];
}
export interface ICustomerRequestData {
  assignment: {
    _id: string;
    status: "ready" | "ongoing" | "completed" | "pending";
    createdDate: string
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
