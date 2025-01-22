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
  email: string;
  userId: string;
  mobile: string;
  dob: string;
  bio: string;
  propic: string;
  department: string;
  role: string[];
  works: {
    title: string;
    role: string;
    link: string;
    year: string;
    _id: string
  }[];
  fee: string;
  verificationDocType: string;
  document: string;
  idNumber: string;
}

export interface ICompanyOrCrewDataResponse {
  data: ICompanyOrCrewData[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    totalPages: number;
  };
}
