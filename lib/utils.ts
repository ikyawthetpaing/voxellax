import * as crypto from "crypto";
import { ProductImageUploadedFile, UploadedFile } from "@/types";
import { clsx, type ClassValue } from "clsx";
import cuid from "cuid";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

import { env } from "@/env.mjs";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function absoluteUrl(path?: string) {
  const appUrl = env.NEXT_PUBLIC_APP_URL;
  if (!path) {
    return appUrl;
  }
  const formattedPath = path.replace(/^\//, "");
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

export function getUniqueId() {
  return cuid();
}

export function getUniqueString() {
  return cuid.slug();
}

export function generatedId(name: string): string {
  let slug = slugify(name);
  const uniqueSlug = getUniqueString();
  const separator = "-";

  // max characters limit 255
  if (slug.length + uniqueSlug.length + separator.length > 255) {
    slug = slug.slice(0, 255 - uniqueSlug.length - separator.length);
  }
  const id = slug + separator + uniqueSlug;
  return id;
}

export function getProductThumbnailImage(
  images: ProductImageUploadedFile[] | null
) {
  if (!images) {
    return null;
  }
  return images.find((image) => image.isThumbnail) || null;
}

export function catchError(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return toast(errors.join("\n"));
  } else if (err instanceof Error) {
    return toast(err.message);
  } else {
    return toast("Something went wrong, please try again later.");
  }
}

export function getFormatedProductFilesTotalSize(files: UploadedFile[]) {
  const totalSizeBytes = files.reduce((total, file) => total + file.size, 0);
  return formatBytes(totalSizeBytes);
}

export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

export function hashPassword(password: string, salt: string): string {
  const hash = crypto.createHash("sha256");
  const hashedPassword = hash.update(password + salt).digest("hex");
  return hashedPassword;
}

export function comparePasswords(
  enteredPassword: string,
  storedHashedPassword: string,
  salt: string
): boolean {
  const hashedEnteredPassword = hashPassword(enteredPassword, salt);
  return hashedEnteredPassword === storedHashedPassword;
}

export async function downloadProductFiles(
  files: UploadedFile[] | null | undefined
) {
  const saveFile = (url: string, name: string) => {
    return new Promise<void>((resolve, reject) => {
      fetch(url)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, name);
          resolve();
        })
        .catch((error) => {
          console.error("Error downloading file:", error);
          reject(error);
        });
    });
  };
  if (files && files.length > 0) {
    const downloadPromises = files.map((file) => saveFile(file.url, file.name));

    await Promise.all(downloadPromises);
  }
}
