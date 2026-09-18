import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const suggestions = [
  { href: "/projects", label: "Projects", hint: "Everything I have shipped" },
  { href: "/about", label: "About", hint: "How I got here" },
  { href: "/contact", label: "Contact", hint: "Get in touch" },
];

export default function NotFound() {
  return (
    <div className="relative z-10 flex min-h-[70dvh] items-center px-6 py-20">
      <div className="mx-auto w-full max-w-2xl">
        <h1 className="tabular mb-6 text-7xl font-semibold leading-none text-foreground/15 md:text-8xl">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
          This page does not exist
        </h2>
        <p className="measure mb-10 text-lg text-muted-foreground">
          The address may have changed, or the link that brought you here is out
          of date. Here is where everything else lives.
        </p>

        <ul className="mb-12 divide-y divide-border border-t border-border">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-primary"
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-sm text-muted-foreground">
                  {item.hint}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <ArrowLeft aria-hidden="true" />
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
