// import { toast } from "@/components/ui/use-toast";
import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

// import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a price value to a human-readable format with optional fractional digits.
 * If the price is equal to 0, "Free" is returned.
 * If the price is in the thousands range, it's displayed as "$X.XXK".
 * If the price is in the millions range, it's displayed as "$X.XXM".
 * @param price - The price value to be formatted.
 * @param fractionDigits - The number of fractional digits to display (default is 1).
 * @returns The formatted price as a string.
 */
export function formatPrice(price: number, fractionDigits: number = 0): string {
  if (typeof price !== "number" || isNaN(price)) {
    throw new Error("Invalid price value. Expected a number.");
  }

  if (typeof fractionDigits !== "number" || fractionDigits < 0) {
    throw new Error(
      "Invalid fractionDigits value. Expected a non-negative integer."
    );
  }

  if (price === 0) {
    return "Free";
  } else if (price >= 1000000) {
    const formattedPrice = (price / 1000000).toFixed(fractionDigits);
    return `$${formattedPrice}M`;
  } else if (price >= 1000) {
    const formattedPrice = (price / 1000).toFixed(fractionDigits);
    return `$${formattedPrice}K`;
  } else {
    const formattedPrice = price.toFixed(fractionDigits);
    return `$${formattedPrice}`;
  }
}

/**
 * Format a byte value to a human-readable format with optional decimal places.
 * @param bytes - The byte value to be formatted.
 * @param decimals - The number of decimal places to display (default is 0).
 * @param sizeType - The type of size to display ("accurate" or "normal", default is "normal").
 * @returns The formatted byte value as a string.
 */
export function formatBytes(
  bytes: number,
  decimals: number = 0,
  sizeType: "accurate" | "normal" = "normal"
): string {
  if (typeof bytes !== "number" || isNaN(bytes)) {
    throw new Error("Invalid bytes value. Expected a number.");
  }

  if (typeof decimals !== "number" || decimals < 0) {
    throw new Error("Invalid decimals value. Expected a non-negative integer.");
  }

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];

  if (bytes === 0) {
    return "0 Byte";
  }

  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedValue = (bytes / Math.pow(1024, i)).toFixed(decimals);
  const sizeUnit =
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytes" : sizes[i] ?? "Bytes";

  return `${formattedValue} ${sizeUnit}`;
}

/**
 * Generates a random string of the specified length using characters.
 *
 * @param length - The length of the random string to be generated (default is 8)
 * @returns The random string.
 */
export function generateRandomString(length: number = 8): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function absoluteUrl(path: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  const formattedPath = path.replace(/^\//, ""); // Remove leading slash if present
  return `${appUrl}/${formattedPath}`;
}

export function isImage(mimeType: string): boolean {
  return mimeType.split("/")[0] === "image";
}

export function groupArray(array: number[], groupSize: number): number[][] {
  const groups: number[][] = [];

  for (let i = 0; i < array.length; i += groupSize) {
    const group = array.slice(i, i + groupSize);
    groups.push(group);
  }

  return groups;
}

// export function catchError(err: unknown) {
//   if (err instanceof z.ZodError) {
//     const errors = err.issues.map((issue) => {
//       return issue.message;
//     });
//     return toast({ description: errors.join("\n"), variant: "destructive" });
//   } else if (err instanceof Error) {
//     return toast({ description: err.message, variant: "destructive" });
//   } else {
//     return toast({
//       description: "Something went wrong, please try again later.",
//       variant: "destructive",
//     });
//   }
// }

export function formatDate(date: Date | string) {
  return dayjs(date).format("MMMM D, YYYY");
}

// export function removeHttpsPrefix(url: string): string {
//   return url.replace(/^https:\/\/(www\.)?/, "");
// }