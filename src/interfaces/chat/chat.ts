export interface IChatWithProPayload {
  title: "Chat with a professional";
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
