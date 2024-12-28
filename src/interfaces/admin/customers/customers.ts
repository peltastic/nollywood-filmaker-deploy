import {
  IActiveRequestData,
  IUserRequestHistoryResponse,
} from "@/interfaces/requests/requests";

export interface IAdminCustomers {
  email: string;
  expertise: string[];
  createdAt: string;
  fname: string;
  lname: string;
  profilepics: string;
  phone: string;
  _id: string;
}

export interface IAdminCustomersResponse {
  pagination: {
    currentPage: number;
    totalDocument: number;
    totalPages: number;
  };
  users: IAdminCustomers[];
}

export interface IFetchUserOverview {
  metrics: {
    averageRatings: {
      quality: number;
      speed: number;
    };
    totalChats: number;
    totalPrice: number;
    totalTransactions: number;
  };
  user: {
    createdAt: string;
    expertise: string[];
    fname: string;
    lname: string;
    email: string;
    location?: {
      city?: string;
      state?: string;
      country?: string;
    };
    phone: string;
    profilepics: string;
  };
}

export interface IFetchUserRequestHistory {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  requests: IUserRequestHistoryResponse[];
}

export interface IFetchActiveUserRequest {
  page: number;
  limit: number;
  total: number;
  requests: IActiveRequestData[];
}
