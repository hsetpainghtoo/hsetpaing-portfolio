import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Plus,
  ShoppingBasket,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import { BackgroundVideo } from "@/components/background-video";
import { Reveal } from "@/components/reveal";
import { carePlans, copy, packages, servicesConfig } from "@/lib/services";
import { projectId, projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const { contact, sampleSite } = servicesConfig;
const enabledPackages = packages.filter((p) => servicesConfig.packages[p.id]);
const enabledCare = carePlans.filter((p) => servicesConfig.carePlans[p.id]);
/* One package on: a single wide card. Two or more: the comparison grid. */
const featured = enabledPackages.length === 1 ? enabledPackages[0] : null;
const audienceIcons = [UtensilsCrossed, ShoppingBasket, Store, Briefcase];

const shell = "mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12";
const gap = "pb-24 md:pb-32";
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
const tierName = (id: string) => id[0].toUpperCase() + id.slice(1);
/* next/image only takes a /public path or a full URL; a {{PLACEHOLDER}}
   is neither, so the sample section renders without a picture until set. */
const isImage = (src: string) => src.startsWith("/") || src.startsWith("https://");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: copy.faq.items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

/** Text with *accent* (ember serif italic) and **bold** spans. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) => {
        if (part.startsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("*")) {
          return (
            <span key={i} className="serif-accent accent-ink">
              {part.slice(1, -1)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

/** A chat link. App links (viber://) open the app; web links get a new tab. */
function ChatLink({
  href,
  children,
  variant = "glass",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "glass";
  className?: string;
}) {
  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "press-feedback inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors sm:px-7 sm:text-base",
        variant === "solid"
          ? "bg-foreground text-background hover:bg-foreground/90"
          : "liquid-glass glass-clear glass-lens transition-transform duration-300 hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </a>
  );
}

const headingSize = "display text-[clamp(2.5rem,6vw,5rem)]";

function SectionHead({ index, text }: { index: string; text: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="eyebrow mb-5">{index}</p>
      <h2 className={headingSize}>
        <Rich text={text} />
      </h2>
    </div>
  );
}

/** Heading on the left, content on the right: for the shorter sections. */
function Split({ index, text, children }: { index: string; text: string; children: ReactNode }) {
  return (
    <div className="grid gap-10 border-t border-foreground/10 pt-16 md:pt-20 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p className="eyebrow mb-5">{index}</p>
        <h2 className={headingSize}>
          <Rich text={text} />
        </h2>
      </div>
      <div className="lg:col-span-7">{children}</div>
    </div>
  );
}

/** Hairline list rows, each led by a small mark. */
function Rows({ items, mark }: { items: readonly string[]; mark: "check" | "dot" }) {
  return (
    <ul className="border-t border-foreground/10">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item}
          delay={i * 60}
          className="flex gap-4 border-b border-foreground/10 py-5 text-lg leading-snug"
        >
          {mark === "check" ? (
            <Check className="mt-1 size-4 shrink-0 text-signal" aria-hidden="true" />
          ) : (
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
          )}
          <span>{item}</span>
        </Reveal>
      ))}
    </ul>
  );
}

