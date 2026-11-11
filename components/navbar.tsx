"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { site } from "@/lib/projects";

const links = [
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* While the menu is open the page behind it must not scroll, and the usual
     ways out (Escape, rotating or widening past the breakpoint) all close it. */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => wide.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);

    return () => {
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="z-nav fade-in pointer-events-none fixed inset-x-0 top-0 flex justify-center px-4 pt-4 md:pt-5">
        <nav
          aria-label="Main"
          className={cn(
            "pointer-events-auto flex w-full items-center justify-between gap-1 rounded-full border p-1.5 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 md:w-auto",
            scrolled || open
              ? "border-foreground/10 bg-background/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)]"
              : "border-foreground/10 bg-background/90"
          )}
        >
          <Link
            href="/"
            onClick={close}
            aria-label={`${site.name}, home`}
            className="group flex items-center gap-2.5 rounded-full pr-3"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-foreground font-serif text-[1.15rem] italic leading-none text-background transition-transform duration-300 ease-out group-hover:-rotate-12">
              hp
            </span>
            <span className="text-[0.9375rem] font-medium tracking-[-0.02em]">
              Hset Paing
            </span>
          </Link>

          <span className="mx-1 hidden h-5 w-px bg-foreground/10 md:block" aria-hidden="true" />

          <ul className="hidden items-center md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "press-feedback flex h-10 items-center rounded-full px-4 text-sm",
                      active
                        ? "bg-foreground/[0.08] text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <span className="mx-1 hidden h-5 w-px bg-foreground/10 md:block" aria-hidden="true" />

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/contact"
              className="press-feedback hidden h-10 items-center gap-1.5 rounded-full bg-foreground pl-4 pr-3.5 text-sm font-medium text-background md:flex"
            >
              Say hello
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="press-feedback relative flex size-10 items-center justify-center rounded-full bg-foreground text-background md:hidden"
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-px w-4 bg-current transition-transform duration-300 ease-out",
                  open ? "rotate-45" : "-translate-y-[3px]"
                )}
              />
              <span
                aria-hidden="true"
                className={cn(
                  "absolute h-px w-4 bg-current transition-transform duration-300 ease-out",
                  open ? "-rotate-45" : "translate-y-[3px]"
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu: a full sheet, not a dropdown. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={cn(
          "z-menu fixed inset-0 flex flex-col justify-between bg-background px-6 pb-10 pt-28 transition-[opacity,visibility] duration-300 md:hidden",
          open ? "visible opacity-100" : "invisible opacity-0"
        )}
      >
        <ul>
          {[{ name: "Home", href: "/" }, ...links].map((link, i) => (
            <li
              key={link.href}
              style={{ "--i": i } as CSSProperties}
              className={cn(
                "border-b border-foreground/10 transition-[opacity,transform] duration-500 ease-out",
                open
                  ? "translate-y-0 opacity-100 delay-[calc(var(--i)*55ms+80ms)]"
                  : "translate-y-4 opacity-0"
              )}
            >
              <Link
                href={link.href}
                onClick={close}
                aria-current={pathname === link.href ? "page" : undefined}
                className="flex items-baseline justify-between py-5"
              >
                <span className="display text-[2.75rem]">{link.name}</span>
                <span className="eyebrow">0{i + 1}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-5">
          <a href={`mailto:${site.email}`} className="text-lg tracking-[-0.02em]">
            {site.email}
          </a>
          <ul className="flex gap-5">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="eyebrow"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
