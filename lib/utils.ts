import { ProductImageUploadedFile } from "@/types";
import { clsx, type ClassValue } from "clsx";
import cuid from "cuid";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

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

export function groupArray(array: number[], groupSize: number): number[][] {
  const groups: number[][] = [];

  for (let i = 0; i < array.length; i += groupSize) {
    const group = array.slice(i, i + groupSize);
    groups.push(group);
  }

  return groups;
}

export function formatDate(date: Date | string) {
  return dayjs(date).format("MMMM D, YYYY");
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

/**
 * Generates a unique identifier based on the provided name.
 *
 * @param name The name to be used for generating the identifier.
 * @returns A unique identifier string.
 */
export function generatedId(name: string): string {
  let slug = slugify(name);
  const uniqueSlug = cuid.slug();
  const separator = "-";

  // max characters limit 255
  if (slug.length + uniqueSlug.length + separator.length > 255) {
    slug = slug.slice(0, 255 - uniqueSlug.length - separator.length);
  }
  const id = slug + separator + uniqueSlug;
  return id;
}

export function getProductThumbnailImage(
  images: ProductImageUploadedFile[]
): ProductImageUploadedFile | undefined {
  const thumbnailImage = images.find((image) => image.isThumbnail);
  return thumbnailImage || images[0];
}
