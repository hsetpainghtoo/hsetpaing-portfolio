import Link from "next/link";
import { Github, Linkedin, MessageCircle, Mail } from "lucide-react";

const nav = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/hsetpainghtoo", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/hset-paing-htoo-91b997314/",
    label: "LinkedIn",
  },
  { icon: MessageCircle, href: "https://m.me/hset.htoo.35", label: "Messenger" },
  { icon: Mail, href: "mailto:hsetpainghtoo218@gmail.com", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <p className="mb-3 text-sm text-muted-foreground">Currently open to work</p>
            <p className="text-xl font-medium leading-snug tracking-tight text-foreground">
              Got something that needs building? I read every message.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
            >
              Get in touch
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            {nav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-6 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Hset Paing Htoo.{" "}
            <Link
              href="/privacy"
              className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Privacy
            </Link>
          </p>

          <ul className="flex items-center gap-1">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="press-feedback flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <social.icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
