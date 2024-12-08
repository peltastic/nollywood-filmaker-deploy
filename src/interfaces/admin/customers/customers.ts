export interface IAdminCustomers {
  email: string;
  expertise: string[];
  createdAt: string;
  fname: string;
  lname: string;
  profilepics: string;
  phone: string;
  _id: string,
}

export interface IAdminCustomersResponse {
  pagination: {
    currentPage: number;
    totalDocument: number;
    totalPages: number;
  };
  users: IAdminCustomers[];
}
