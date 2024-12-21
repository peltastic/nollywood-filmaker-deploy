export interface IAdminConsultantResponse {
  consultants: {
    _id: string;
    fname: string;
    lname: string;
    phone: string;
    email: string
    expertise: string[];
    createdAt: string;
    location?: {
      state?: string;
      country?: string;
    };
  }[];
}
