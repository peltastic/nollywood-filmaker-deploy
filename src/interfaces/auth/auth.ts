export interface IRegisterdata {
  expertise: string[];
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ILoginResponse {
  refreshToken: string;
  accessToken: string
  user : IUserInfoData;
}

export interface IAdminLoginResponse {
  refreshToken: string;
  accessToken: string
  admin: IUserInfoData
}

export interface IUserInfoData {
  id: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  role: string;
  expertise: string[];
  ppicture?: string
  isVerified?: string
} 
