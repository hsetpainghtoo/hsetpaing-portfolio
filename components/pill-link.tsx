import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillLinkProps {
  href: string;
  children: ReactNode;
  /** `solid` is the one primary action in a view; `ghost` is everything else. */
  variant?: "solid" | "ghost";
  className?: string;
}

/**
 * The site's call to action. The arrow sits in its own disc inside the pill
 * and swings from north-east to east on hover.
 */
export function PillLink({
  href,
  children,
  variant = "solid",
  className,
}: PillLinkProps) {
  const external = /^(https?:|mailto:)/.test(href);
  const classes = cn(
    "press-feedback group inline-flex h-12 items-center rounded-full text-[0.9375rem] font-medium tracking-[-0.01em]",
    variant === "solid"
      ? "gap-3 bg-foreground pl-6 pr-1.5 text-background"
      : "border border-foreground/15 px-6 hover:border-foreground/40 hover:bg-foreground/[0.04]",
    className
  );

  const content = (
    <>
      <span className="text-roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
      {variant === "solid" && (
        <span
          aria-hidden="true"
          className="flex size-9 items-center justify-center rounded-full bg-background text-foreground"
        >
          <ArrowUpRight className="size-4 transition-transform duration-300 ease-out group-hover:rotate-45" />
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
