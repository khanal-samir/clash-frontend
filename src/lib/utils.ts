import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Env from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// image url
export const getImageUrl = (img: string): string => {
  return `${Env.BACKEND_URL}/images/${img}`;
};
