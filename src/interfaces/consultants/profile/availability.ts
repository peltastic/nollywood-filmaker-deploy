export interface ICreateAvailabilityPayload {
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
  day:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  status: "open" | "close";
  expertise: string[];
}

// export interface ICreateAvailabilityPayload {

// }
