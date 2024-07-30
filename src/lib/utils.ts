import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import ms from 'ms';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
