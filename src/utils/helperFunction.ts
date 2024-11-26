import { nprogress } from "@mantine/nprogress";
import { monthNames } from "./constants/constants";

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
