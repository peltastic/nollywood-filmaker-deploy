export interface IRegisterConsultantResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    fname: string;
    lname: string;
    phone: string;
    email: string;
    role: "consultant";
    expertise: string[];
  };
}
