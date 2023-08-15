import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your store",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <section>{children}</section>;
}
