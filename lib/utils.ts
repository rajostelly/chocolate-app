import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and merges Tailwind CSS classes using twMerge.
 *
 * @param inputs - Class names to be combined.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
