export interface IActiveRequestData {
  _id: string;
  movie_title: string;
  stattusof: "pending" | "ongoing" | "ready" | "completed";
  date: string;
  nameofservice: "Chat With A Professional";
  chat_title?: string;
  orderId: string;
  createdAt: string
}

export interface IActiveRequestDataResposne {
  requests: IActiveRequestData[];
}

export interface IUserRequestHistoryResponse {
  _id: string;
  orderId: string;
  movie_title: string;
  createdAt: string
  nameofservice:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget";
    date: string
    stattusof: "pending" | "ongoing" | "ready" | "completed";
    chat_title: string   
}

export interface IResolveFiles {
  orderId: string
  files: {
    filename: string
    filepath: string
    size: number
    createdAt: string
  }[]
}