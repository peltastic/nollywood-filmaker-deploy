export interface ICompanyOrCrewData {
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
  };
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  userId: string;
  mobile: string;
  website: string;
  dob: string;
  bio: string;
  propic: string;
  department: string[];
  role: string[];
  type: string
  works: {
    title: string;
    role: string;
    link: string;
    year: string;
    _id: string;
  }[];
  clientele: {
    title: string;
    link: string;
    year: string;
    _id: string;
  }[];
  rateCard?: string
  fee: string;
  verificationDocType: string;
  document: string;
  idNumber: string;
  cacNumber: string
  apiVetting: boolean
  verified: boolean
}

export interface ICompanyOrCrewDataResponse {
  data: ICompanyOrCrewData[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  };
}
