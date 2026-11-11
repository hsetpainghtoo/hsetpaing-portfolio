import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PillLink } from "@/components/pill-link";

const suggestions = [
  { href: "/projects", label: "Work", hint: "Everything I have shipped" },
  { href: "/about", label: "About", hint: "How I got here" },
  { href: "/contact", label: "Contact", hint: "Get in touch" },
];

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-[1600px] gap-12 px-5 pb-10 pt-36 sm:px-8 md:pt-44 lg:grid-cols-12 lg:px-12">
      <div className="lg:col-span-7">
        <p className="eyebrow mb-6">Error / Not found</p>
        <p
          aria-hidden="true"
          className="rise-in accent-ink w-fit pr-[0.06em] font-serif text-[clamp(8rem,26vw,20rem)] italic leading-[0.9] tracking-[-0.04em]"
        >
          404
        </p>
      </div>

      <div className="lg:col-span-5 lg:self-end">
        <h1 className="display text-[clamp(2rem,4vw,3.25rem)] leading-none">
          This page does not exist
        </h1>
        <p className="mt-5 max-w-md text-muted-foreground">
          The address may have changed, or the link that brought you here is
          out of date. Here is where everything else lives.
        </p>

        <ul className="mt-10 border-t border-foreground/10">
          {suggestions.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-4 border-b border-foreground/10 py-4 transition-colors hover:bg-foreground/[0.03] sm:px-2"
              >
                <span className="font-medium">{item.label}</span>
                <span className="flex items-center gap-3 text-sm text-muted-foreground">
                  {item.hint}
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <PillLink href="/" className="mt-10">
          Back to home
        </PillLink>
      </div>
    </div>
  );
}
