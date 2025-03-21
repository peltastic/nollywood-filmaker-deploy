import { monthNames, resolve_file_services } from "./constants/constants";
import moment from "moment";

export function getMonthName(code: number): string | null {
  const monthObj = monthNames.find((el) => el.code === code);
  if (monthObj) {
    return monthObj.month;
  }
  return null;
}

// export function progressLoadingBar() {

//   for (let i = 0; i < 40; i++) {
//     nprogress.increment();
//   }
// }

export function formDataHandler<T extends object>(body: T) {
  const formData = new FormData();
  for (const key in body) {
    if (body.hasOwnProperty(key)) {
      formData.append(key, body[key as keyof typeof body] as string);
    }
  }
  return formData;
}

export const months_data = [
  {
    value: 0,
    name: "January",
  },
  {
    value: 1,
    name: "February",
  },
  {
    value: 2,
    name: "March",
  },
  {
    value: 3,
    name: "April",
  },
  {
    value: 4,
    name: "May",
  },
  {
    value: 5,
    name: "June",
  },
  {
    value: 6,
    name: "July",
  },
  {
    value: 7,
    name: "August",
  },
  {
    value: 8,
    name: "September",
  },
  {
    value: 9,
    name: "October",
  },
  {
    value: 10,
    name: "November",
  },
  {
    value: 11,
    name: "December",
  },
];

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function convert12HT24(hour: number, type24?: boolean): number {
  const link = [
    {
      H12hour: 1,
      H21hour: 13,
    },
    {
      H12hour: 2,
      H21hour: 14,
    },
    {
      H12hour: 3,
      H21hour: 15,
    },
    {
      H12hour: 4,
      H21hour: 16,
    },
    {
      H12hour: 5,
      H21hour: 17,
    },
  ];

  let selectedHour: any = [];
  if (type24) {
    selectedHour = link.filter((el) => el.H12hour === hour);
  } else {
    selectedHour = link.filter((el) => el.H21hour === hour);
  }

  if (type24) {
    return hour >= 1 && hour <= 5 ? selectedHour[0].H21hour : hour;
  } else {
    return hour >= 13 && hour <= 17 ? selectedHour[0].H12hour : hour;
  }
}

export function get12HTime(hour: number): "AM" | "PM" {
  return hour >= 9 && hour <= 12 ? "AM" : "PM";
}

export function convertToAfricaLagosTz(time: string) {
  const hour = Number(time.split("T")[1].split(":")[0]) - 1;
  const hour_time = hour < 10 ? "0" + hour : hour;
  return `${time.split("T")[0]}T${hour_time}:00:00+01:00`;
}

export function truncateStr(word: string, length: number) {
  const str = word.substring(0, length);

  return word.length <= length ? word : str + "...";
}

export function isResolveFile(
  val:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget"
    | "Create A Pitch Deck" | "Creating A Movie Schedule"
): boolean {
  const isTrue = resolve_file_services.find((el) => el === val);

  return isTrue ? true : false;
}

export function downloadCSV(blob: Blob, filename?: string) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;

  // Set the file name
  link.setAttribute(
    "download",
    `${filename || "data"}-${moment().format("MMMM Do YYYY, h:mm:ss")}.csv`
  );

  // Trigger download
  document.body.appendChild(link);
  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function numberWithCommas(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function generateColorClass(
  service:
    | "Chat With A Professional"
    | "Read my Script and advice"
    | "Watch the Final cut of my film and advice"
    | "Look at my Budget and advice"
    | "Create a Marketing budget"
    | "Create a Pitch based on my Script"
    | "Draft Legal documents"
    | "Create a Production budget" | "Create A Pitch Deck"
) {
  const logoAssignment = [
    {
      service: "Chat With A Professional",
      class: "glo-chat-with-professional",
    },
    {
      service: "Read my Script and advice",
      class: "glo-read-my-script",
    },
    {
      service: "Watch the Final cut of my film and advice",
      class: "glo-watch-final-cut",
    },
    {
      service: "Look at my Budget and advice",
      class: "glo-look-at-my-budget ",
    },
    {
      service: "Create a Marketing budget",
      class: "glo-create-marketing ",
    },
    {
      service: "Create a Pitch based on my Script",
      class: "glo-create-a-pitch",
    },
    {
      service: "Draft Legal documents",
      class: "glo-draft-legal-docs",
    },

    {
      service: "Create a Production budget",
      class: "glo-create-prod-bud",
    },
    {
      service: "Create A Pitch Deck",
      class: "glo-read-my-script"
    }
  ];

  const colorClass = logoAssignment.find((el) => el.service === service);
  return colorClass?.class;
}

export function appendToFormData(
  formData: FormData,
  data: Record<string, any>,
  parentKey: string = ""
): FormData {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      const formKey = parentKey ? `${parentKey}[${key}]` : key;

      if (
        value &&
        typeof value === "object" &&
        !(value instanceof File) &&
        !Array.isArray(value)
      ) {
        // Recursively handle nested objects
        appendToFormData(formData, value, formKey);
      } else if (Array.isArray(value)) {
        // Handle arrays
        value.forEach((item, index) => {
          if (typeof item === "object") {
            appendToFormData(formData, item, `${formKey}[${index}]`);
          } else {
            formData.append(`${formKey}[${index}]`, item);
          }
        });
      } else if (value !== null && value !== undefined) {
        // Append scalar values
        formData.append(formKey, value);
      }
    }
  }
  return formData;
}

export function sortTimeSlots(value: string[]): string[] {
  const timeSlots = value;
  timeSlots.sort((a, b) => {
    const [hoursA, minutesA] = a.split(":").map(Number);
    const [hoursB, minutesB] = b.split(":").map(Number);

    const totalMinutesA = hoursA * 60 + minutesA;
    const totalMinutesB = hoursB * 60 + minutesB;

    return totalMinutesA - totalMinutesB;
  });
  return timeSlots;
}

export function maskNumber(input: string) {
  const str = input.toString();

  // Replace the first characters with asterisks, leaving the last four
  const masked = str.slice(0, -4).replace(/./g, "*") + str.slice(-4);

  return masked;
}

export function convertToISO8601(value: string): string {
  return value
    .split("-")
    .map((part) => part.padStart(2, "0"))
    .join("-");
}
