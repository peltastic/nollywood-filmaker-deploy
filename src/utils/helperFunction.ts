import { monthNames } from "./constants/constants";

export function getMonthName(code: number): string | null {
  const monthObj = monthNames.find((el) => el.code === code);
  if (monthObj) {
    return monthObj.month;
  }
  return null;
}
