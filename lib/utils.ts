import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// add cn function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
