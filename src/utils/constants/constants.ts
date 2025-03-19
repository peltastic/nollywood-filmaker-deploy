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
  {
    label: "Others",
    value: "Others",
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
    label: "Marketing/Distribution",
    value: "Marketing/Distribution",
  },
  {
    label: "Lawyer",
    value: "Lawyer",
  },
  {
    label: "Studio Executive",
    value: "Studio Executive",
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
  "06:00",
  "07:00",
  "08:00",
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
  "Create A Pitch Deck",
  "Creating A Movie Schedule",
];

export const film_crew_values = [
  {
    key: "Production Department",
    value: [
      "Director",
      "Screenwriter",
      "Producer",
      "Executive Producer",
      "Associate Producer",
      "Line Producer",
      "Production Manager",
      "Production Coordinator",
      "Production Assistant (PA)",
      "Unit Production Manager (UPM)",
      "Location Manager",
      "1st Assistant Director",
      "2nd Assistant Director",
      "Second Second Assistant Director",
      "Cast chaperone",
      "Production accountant",
      "Production lawyer",
      "Stunt Man",
      "Talent manager",
      "Production Driver",
      // "Location Assistant",
      // "Location Assistant (1st AD)",
      // "Location Assistant (2nd AD)",
      // "Location Assistant (2nd 2nd AD)",
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
      "Camera assistant",
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
      "Light assistant",
      "Grip assistant",
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
      "Set assistant",
      "Animal wrangler",
      "Carpenter",
      "Set painter",
    ],
  },
  {
    key: "Costume Department",
    value: [
      "Costume Designer",
      "Wardrobe Supervisor",
      "Costume Assistants",
      "Costume Standby",
      "Tailor",
    ],
  },
  {
    key: "Hair and Makeup Department",
    value: [
      "Head of Makeup",
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
      "Production Sound Mixer/Recordist",
    ],
  },
  // { key: "Music Department", value: ["Composer", "Music Supervisor"] },
  {
    key: "Video Postproduction",
    value: [
      "Postproduction supervisor",
      "Editor",
      "Assistant editor",
      "Colorist",
      "Conform editor",
      "VFX supervisor",
      "VFX artist",
      "Compositor",
      "Animator",
      "Matte painter",
      "Subtitle specialist",
    ],
  },
  {
    key: "Music/Audio Postproduction",
    value: [
      "Music supervisor",
      "Music editor",
      "Composer",
      "Dialogue editor",
      "Sound designer",
      "Foley artist",
      "ADR supervisor",
    ],
  },
  {
    key: "Sales and Marketing department",
    value: [
      "Graphic designer",
      "BTS producer",
      "Trailer editor",
      "Marketing director",
      "Content creator",
      "Premiere and events manager",
      "Distribution Executive",
      "Sales Agent",
    ],
  },
  {
    key: "Health and welfare department",
    value: [
      "On-set medic",
      "Medical assistant",
      "Craft services",
      "Craft assistant",
    ],
  },
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
  // {
  //   label: "Music Department",
  //   value: "Music Department",
  // },
  {
    label: "Video Postproduction",
    value: "Video Postproduction",
  },
  {
    label: "Audio Postproduction",
    value: "Audio Postproduction",
  },
  {
    label: "Sales and Marketing department",
    value: "Sales and Marketing department",
  },
  {
    label: "Health and welfare department",
    value: "Health and welfare department",
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
  { label: "Production company", value: "Production company" },
  {
    label: "Distribution/Exhibition company",
    value: "Distribution/Exhibition company",
  },
  { label: "Production design company", value: "Production design company" },
  { label: "Stunt company", value: "Stunt company" },
  { label: "Legal services", value: "Legal services" },
  {
    label: "Sales and marketing company",
    value: "Sales and marketing company",
  },
  { label: "Talent Agency", value: "Talent Agency" },
  { label: "Makeup Studio", value: "Makeup Studio" },
  { label: "Costume Studio", value: "Costume Studio" },
];
