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

export interface IFetchConsultantOverview {
  alltimeclaimedrev: number;
  alltimependingrev: number;
  alltimerev: number;
  consultant: {
    _id: string
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
  };
}

export interface IFetchActiveConsultantRequest {
  page: number;
  limit: number;
  total: number;
  requests: {
    orderId: string;
    request: {
      movie_title?: string;
      chat_title?: string;
      stattusof: "pending" | "ongoing" | "ready" | "completed" | "awaiting";
      createdAt: string;
      nameofservice:
      | "Chat With A Professional"
      | "Read my Script and advice"
      | "Watch the Final cut of my film and advice"
      | "Look at my Budget and advice"
      | "Create a Marketing budget"
      | "Create a Pitch based on my Script"
      | "Draft Legal documents"
      | "Create a Production budget";
    };
    user: {
      email: string;
      fname: string;
      lname: string;
      phone: string;
      profilepics: string;
    };
  }[];
}

export interface IFetchConsultantRequestHistory {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
  completedRequests: {
    request: {
      _id: string;
      stattusof: "pending" | "ongoing" | "ready" | "completed" | "awaiting";
      orderId: string;
      date: string;
      chat_title?: string;
      movie_title?: string;
      createdAt: string;
      nameofservice:
        | "Chat With A Professional"
        | "Read my Script and advice"
        | "Watch the Final cut of my film and advice"
        | "Look at my Budget and advice"
        | "Create a Marketing budget"
        | "Create a Pitch based on my Script"
        | "Draft Legal documents"
        | "Create a Production budget";
    };
    userInfo: {
      fname: string;
      lname: string;
      email: string;
      profilepics: string;
    };
  }[];
}
