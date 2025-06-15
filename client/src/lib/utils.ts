import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// utils/getUserId.ts
import {jwtDecode} from "jwt-decode";

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("authToken");
  if (!token) return null;

  try {
    const decoded: any = jwtDecode(token);
    return decoded.id || decoded._id || decoded.userId || null;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
};


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
