export interface IGetUserProfileResponse {
  userId: string;
  email: string;
  phone?: string;
  fname: string;
  lname: string;
  //   role: "user";
  expertise: string[];
  location: {
    country?: string;
    state?: string;
    city?: string;
    postalcode?: string;
  };
  bio?: string;
  website?: string;
}

export interface IUpdateUserProfilePayload {
  fname: string;
  lname: string;
  phone?: string;
  email: string;
  bio?: string;
  expertise: string[];
  location: {
    country?: string;
    state?: string;
    city?: string;
    postalcode?: string;
  };
  website?: string
}


export interface IUpdateUserPreference {
  newRequestOrder?: "on" | "off",
  updateOnMyOrders?: "on" | "off"
  recommendation?: "on" | "off"
  currency?: string
  timezone?: string
}

export interface IUserPreferencesDataResponse {
  preferences: IUpdateUserPreference
}