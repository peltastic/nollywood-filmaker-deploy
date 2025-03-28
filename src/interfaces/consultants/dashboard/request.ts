export interface ICustomerRequestDataResponse {
  assignments: ICustomerRequestData[];
}
export interface ICustomerRequestData {
  assignment: {
    _id: string;
    status: "ready" | "ongoing" | "completed" | "pending";
    createdDate: string;
    orderId: string;
  };
  info: {
    chat_title: string;
    nameofservice: string;
  };
  user: {
    email: string;
    profilepics?: string;
    fullname: string;
  };
}

export type ServiceNames =
  | "Chat With A Professional"
  | "Read my Script and advice"
  | "Watch the Final cut of my film and advice"
  | "Look at my Budget and advice"
  | "Create a Marketing budget"
  | "Create a Pitch based on my Script"
  | "Draft Legal documents"
  | "Create a Production budget"
  | "Create A Pitch Deck"
  | "Creating A Movie Schedule"
  | "Create My Movie Trailer";

export interface ICustomerReqDetails {
  request: {
    _id: string;
    nameofservice: ServiceNames;
    stattusof: "pending" | "ongoing" | "ready" | "completed";
    orderId: string;
    synopsis: string;
    files?: string[];
    concerns: string;
    characterbible: string;
    genre: string;
    platform: string;
    time?: {
      hours: number;
      minutes: number;
      seconds: number;
    };
    booktime: string;
    type: "Chat" | "request";
    date: string;
    summary: string;
    filename?: string;
    stage?: string;
    chat_title: string;
    shootdays: string;
    productionCompany: string;
    contactInfo: string;
    movie_title: string;
    link: string;
    links: string[];
    consultant: string;
    userId: string;
    expertise: string;
    info: string;
    actors: string;
    days: string;
    budgetrange: string;
    socialTarget: string;
    oohTarget: string;
    visualStyle: string;
    episodes: string;
    keyArtCreated: string[];
    showtype: string;
    estimatedBudget: string;
    putinfestivals: string;
    revprojection: string;
    keycharacters: {
      _id: string;
      character: string;
      actor: string;
    }[];
    wantsOriginalScore: string;
    keycrew: {
      _id: string;
      crew: string;
      role: string;
    }[];
    teamMenber: {
      name: string;
      bio: string;
      _id: string;
    }[];
    characterlockdate: { name: string; date: string[] }[];
    locationlockeddate: { name: string; date: string[] }[];
    startpop: { date: string }[];
    filmUpload: string;
    wantsVerticalFormat: string;
    dialogueTrack: string;
    productionCompanyLogos: string[];
    fromTheMakersOf: string;
    directorName: string;
    releaseDate: string;
    keyCastNames: {
      name: string;
      _id: string;
    }[];
  };
  user: {
    fullName: string;
    email: string;
  };
}

export interface IFetchConsultants {
  _id: string;
  fname: string;
  lname: string;
}

export interface IFetchConsultantsResponse {
  consultants: IFetchConsultants[];
}

export interface IAppointConsultantPayload {
  date: string;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  uid: string;
  cid: string;
  orderId: string;
  expertise: string;
}

export interface IConsultantActiveReq {
  _id: string;
  uid: string;
  cid: string;
  orderId: string;
  date: string;
  creationDate: string;
  request: {
    booktime?: string;
    endTime?: string;
    chat_title?: string;
    movie_title: string;
    nameofservice: "Chat With A Professional";
    stattusof: "ready" | "ongoing" | "completed" | "pending";
  };
  user: {
    fname: string;
    lname: string;
    profilepics: string;
    email: string;
  };
}

export interface IConsultantActiveReqResponse {
  appointments?: IConsultantActiveReq[];
}

export interface IServiceRequest {
  _id: string;
  date: string;
  uid: string;
  cid: string;
  orderId: string;
  creationDate: string;
  nameofservice:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
  status: "ready" | "ongoing" | "completed" | "pending";
  user_info: {
    fname: string;
    lname: string;
    email: string;
    profilepics: string;
  };
  movie_title: string;
}

export interface IRequestHistoryResponse {
  request: {
    _id: string;
    stattusof: "ready" | "ongoing" | "completed" | "pending";
    nameofservice:
      | "Chat With A Professional"
      | "Read my Script and advice"
      | "Watch the Final cut of my film and advice"
      | "Look at my Budget and advice"
      | "Create a Marketing budget"
      | "Create a Pitch based on my Script"
      | "Draft Legal documents"
      | "Create a Production budget";
    date: string;
    createdAt: string;
    chat_title: string;
    movie_title: string;
    orderId: string;
  };
  userInfo: {
    _id: string;
    fname: string;
    lname: string;
    email: string;
    profilepics: string;
  };
}

export interface IAdminResolvedFiles {
  resolves: {
    _id: string;
    orderId: string;
    filename: string;
    filepath: string;
    size: number;
    createdAt: string;
    updatedAt: string;
  }[];
}
