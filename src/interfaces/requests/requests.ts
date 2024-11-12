export interface IActiveRequestData {
  _id: string;
  movie_title: string;
  stattusof: "pending" | "ongoing" | "ready" | "completed";
  date: string
  nameofservice: string
}


export interface IActiveRequestDataResposne {
    request: IActiveRequestData[]
}