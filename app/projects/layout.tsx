import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Corporate sites, an internal fuel station management system and side builds, each listed with the stack behind it.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
