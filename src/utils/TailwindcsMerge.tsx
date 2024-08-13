import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function tailwindCMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}