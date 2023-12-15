"use client";

import { HTMLAttributes, useState } from "react";
import { UploadedFile } from "@/types";
import { toast } from "sonner";

import { catchError, downloadProductFiles } from "@/lib/utils";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  files: UploadedFile[] | null;
  children: React.ReactNode;
}

export function ProductFilesDownloadButton({
  files,
  children,
  ...props
}: Props) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    toast.promise(
      async () => {
        setDownloading(true);
        await downloadProductFiles(files);
        setDownloading(false);
      },
      {
        loading: "Downloading...",
        success: () => {
          return "Downloaded successfully.";
        },
        error: (err: unknown) => {
          return catchError(err);
        },
      }
    );
  };

  return (
    <button
      disabled={!files || downloading}
      onClick={handleDownload}
      {...props}
    >
      {children}
    </button>
  );
}
