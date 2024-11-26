export interface IActiveRequestData {
  _id: string;
  movie_title: string;
  stattusof: "pending" | "ongoing" | "ready" | "completed";
  date: string
  nameofservice: "Chat With A Professional"
  chat_title?: string
  orderId: string
}


export interface IActiveRequestDataResposne {
    request: IActiveRequestData[]
}