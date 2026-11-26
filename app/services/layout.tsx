import type { Metadata } from "next";

const title = "Websites for Myanmar businesses in Thailand";
const description =
  "I build websites for Myanmar businesses in Thailand, so customers can find you and message you easily.";

/* Social tags are set again here: the root ones describe the hiring site,
   and this link is the one shared with business owners. Setting them
   replaces the root objects whole, so the share card is named again. */
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/services" },
  openGraph: { title, description, url: "/services", images: "/opengraph-image" },
  twitter: { card: "summary_large_image", title, description, images: "/opengraph-image" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
