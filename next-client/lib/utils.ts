import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: Date | string | number): string {
  const date = moment(new Date(input));
  const diff = moment().diff(date, "days");
  if (diff > 1) {
    return date.format("MMM D, YYYY");
  } else {
    return date.fromNow();
  }
}

export function stringToColor(value: string) {
  let hashCode = 0;
  for (let i = 0; i < value.length; i++) {
    hashCode = (hashCode << 5) - hashCode + value.charCodeAt(i);
  }

  // Convert hash code to a 24-bit color
  const color = (hashCode & 0x00ffffff).toString(16).toUpperCase();

  // Pad with zeros to ensure a 6-digit hex code
  const paddedColor = "00000".substring(0, 6 - color.length) + color;

  // Return the color string
  return "#" + paddedColor;
}

export function stringAvatar(value: string) {
  const matches = value.match(/\b(\w)/g)?.slice(0, 2);
  return matches?.join("").toUpperCase() ?? "";
}
