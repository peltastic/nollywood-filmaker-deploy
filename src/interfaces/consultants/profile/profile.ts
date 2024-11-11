export interface IEditAvailabilityPayload {
  otime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  ctime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  day: string;
  status: "open" | "close";
  expertise: string[];
}
