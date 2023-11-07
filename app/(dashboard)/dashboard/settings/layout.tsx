import { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Store Settings",
  description: `Effortlessly manage your store's configuration and settings on ${siteConfig.name} to enhance your online presence and customer experience.`,
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <section>{children}</section>;
}
