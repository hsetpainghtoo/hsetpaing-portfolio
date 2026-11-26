import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check, Sparkles } from "lucide-react";
import { BackgroundVideo } from "@/components/background-video";
import { Reveal } from "@/components/reveal";
import {
  carePlans,
  copy,
  packages,
  servicesConfig,
} from "@/lib/services";
import { projectId, projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const { contact } = servicesConfig;
const enabledPackages = packages.filter((p) => servicesConfig.packages[p.id]).length;
const enabledCare = carePlans.filter((p) => servicesConfig.carePlans[p.id]);

const shell = "mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12";
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** A chat link. The hrefs are placeholders until the owner fills them in. */
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
      /* App links (viber://) open the app; only web links get a new tab. */
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

/* The site's heading voice: grotesk display with the last word set in the
   ember serif italic. The wording itself is untouched. */
function Accent({ text }: { text: string }) {
  const i = text.lastIndexOf(" ");
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i + 1)}
      <span className="serif-accent accent-ink">{text.slice(i + 1)}</span>
    </>
  );
}

function SectionHead({ index, text }: { index: string; text: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="eyebrow mb-5">{index}</p>
      <h2 className="display text-[clamp(2.5rem,6vw,5rem)]">
        <Accent text={text} />
      </h2>
    </div>
  );
}

export function ServicesView() {
  return (
    <>
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
            <h1
              className="display rise-in mb-6 text-[clamp(2.75rem,7vw,6rem)]"
              style={d(150)}
            >
              <Accent text={copy.hero.title} />
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

      {/* The three card sections share one field of colour for the glass
          to refract; it fades out before "How it works". */}
      <div className="glass-field">
        {/* -------------------------------------------------------- Problems */}
        <section className={cn(shell, "py-24 md:py-32")}>
          <SectionHead index="01" text={copy.problems.label} />
          <ol className="grid gap-4 md:grid-cols-3">
            {copy.problems.items.map((item, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 90}
                className="liquid-glass flex min-h-[13rem] flex-col justify-between gap-8 rounded-[1.75rem] p-6 md:p-8"
              >
                <span className="accent-ink font-serif text-3xl italic leading-none">
                  0{i + 1}
                </span>
                <p className="text-lg font-medium leading-snug tracking-[-0.015em] md:text-xl">
                  {item}
                </p>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* -------------------------------------------------------- Packages */}
        <section className={cn(shell, "pb-24 md:pb-32")}>
          <SectionHead index="02" text={copy.packages.label} />
          <ul className="grid gap-4 lg:grid-cols-3">
            {packages.map((pkg, i) => {
              const enabled = servicesConfig.packages[pkg.id];
              const popular = enabled && pkg.id === "growth" && enabledPackages >= 2;
              const tier = pkg.id[0].toUpperCase() + pkg.id.slice(1);

              if (!enabled) {
                return (
                  <Reveal
                    as="li"
                    key={pkg.id}
                    delay={i * 90}
                    className="liquid-glass flex flex-col rounded-[2rem] p-7 md:p-9"
                  >
                    <div className="flex min-h-7 items-center justify-between gap-3">
                      <span className="eyebrow">{tier}</span>
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
                    <span className="eyebrow">{tier}</span>
                    {popular && (
                      <span className="rounded-full bg-signal px-3 py-1 text-xs font-medium text-background">
                        {copy.packages.popular}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] md:text-2xl">
                    {pkg.title}
                  </h3>
                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="text-[clamp(2.5rem,4vw,3.25rem)] font-medium leading-none tracking-[-0.04em]">
                      {pkg.price}
                    </span>
                    <span className="text-muted-foreground">{pkg.usd}</span>
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

          <p className="mt-6 text-muted-foreground">{copy.packages.terms}</p>

          {servicesConfig.showFoundingOffer && (
            <Reveal className="liquid-glass mt-6 flex gap-4 rounded-[1.5rem] p-5 [--glass-fill:color-mix(in_srgb,var(--signal)_10%,transparent)] md:p-6">
              <Sparkles className="mt-0.5 size-5 shrink-0 text-signal" aria-hidden="true" />
              <p className="font-medium">{copy.packages.founding}</p>
            </Reveal>
          )}
        </section>

        {/* ------------------------------------------------------- Care plans */}
        {enabledCare.length > 0 && (
          <section className={cn(shell, "pb-24 md:pb-32")}>
            <div className="grid gap-10 border-t border-foreground/10 pt-16 md:pt-20 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="eyebrow">03</span>
                <h2 className="display mt-5 text-[clamp(2.5rem,6vw,5rem)]">
                  <Accent text={copy.care.title} />
                </h2>
              </div>
              <ul className="grid gap-4 lg:col-span-7">
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
                    <p className="flex shrink-0 items-baseline gap-2">
                      <span className="text-3xl font-medium tracking-[-0.03em]">
                        {plan.price}
                        <span className="text-base text-muted-foreground">
                          {copy.care.perMonth}
                        </span>
                      </span>
                      <span className="text-sm text-muted-foreground">{plan.usd}</span>
                    </p>
                  </Reveal>
                ))}
              </ul>
            </div>
          </section>
        )}

      </div>

      {/* ----------------------------------------------------- How it works */}
      <section className={cn(shell, "pb-24 md:pb-32")}>
        <SectionHead index={enabledCare.length > 0 ? "04" : "03"} text={copy.steps.label} />
        <ol className="grid gap-8 md:grid-cols-3 md:gap-6">
          {copy.steps.items.map((step, i) => (
            <Reveal as="li" key={i} delay={i * 90} className="border-t border-foreground/15 pt-6">
              <span className="accent-ink font-serif text-5xl italic leading-none">{i + 1}</span>
              <p className="mt-5 text-lg font-medium tracking-[-0.015em] md:text-xl">{step}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ------------------------------------------------------------ Proof */}
      <section className={cn(shell, "pb-24 md:pb-32")}>
        <SectionHead index={enabledCare.length > 0 ? "05" : "04"} text={copy.proof.label} />
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
                  <p className="eyebrow mt-6">
                    {project.title}
                  </p>
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

      {/* ---------------------------------------------------------- Contact */}
      <section className={cn(shell, "pb-24 md:pb-32")}>
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
          <div className="relative">
            <h2 className="display text-[clamp(2.75rem,7vw,6rem)]">
              {copy.contact.label}
            </h2>
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
