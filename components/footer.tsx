import Link from "next/link";
import { BackgroundVideo } from "@/components/background-video";
import { Magnetic } from "@/components/magnetic";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/projects";

const nav = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

/**
 * The closing sheet: pale paper on top, a blue-hour meadow underneath, and
 * the name as frosted glass sinking into the mist.
 *
 * It is paper in both themes, because the meadow fades up into paper. The
 * stacking, bottom to top:
 *
 *   meadow  ->  haze (paper fading out)  ->  wordmark  ->  fog  ->  content
 *
 * The footage is only requested once the footer is nearly on screen, so a
 * visitor who never scrolls this far never downloads it.
 */
export function Footer() {
  return (
    <footer className="theme-light relative isolate mt-24 overflow-hidden rounded-t-[2rem] bg-background text-foreground md:mt-36 md:rounded-t-[3rem]">
      {/* Meadow, held to the lower part of the sheet. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[clamp(24rem,62vw,56rem)]"
      >
        <BackgroundVideo
          video="/footer-meadow.mp4"
          videoHd="/footer-meadow-hd.mp4"
          poster="/footer-meadow-poster.webp"
          mediaClassName="object-[50%_100%]"
        />
        {/* Haze: the paper runs down over the sky and lets go at the hills. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_srgb,var(--background)_94%,transparent)_24%,color-mix(in_srgb,var(--background)_66%,transparent)_42%,transparent_68%)]" />

        {/* The name as glass. No text-stroke: the letters overlap slightly,
            and a stroke would draw lines through the overlaps. */}
        <p className="footer-wordmark absolute bottom-0 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[19.8vw] font-semibold leading-[1.16] tracking-[-0.055em]">
          Hset Paing
        </p>

        {/* Fog: the wordmark's feet disappear into it. */}
        <div className="absolute inset-x-0 bottom-0 h-[13%] bg-[linear-gradient(to_top,#e2e3f1_0%,rgb(226_227_241/0.55)_35%,rgb(226_227_241/0)_100%)]" />
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-[clamp(13rem,36vw,34rem)] pt-20 sm:px-8 md:pt-28 lg:px-12">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-2.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 [animation-duration:2.4s]" />
              <span className="relative inline-flex size-2 rounded-full bg-signal" />
            </span>
            Open to new work
          </p>
          <h2 className="display max-w-[14ch] text-[clamp(2.75rem,9vw,8rem)]">
            Got something that needs{" "}
            <span className="serif-accent accent-ink">building?</span>
          </h2>
        </Reveal>

        <Reveal
          delay={100}
          className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-16"
        >
          <Magnetic>
            <PillLink href="/contact">Start a conversation</PillLink>
          </Magnetic>
          <a
            href={`mailto:${site.email}`}
            className="link-draw w-fit text-lg tracking-[-0.02em] sm:ml-4"
          >
            {site.email}
          </a>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-foreground/10 pt-10 md:mt-28 md:grid-cols-12">
          <div className="col-span-2 md:col-span-6">
            <p className="max-w-xs text-sm text-muted-foreground">
              Frontend developer building corporate sites, management
              dashboards and industrial monitoring tools. I read every message.
            </p>
            <p className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
              <span>&copy; {new Date().getFullYear()} Hset Paing Htoo</span>
              <Link href="/privacy" className="link-draw">
                Privacy
              </Link>
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-4">Site</p>
            <ul className="space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-draw text-sm">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="eyebrow mb-4">Elsewhere</p>
            <ul className="space-y-2.5">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-draw text-sm"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
