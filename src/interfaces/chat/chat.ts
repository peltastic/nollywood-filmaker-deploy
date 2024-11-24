export interface IChatWithProPayload {
  title: "Chat With A Professional";
  userId: string;
  type: "Chat";
  chat_title: string;
  date: string;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  summary: string;
  consultant: string;
}


export interface ITimeSlotsResponse {
  availableHoursCount: ITimeSlots[]
}

export interface ITimeSlots {
  time: string
  isAvailable: boolean
}


export interface ISendChatMessagePayload {
  uid: string
  role: "consultant" | "user" | "admin"
  name: string
  room: string
  message: string
}

export interface ISendChatMessageFilePayload {
  uid: string
  role: string
  name: string
  room: string
  file: File
}

// export interface IChatMessages 