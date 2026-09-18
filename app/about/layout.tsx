import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Hset Paing Htoo went from first line of HTML to shipping production React and Next.js frontends.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
