import { ServiceNames } from "./request";

export interface IServiceToChatPayload {
  title: ServiceNames
  userId: string;
  type: "Chat";
  chat_title: string;
  date: string;
  time: string;
  summary: string;
  consultant: string;
  originalOrderId: string;
  cid: string;
}
