import { clsx, type ClassValue } from "clsx";
import { env } from "@/env.mjs";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function formatPrice(price: number) {
  if (price >= 1000000) {
    return "$" + (price / 1000000).toFixed(2) + "M";
  } else if (price >= 1000) {
    return "$" + (price / 1000).toFixed(2) + "K";
  } else if (price === 0) {
    return "Free";
  } else {
    return "$" + price;
  }
}

export function formatDate(date: Date) {
  return dayjs(date).format("MMMM D, YYYY");
}

export function groupArray(array: number[], groupSize: number): number[][] {
  const groups: number[][] = [];

  for (let i = 0; i < array.length; i += groupSize) {
    const group = array.slice(i, i + groupSize);
    groups.push(group);
  }

  return groups;
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}