export function ServicesView() {
  /* Eyebrow numbers follow render order, so hidden sections leave no gaps. */
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* ------------------------------------------------------------ Hero */}
      <section className="theme-dark relative flex h-svh min-h-[620px] flex-col justify-end overflow-hidden rounded-b-[2rem] bg-background text-foreground md:rounded-b-[3rem]">
        <BackgroundVideo
          video="/services-orb.mp4"
          videoHd="/services-orb-hd.mp4"
          poster="/services-orb-poster.webp"
          priority
          seamFade
          mediaClassName="object-[50%_35%]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-background/70 to-transparent md:block" />
        </div>

        <div className={cn(shell, "relative z-10 w-full pb-10 sm:pb-16")}>
          <div className="max-w-2xl">
            <h1 className="display rise-in mb-6 text-[clamp(2.75rem,7vw,6rem)]" style={d(150)}>
              <Rich text={copy.hero.title} />
            </h1>
            <p
              className="rise-in mb-7 max-w-md text-sm leading-relaxed text-foreground/65 sm:text-base"
              style={d(300)}
            >
              {copy.hero.sub}
            </p>
            <div className="rise-in flex flex-wrap items-center gap-3" style={d(450)}>
              <ChatLink href={contact.messenger} variant="solid">
                {copy.hero.messenger}
              </ChatLink>
              <ChatLink href={contact.viber}>{copy.hero.viber}</ChatLink>
            </div>
          </div>
        </div>
      </section>

      {/* The card-heavy sections sit on a field of colour for the glass. */}
      <div className="glass-field">
        {/* -------------------------------------------------------- Problems */}
        <section className={cn(shell, "py-24 md:py-32")}>
          <SectionHead index={num()} text={copy.problems.label} />
          <ol className="grid gap-4 md:grid-cols-3">
            {copy.problems.items.map((item, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 90}
                className="liquid-glass flex min-h-[13rem] flex-col justify-between gap-8 rounded-[1.75rem] p-6 md:p-8"
              >
                <span className="accent-ink font-serif text-3xl italic leading-none">0{i + 1}</span>
                <p className="text-lg font-medium leading-snug tracking-[-0.015em] md:text-xl">{item}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ---------------------------------------------------- Who it's for */}
        <section className={cn(shell, gap)}>
          <SectionHead index={num()} text={copy.audience.label} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.audience.items.map((item, i) => {
              const Icon = audienceIcons[i % audienceIcons.length];
              return (
                <Reveal
                  as="li"
                  key={item.title}
                  delay={i * 90}
                  className="liquid-glass flex flex-col gap-10 rounded-[1.75rem] p-6 md:p-7"
                >
                  <Icon className="size-6 text-signal" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.015em] md:text-xl">{item.title}</h3>
                    <p className="mt-3 text-muted-foreground">{item.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* -------------------------------------------------------- Packages */}
        <section className={cn(shell, gap)}>
          <SectionHead index={num()} text={copy.packages.label} />

          {featured ? (
            <>
              <Reveal className="liquid-glass grid gap-10 rounded-[2rem] p-7 md:p-10 lg:grid-cols-12 lg:gap-12">
                <div className="flex flex-col lg:col-span-5">
                  <span className="eyebrow">{tierName(featured.id)}</span>
                  <h3 className="mt-6 text-2xl font-medium tracking-[-0.025em] md:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-8 text-[clamp(3rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.045em]">
                    {featured.price}
                  </p>
                  <p className="mt-3 text-muted-foreground">{copy.packages.oneTime}</p>
                  <ChatLink
                    href={contact.messenger}
                    variant="solid"
                    className="mt-10 w-full sm:w-fit lg:mt-auto"
                  >
                    {copy.packages.start}
                  </ChatLink>
                </div>
                <ul className="grid gap-x-10 gap-y-8 border-t border-foreground/10 pt-8 sm:grid-cols-2 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                  {copy.packages.included.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <Check className="mt-1 size-4 shrink-0 text-signal" aria-hidden="true" />
                      <div>
                        <h4 className="font-medium tracking-[-0.01em]">{item.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <p className="mt-5 text-muted-foreground">
                {copy.packages.onTheWay.text}{" "}
                <a
                  href={contact.messenger}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw font-medium text-foreground"
                >
                  {copy.packages.onTheWay.link}
                </a>
              </p>
            </>
          ) : (
            <ul className="grid gap-4 lg:grid-cols-3">
              {packages.map((pkg, i) => {
                const enabled = servicesConfig.packages[pkg.id];
                const popular = enabled && pkg.id === "growth";

                if (!enabled) {
                  return (
                    <Reveal
                      as="li"
                      key={pkg.id}
                      delay={i * 90}
                      className="liquid-glass flex flex-col rounded-[2rem] p-7 md:p-9"
                    >
                      <div className="flex min-h-7 items-center justify-between gap-3">
                        <span className="eyebrow">{tierName(pkg.id)}</span>
                        <span className="rounded-full bg-foreground/[0.07] px-3 py-1 text-xs text-muted-foreground">
                          {copy.packages.soon}
                        </span>
                      </div>
                      <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] text-foreground/70 md:text-2xl">
                        {pkg.title}
                      </h3>
                      <p className="mt-3 text-muted-foreground">{pkg.soon}</p>
                      <a
                        href={contact.messenger}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium"
                      >
                        <span className="link-draw">{copy.packages.interested}</span>
                        <ArrowRight
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    </Reveal>
                  );
                }

                return (
                  <Reveal
                    as="li"
                    key={pkg.id}
                    delay={i * 90}
                    className={cn(
                      "liquid-glass flex flex-col rounded-[2rem] p-7 md:p-9",
                      popular && "ring-1 ring-signal/50"
                    )}
                  >
                    <div className="flex min-h-7 items-center justify-between gap-3">
                      <span className="eyebrow">{tierName(pkg.id)}</span>
                      {popular && (
                        <span className="rounded-full bg-signal px-3 py-1 text-xs font-medium text-background">
                          {copy.packages.popular}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] md:text-2xl">{pkg.title}</h3>
                    <p className="mt-6 text-[clamp(2.5rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.04em]">
                      {pkg.price}
                    </p>
                    <ul className="mt-8 grid gap-3 border-t border-foreground/10 pt-6">
                      {pkg.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <Check className="mt-1 size-4 shrink-0 text-signal" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ChatLink href={contact.messenger} variant="solid" className="mt-10 w-full">
                      {copy.hero.messenger}
                    </ChatLink>
                  </Reveal>
                );
              })}
            </ul>
          )}

          {servicesConfig.showFoundingOffer && (
            <Reveal className="liquid-glass mt-8 flex gap-4 rounded-[1.5rem] p-5 [--glass-fill:color-mix(in_srgb,var(--signal)_10%,transparent)] md:p-6">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden="true" />
              <p className="font-medium">
                <Rich text={copy.packages.founding} />
              </p>
            </Reveal>
          )}
          <p className="mt-5 text-muted-foreground">{copy.packages.terms}</p>
        </section>
      </div>

      {/* ---------------------------------------------------------- Sample */}
      {servicesConfig.showSampleSite && (
        <section className={cn(shell, gap)}>
          <SectionHead index={num()} text={copy.sample.label} />
          <div className="grid items-center gap-10 lg:grid-cols-12">
            {isImage(sampleSite.image) && (
              <a
                href={sampleSite.url}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="Visit"
                className="group relative block aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-surface md:rounded-[2rem] lg:col-span-7"
              >
                <Image
                  src={sampleSite.image}
                  alt="Sample restaurant website"
                  fill
                  sizes="(min-width: 1024px) 56vw, 92vw"
                  quality={70}
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
              </a>
            )}
            <div className={cn(isImage(sampleSite.image) ? "lg:col-span-5" : "lg:col-span-8")}>
              <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{copy.sample.text}</p>
              <ChatLink href={sampleSite.url} className="mt-8">
                {copy.sample.button}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ChatLink>
            </div>
          </div>
        </section>
      )}

      {/* -------------------------------------------------------- Timeline */}
      <section className={cn(shell, gap)}>
        <SectionHead index={num()} text={copy.timeline.label} />
        <p className="-mt-4 mb-12 max-w-2xl text-lg text-muted-foreground md:-mt-6 md:text-xl">
          {copy.timeline.summary}
        </p>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {copy.timeline.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90} className="flex flex-col border-t border-foreground/15 pt-6">
              <span className="accent-ink font-serif text-5xl italic leading-none">{i + 1}</span>
              <p className="mt-5 text-lg font-medium leading-snug tracking-[-0.015em]">{step.title}</p>
              <span className="mt-4 w-fit rounded-full bg-foreground/[0.07] px-3 py-1 text-xs text-muted-foreground">
                {step.duration}
              </span>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------ What I need, costs */}
      <section className={cn(shell, gap)}>
        <Split index={num()} text={copy.needs.label}>
          <Rows items={copy.needs.items} mark="check" />
        </Split>
      </section>

      <section className={cn(shell, gap)}>
        <Split index={num()} text={copy.costs.label}>
          <Rows items={copy.costs.items} mark="dot" />
        </Split>
      </section>

      <div className="glass-field">
        {/* ------------------------------------------------------- Care plans */}
        {enabledCare.length > 0 && (
          <section className={cn(shell, gap)}>
            <Split index={num()} text={copy.care.title}>
              <ul className="grid gap-4">
                {enabledCare.map((plan) => (
                  <Reveal
                    as="li"
                    key={plan.id}
                    className="liquid-glass flex flex-col gap-6 rounded-[1.75rem] p-6 sm:flex-row sm:items-center sm:justify-between md:p-8"
                  >
                    <div>
                      <span className="eyebrow">{plan.name}</span>
                      <p className="mt-3 max-w-sm">{plan.items}</p>
                    </div>
                    <p className="shrink-0 text-3xl font-medium tracking-[-0.03em]">
                      {plan.price}
                      <span className="text-base text-muted-foreground">{copy.care.perMonth}</span>
                    </p>
                  </Reveal>
                ))}
              </ul>
            </Split>
          </section>
        )}

        {/* ---------------------------------------------------------- Why me */}
        <section className={cn(shell, gap)}>
          <SectionHead index={num()} text={copy.whyMe.label} />
          <ul className="grid gap-4 md:grid-cols-3">
            {copy.whyMe.items.map((item, i) => {
              const body = (
                <>
                  <h3 className="text-lg font-medium tracking-[-0.015em] md:text-xl">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.text}</p>
                  {"href" in item && (
                    <ArrowRight
                      className="mt-6 size-4 text-signal transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  )}
                </>
              );
              return (
                <Reveal as="li" key={item.title} delay={i * 90} className="liquid-glass rounded-[1.75rem]">
                  {"href" in item ? (
                    <a href={item.href} className="group block h-full p-6 md:p-8">
                      {body}
                    </a>
                  ) : (
                    <div className="p-6 md:p-8">{body}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </section>
      </div>

      {/* ------------------------------------------------------------ Proof */}
      <section id="proof" className={cn(shell, gap, "scroll-mt-28")}>
        <SectionHead index={num()} text={copy.proof.label} />
        <ul className="grid gap-8 md:grid-cols-2 md:gap-6">
          {copy.proof.items.map((item, i) => {
            const project = projects.find((p) => p.title === item.project);
            if (!project) return null;
            return (
              <Reveal as="li" key={item.project} delay={i * 90}>
                <Link href={`/projects#${projectId(project.title)}`} className="group block">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-surface md:rounded-[2rem]">
                    <Image
                      src={project.image}
                      alt={`${project.title} interface`}
                      fill
                      sizes="(min-width: 768px) 46vw, 92vw"
                      quality={70}
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                  </div>
                  <p className="eyebrow mt-6">{project.title}</p>
                  <p className="mt-3 max-w-xl text-lg font-medium leading-snug tracking-[-0.015em] md:text-xl">
                    {item.result}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                    {copy.proof.see}
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </section>

      {/* -------------------------------------------------------------- FAQ */}
      <section className={cn(shell, gap)}>
        <Split index={num()} text={copy.faq.label}>
          <div className="border-t border-foreground/10">
            {copy.faq.items.map((item) => (
              <details key={item.q} className="group border-b border-foreground/10">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium leading-snug tracking-[-0.015em] [&::-webkit-details-marker]:hidden md:text-xl">
                  {item.q}
                  <Plus
                    className="size-5 shrink-0 text-signal transition-transform duration-300 group-open:rotate-45"
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-2xl pb-6 text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </Split>
      </section>

      {/* -------------------------------------------------------- Final CTA */}
      <section className={cn(shell, gap, "text-center")}>
        <Reveal className="mx-auto max-w-3xl">
          <h2 className={headingSize}>
            <Rich text={copy.finalCta.label} />
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">{copy.finalCta.text}</p>
          <ChatLink href={contact.messenger} variant="solid" className="mt-10">
            {copy.finalCta.button}
          </ChatLink>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- Contact */}
      <section className={cn(shell, gap)}>
        <div className="theme-dark relative overflow-hidden rounded-[2rem] bg-background px-6 py-16 text-foreground md:rounded-[3rem] md:px-14 md:py-24">
          <Image
            src="/services-orb-poster.webp"
            alt=""
            fill
            sizes="100vw"
            quality={70}
            className="object-cover object-[50%_35%] opacity-60"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="relative max-w-xl">
            <h2 className="display text-[clamp(2.75rem,7vw,6rem)]">{copy.contact.label}</h2>
            <p className="mt-6 text-lg text-foreground/70">{copy.contact.text}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ChatLink href={contact.messenger} variant="solid">
                {copy.contact.messenger}
              </ChatLink>
              <ChatLink href={contact.viber}>{copy.contact.viber}</ChatLink>
              <ChatLink href={contact.line}>{copy.contact.line}</ChatLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
