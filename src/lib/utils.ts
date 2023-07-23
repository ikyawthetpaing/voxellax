import { clsx, type ClassValue } from "clsx";
import { env } from "@/env.mjs";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { MimeType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
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
// export function formatPrice(price: number, fractionDigits: number = 1): string {
//   if (typeof price !== "number" || isNaN(price)) {
//     throw new Error("Invalid price value. Expected a number.");
//   }

//   if (typeof fractionDigits !== "number" || fractionDigits < 0) {
//     throw new Error(
//       "Invalid fractionDigits value. Expected a non-negative integer."
//     );
//   }

//   if (price === 0) {
//     return "Free";
//   } else if (price >= 1000000) {
//     const formattedPrice = (price / 1000000).toFixed(fractionDigits);
//     return `$${formattedPrice}M`;
//   } else if (price >= 1000) {
//     const formattedPrice = (price / 1000).toFixed(fractionDigits);
//     return `$${formattedPrice}K`;
//   } else {
//     const formattedPrice = price.toFixed(fractionDigits);
//     return `$${formattedPrice}`;
//   }
// }
export function formatPrice(price: number, fractionDigits: number = 1): string {
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

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}

export function getMimeType(filename: string): string {
  const mimeTypes: MimeType[] = [
    { extension: "default", template: "application/octet-stream" },
    { extension: "jpg", template: "image/jpeg" },
    { extension: "jpeg", template: "image/jpeg" },
    { extension: "png", template: "image/png" },
    { extension: "gif", template: "image/gif" },
    { extension: "bmp", template: "image/bmp" },
    { extension: "svg", template: "image/svg+xml" },
    { extension: "webp", template: "image/webp" },
    { extension: "pdf", template: "application/pdf" },
    { extension: "txt", template: "text/plain" },
    { extension: "html", template: "text/html" },
    { extension: "css", template: "text/css" },
    { extension: "js", template: "text/javascript" },
    { extension: "json", template: "application/json" },
    { extension: "xml", template: "application/xml" },
    { extension: "zip", template: "application/zip" },
    { extension: "doc", template: "application/msword" },
    {
      extension: "docx",
      template:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { extension: "xls", template: "application/vnd.ms-excel" },
    {
      extension: "xlsx",
      template:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    { extension: "ppt", template: "application/vnd.ms-powerpoint" },
    {
      extension: "pptx",
      template:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    },
    // Add more MIME types as neededtemplate
  ];

  const extension = filename.split(".").pop()!.toLowerCase();
  const mimeTypeObj = mimeTypes.find((type) => type.extension === extension);
  return mimeTypeObj
    ? mimeTypeObj.template
    : mimeTypes.find((type) => type.extension === "default")!.template;
}
