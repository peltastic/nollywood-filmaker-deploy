export interface IChatWithProPayload {
  title: "Chat With A Professional";
  userId: string;
  type: "Chat";
  chat_title: string;
  date: string;
  time: string;
  summary: string;
  consultant: string;
}

export interface ITimeSlotsResponse {
  availableHoursCount: ITimeSlots[];
}

export interface ITimeSlots {
  time: string;
  isAvailable: boolean;
}

export interface ISendChatMessagePayload {
  uid: string;
  role: "consultant" | "user" | "admin";
  name: string;
  room: string;
  message: string;
}

export interface ISendChatMessageFilePayload {
  uid: string;
  role: string;
  name: string;
  room: string;
  file: File;
}

export interface IChatMessages {
  _id: string;
  uid: string;
  role: "user" | "consultant" | "admin";
  name: string;
  room: string;
  message: string;
  timestamp: string;
  type: "text" | "file" | "img";
  filename: string;
}

export interface IChatMessagesResponse {
  messages: IChatMessages[];
}

export interface IChatFiles {
  _id: string;
  path: string;
  filename?: string;
  filesize: string
}


export interface IChatFilesResponse {
  files: IChatFiles[]
}

export interface IRequestExtensionPayload {
  title: "Extension Purchase",
  userId: string
  type: "time_extension",
  length: number
  orderId: string
}

export interface IRequestExtensionResponse {
  authorization_url: string
  transaction: {
    reference: string
  }
}

export interface ISendFeedbackPayload {
  orderId: string
  userId: string
  quality: number
  speed: number
  reason: string
}