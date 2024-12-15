import { ICreateAvailabilityPayload } from "@/interfaces/consultants/profile/availability";

export const testSelectData = [
  {
    label: "Action",
    value: "Action",
  },
  {
    label: "Adventure",
    value: "Adventure",
  },
  {
    label: "Animation",
    value: "Animation",
  },
  {
    label: "Comedy",
    value: "Comedy",
  },
  {
    label: "Drama",
    value: "Drama",
  },
  {
    label: "Fantasy",
    value: "Fantasy",
  },
  {
    label: "Horror",
    value: "Horror",
  },
  {
    label: "Mystery",
    value: "Mystery",
  },
  {
    label: "Romance",
    value: "Romance",
  },
  {
    label: "Sci Fi",
    value: "Sci Fi",
  },
  {
    label: "Thriller",
    value: "Thriller",
  },
  {
    label: "Faith-Based",
    value: "Faith-Based",
  },
];

export const testExhibitionData = [
  {
    label: "Cinema",
    value: "Cinema",
  },
  {
    label: "Netflix",
    value: "Netflix",
  },
  {
    label: "Amazon Prime Video",
    value: "Amazon Prime Video",
  },
  {
    label: "Youtube",
    value: "Youtube",
  },
  {
    label: "TV Broadcast",
    value: "TV Broadcast",
  },
];

export const consultantTypesData = [
  {
    label: "Producer",
    value: "Producer",
  },
  {
    label: "Director",
    value: "Director",
  },
  {
    label: "Composer",
    value: "Composer",
  },
  {
    label: "Cinematographer",
    value: "Cinematographer",
  },
  {
    label: "Editor",
    value: "Editor",
  },
  {
    label: "Writer",
    value: "Writer",
  },
];
export const paymentOptions = [
  {
    label: "Card",
    value: "card",
  },
  {
    label: "Bank",
    value: "bank",
  },
  {
    label: "Transfer",
    value: "transfer",
  },
];

export const monthNames = [
  {
    month: "January",
    code: 0,
  },
  {
    month: "February",
    code: 1,
  },
  {
    month: "March",
    code: 2,
  },
  {
    month: "April",
    code: 3,
  },
  {
    month: "May",
    code: 4,
  },
  {
    month: "June",
    code: 5,
  },
  {
    month: "July",
    code: 6,
  },
  {
    month: "August",
    code: 7,
  },
  {
    month: "September",
    code: 8,
  },
  {
    month: "October",
    code: 9,
  },
  {
    month: "November",
    code: 10,
  },
  {
    month: "December",
    code: 11,
  },
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const successColor = "#22C55E";

// export const expertise =

export const defaultAvailabilityHours: {
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
}[] = [
  {
    otime: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    ctime: {
      hours: 17,
      minutes: 0,
      seconds: 0,
    },
    day: "Monday",
    status: "close",
  },
  {
    otime: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    ctime: {
      hours: 17,
      minutes: 0,
      seconds: 0,
    },
    day: "Tuesday",
    status: "close",
  },
  {
    otime: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    ctime: {
      hours: 17,
      minutes: 0,
      seconds: 0,
    },
    day: "Wednesday",
    status: "close",
  },
  {
    otime: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    ctime: {
      hours: 17,
      minutes: 0,
      seconds: 0,
    },
    day: "Thursday",
    status: "close",
  },
  {
    otime: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    ctime: {
      hours: 17,
      minutes: 0,
      seconds: 0,
    },
    day: "Friday",
    status: "close",
  },
  {
    otime: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    ctime: {
      hours: 17,
      minutes: 0,
      seconds: 0,
    },
    day: "Saturday",
    status: "close",
  },
  {
    otime: {
      hours: 9,
      minutes: 0,
      seconds: 0,
    },
    ctime: {
      hours: 17,
      minutes: 0,
      seconds: 0,
    },
    day: "Sunday",
    status: "close",
  },
];

export const time_slots = [
  { label: "9:00 AM", value: "9:00 AM" },
  {
    label: "11:00 AM",
    value: "11:00 AM",
  },

  {
    label: "1:00 PM",
    value: "1:00 PM",
  },

  {
    label: "3:00 PM",
    value: "3:00 PM",
  },

  {
    label: "5:00 PM",
    value: "5:00 PM",
  },
  {
    label: "7:00 PM",
    value: "7:00 PM",
  },
  {
    label: "9:00 PM",
    value: "9:00 PM",
  },
  {
    label: "11:00 PM",
    value: "11:00 PM",
  },
  {
    label: "1:00 AM",
    value: "1:00 AM"
  }
];

export const loaderColor = "#d9d0d5";


export const resolve_file_services = [
  "Create a Production budget",
  "Create a Marketing budget",
  "Create a Pitch based on my Script",
  "Draft Legal documents"
]