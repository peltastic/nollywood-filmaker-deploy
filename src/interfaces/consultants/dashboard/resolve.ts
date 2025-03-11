export interface IServiceToChatPayload {
  title:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget"
    | "Create A Pitch Deck" | "Creating A Movie Schedule";
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
