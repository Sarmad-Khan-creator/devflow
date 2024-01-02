import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  // Define the time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30.44 * day; // Approximate days in a month
  const year = 365.25 * day; // Approximate days in a year

  // Calculate the time difference in respective units
  const years = Math.floor(timeDifference / year);
  const months = Math.floor(timeDifference / month);
  const weeks = Math.floor(timeDifference / week);
  const days = Math.floor(timeDifference / day);
  const hours = Math.floor(timeDifference / hour);
  const minutes = Math.floor(timeDifference / minute);

  // Format the timestamp
  if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
  if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
  if (weeks > 0) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
  if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
  if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  if (minutes > 0)
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;

  return "Just now";
};

export const formatAndDivideNumber = (inputNumber: number): string => {
  let formattedNumber: string;
  let factor: number;

  if (inputNumber >= 1e6) {
    formattedNumber = (inputNumber / 1e6).toFixed(2);
    factor = 1e6;
  } else if (inputNumber >= 1e3) {
    formattedNumber = (inputNumber / 1e3).toFixed(2);
    factor = 1e3;
  } else {
    return `${inputNumber}`;
  }

  let extension: string;
  if (factor === 1e6) {
    extension = "M";
  } else if (factor === 1e3) {
    extension = "K";
  } else {
    extension = "";
  }

  return `${formattedNumber}${extension}`;
};

export const getJoinedDate = (date: Date): string => {
  const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};
