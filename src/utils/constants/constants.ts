import {
  ICreateAvailabilityPayload,
  ICreateAvailabilityPayloadV2,
} from "@/interfaces/consultants/profile/availability";

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
  {
    label: "Not Decided Yet",
    value: "Not Decided Yet",
  },
];

export const seriesExhibitionData = [
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
  {
    label: "Not Decided Yet",
    value: "Not Decided Yet",
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
    label: "Music / Sound Designer",
    value: "Music / Sound Designer",
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
  {
    label: "VFX/Animator",
    value: "VFX/Animator",
  },
  {
    label: "Marketing",
    value: "Marketing",
  },
  {
    label: "Lawyer",
    value: "Lawyer",
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
    value: "1:00 AM",
  },
];

export const defaultAvailabilityHoursV2: ICreateAvailabilityPayloadV2[] = [
  {
    day: "Monday",
    slots: [],
    expertise: [],
    status: "closed",
  },
  {
    day: "Tuesday",
    slots: [],
    expertise: [],
    status: "closed",
  },
  {
    day: "Wednesday",
    slots: [],
    expertise: [],
    status: "closed",
  },
  {
    day: "Thursday",
    slots: [],
    expertise: [],
    status: "closed",
  },
  {
    day: "Friday",
    slots: [],
    expertise: [],
    status: "closed",
  },
  {
    day: "Saturday",
    slots: [],
    expertise: [],
    status: "closed",
  },
  {
    day: "Sunday",
    slots: [],
    expertise: [],
    status: "closed",
  },
];

export const time_slots_v2 = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

export const loaderColor = "#d9d0d5";

export const resolve_file_services = [
  "Create a Production budget",
  "Create a Marketing budget",
  "Create a Pitch based on my Script",
  "Draft Legal documents",
];

export const film_crew_values = [
  {
    key: "Production Department",
    value: [
      "Director",
      "Screenwriter",
      "Producer",
      "Executive Producer",
      "Line Producer",
      "Production Manager",
      "Production Coordinator",
      "Production Assistant (PA)",
      "Unit Production Manager (UPM)",
      "Location Manager",
      "Location Assistant",
      "Location Assistant (1st AD)",
      "Location Assistant (2nd AD)",
      "Location Assistant (2nd 2nd AD)",
      "Stunt Coordinator",
      "Intimacy Coordinator",
      "Casting Director",
      "Script Supervisor",
    ],
  },
  {
    key: "Camera Department",
    value: [
      "Director of Photography (DP)",
      "Camera Operator",
      "1st Assistant Camera (AC)",
      "2nd Assistant Camera (AC)",
      "Steadicam Operator",
      "Drone Operator",
      "Digital Imaging Technician (DIT)",
      "Video Assist Operator",
    ],
  },
  {
    key: "Lighting & Grip Department",
    value: [
      "Gaffer",
      "Best Boy Electric",
      "Electricians",
      "Key Grip",
      "Best Boy Grip",
      "Dolly Grip",
      "Rigging Grip",
    ],
  },
  {
    key: "Art Department",
    value: [
      "Production Designer",
      "Art Director",
      "Set Decorator",
      "Prop Master",
      "Props Assistant",
      "Set Dresser",
      "Construction Coordinator",
    ],
  },
  {
    key: "Costume Department",
    value: [
      "Costume Designer",
      "Wardrobe Supervisor",
      "Costume Assistants",
      "Costume Standby",
    ],
  },
  {
    key: "Hair and Makeup Department",
    value: [
      "Makeup and Hair Personnel",
      "Makeup Personnel",
      "Makeup Assistant",
      "Hair Stylist",
      "Prosthetics Artist",
      "SFX Makeup Artist",
      "On-Set Touch-Up Artist",
    ],
  },
  {
    key: "Sound Department",
    value: [
      "Production Sound Mixer",
      "Boom Operator",
      "Utility Sound Technician",
    ],
  },
  { key: "Music Department", value: ["Composer", "Music Supervisor"] },
];

export const departmentList = [
  {
    label: "Production Department",
    value: "Production Department",
  },
  {
    label: "Camera Department",
    value: "Camera Department",
  },
  {
    label: "Lighting & Grip Department",
    value: "Lighting & Grip Department",
  },
  {
    label: "Art Department",
    value: "Art Department",
  },
  {
    label: "Costume Department",
    value: "Costume Department",
  },
  {
    label: "Hair and Makeup Department",
    value: "Hair and Makeup Department",
  },
  {
    label: "Sound Department",
    value: "Sound Department",
  },
  {
    label: "Music Department",
    value: "Music Department",
  },
];

export const companyTypeList = [
  { label: "Rental Company", value: "Rental Company" },
  {
    label: "Post Production Studio (Edit/Color/Delivery)",
    value: "Post Production Studio (Edit/Color/Delivery)",
  },
  { label: "VFX Studio", value: "VFX Studio" },
  { label: "Animation Studio", value: "Animation Studio" },
  { label: "Music Studio", value: "Music Studio" },
  { label: "Craft Services", value: "Craft Services" },
];
