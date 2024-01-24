import moment from "moment";

export function isExpired(date: Date) {
  return moment().isAfter(date);
}
