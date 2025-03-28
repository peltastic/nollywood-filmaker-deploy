import { ServiceNames } from "../consultants/dashboard/request";

export interface IActiveRequestData {
  _id: string;
  movie_title: string;
  stattusof: "pending" | "ongoing" | "ready" | "completed" | "awaiting";
  date: string;
  nameofservice: "Chat With A Professional";
  chat_title?: string;
  orderId: string;
  createdAt: string;
  cid: string;
  booktime?: string;
  endTime?: string;
}

export interface IActiveRequestDataResposne {
  page: number;
  limit: number;
  total: number;
  requests: IActiveRequestData[];
}

export interface IUserRequestHistoryResponse {
  _id: string;
  orderId: string;
  movie_title: string;
  createdAt: string;
  nameofservice: ServiceNames
  date: string;
  stattusof: "pending" | "ongoing" | "ready" | "completed" | "awaiting";
  chat_title: string;
  assignedConsultant: {
    fname: string;
    lname: string;
  } | null;
}

export interface IResolveFiles {
  orderId: string;
  files: {
    filename: string;
    filepath: string;
    size: number;
    createdAt: string;
  }[];
}
