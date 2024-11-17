export interface IEditAvailabilityPayload {
  otime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  ctime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  day: string;
  status: "open" | "close";
  expertise: string[];
}

export interface IConsultantProfileResponse {
  _id: string;
  fname: string;
  lname: string;
  phone: string;
  email: string;
  role?: "consultant";
  location?: {
    country?: string
    state?: string
    city?: string
    postalcode?: string
  }
  bio?: string
  expertise: string[];
  website?: string
}
export interface  IUpdateConsultantProfilePayload {
  fname: string;
  lname: string;
  phone: string;
  email: string;
  role?: "consultant";
  location?: {
    country?: string
    state?: string
    city?: string
    postalcode?: string
  }
  bio?: string
  website?: string
  expertise: string[];
}
