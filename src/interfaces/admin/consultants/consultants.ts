export interface IAdminConsultantResponse {
  consultants: {
    _id: string;
    fname: string;
    lname: string;
    phone: string;
    email: string;
    expertise: string[];
    createdAt: string;
    location?: {
      state?: string;
      country?: string;
    };
  }[];
}

export interface ICreateConsultantPayload {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  state: string;
  country: string;
  expertise: string[];
}
