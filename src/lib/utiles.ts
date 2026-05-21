import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function concatenarClases(...entradas: ClassValue[]) {
  return twMerge(clsx(entradas));
}
