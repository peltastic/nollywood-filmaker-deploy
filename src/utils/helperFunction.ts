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

