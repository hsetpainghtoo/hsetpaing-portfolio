import Image from "next/image";
import type { CSSProperties } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { HeroStage } from "@/components/hero-stage";
import { LocalTime } from "@/components/local-time";
import { Magnetic } from "@/components/magnetic";
import { Marquee } from "@/components/marquee";
import { Line } from "@/components/page-intro";
import { PillLink } from "@/components/pill-link";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import { ScrollWords } from "@/components/scroll-words";
import { StackCards } from "@/components/stack-cards";
import { projects, type Project } from "@/lib/projects";

/* The four builds that best show the range: hardware data, operations
   software, a product launch and a corporate site. The rest are on /projects. */
const featured = projects.slice(0, 4);

/* Only tools that appear in shipped work on the projects page, split so the
   second group reads as situational rather than claiming equal fluency. */
const toolkit = [
  {
    heading: "Every day",
    note: "The stack behind almost everything I build.",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
      "TanStack Query",
      "Redux Toolkit",
      "Zod",
      "Framer Motion",
    ],
  },
  {
    heading: "When the work goes further",
    note: "Reached for when a project needs a backend, a service, or data off a device.",
    items: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Python",
      "FastAPI",
      "InfluxDB",
      "Grafana",
    ],
  },
];

/* Figures derived from the real project list and start date, not invented. */
const STARTED = new Date("2024-05-01").getTime();
const years = ((Date.now() - STARTED) / (365.25 * 24 * 3600 * 1000)).toFixed(1);
const liveCount = projects.filter((p) => p.liveUrl !== "#").length;

const stats = [
  { value: String(projects.length), label: "Projects shipped" },
  { value: years, label: "Years writing frontend" },
  { value: String(liveCount), label: "Live in production" },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <HeroStage>
        <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-[minmax(0,1fr)_260px] lg:grid-cols-[minmax(0,1fr)_clamp(300px,27vw,420px)] lg:grid-rows-[1fr_auto] lg:gap-y-12">
          <div className="flex flex-col justify-center md:col-span-2 lg:col-span-1">
            <p
              className="rise-in mb-7 inline-flex w-fit items-center gap-2.5 rounded-full border border-foreground/10 py-1.5 pl-2.5 pr-3.5 text-[0.8125rem] text-muted-foreground"
              style={d(150)}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-signal opacity-60 [animation-duration:2.4s]" />
                <span className="relative inline-flex size-2 rounded-full bg-signal" />
              </span>
              Available for new projects
            </p>

            <h1 className="display text-[clamp(2.75rem,12.2vw,6rem)] lg:text-[clamp(4.5rem,7.6vw,8.5rem)]">
              <Line delay={250}>Interfaces</Line>
              <Line delay={340}>
                for the{" "}
                <span className="serif-accent accent-ink">
                  working
                </span>
              </Line>
              <Line delay={430}>world.</Line>
            </h1>
          </div>

          <div className="self-end lg:row-start-2">
            <p className="rise-in max-w-[30rem] text-lg text-muted-foreground" style={d(650)}>
              I&apos;m{" "}
              <span className="text-foreground">Hset Paing Htoo</span>, a
              frontend developer. I build corporate sites, management
              dashboards and industrial monitoring tools in React, Next.js and
              TypeScript.
            </p>
            <div
              className="rise-in mt-8 flex flex-col gap-3 min-[420px]:flex-row"
              style={d(780)}
            >
              <Magnetic className="flex">
                <PillLink href="/projects" className="w-full justify-between">
                  See the work
                </PillLink>
              </Magnetic>
              <PillLink href="/contact" variant="ghost" className="justify-center">
                Say hello
              </PillLink>
            </div>
          </div>

          {/* Portrait. The arch holds the figure; the head is allowed to
              break out of the top of it, which is where the depth comes from. */}
          <div
            className="rise-in ml-auto w-[68%] max-w-[300px] self-end md:w-full md:max-w-none lg:col-start-2 lg:row-span-2 lg:row-start-1"
            style={d(520)}
          >
            <Portrait />
          </div>
        </div>

        <dl
          className="fade-in mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-foreground/10 pt-5 text-sm md:grid-cols-4"
          style={d(1000)}
        >
          {[
            ["Role", "Frontend developer"],
            ["Currently", "Transtak Pte Ltd, Singapore"],
            ["Focus", "React, Next.js, TypeScript"],
          ].map(([term, value]) => (
            <div key={term}>
              <dt className="eyebrow mb-1.5">{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
          <div>
            <dt className="eyebrow mb-1.5">My time</dt>
            <dd>
              <LocalTime />
            </dd>
          </div>
        </dl>
      </HeroStage>

      {/* ---------------------------------------------------------- Ribbons */}
      <Marquee
        className="pt-16 md:pt-24"
        rows={[
          ["Corporate sites", "Management dashboards", "Industrial monitoring", "Operations software"],
          ["React", "Next.js", "TypeScript", "Tailwind CSS", "Grafana", "InfluxDB"],
        ]}
      />

      {/* -------------------------------------------------------- Statement */}
      <section className="mx-auto max-w-[1600px] px-5 py-24 sm:px-8 md:py-40 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-12">
          <p className="eyebrow lg:col-span-3 lg:pt-3">01 / Why interfaces</p>
          <div className="lg:col-span-9">
            <ScrollWords
              className="text-[clamp(1.625rem,3.5vw,3.25rem)] font-medium leading-[1.14] tracking-[-0.035em]"
              text="I came to frontend work in 2024 and have not slowed down since. What pulled me in was how much an interface decides whether people can actually use a product. So I build for responsiveness and accessibility from the start, rather than bolting them on later."
            />
            <Reveal className="mt-10">
              <PillLink href="/about" variant="ghost">
                More about me
              </PillLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Selected work */}
      <section className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">02 / Selected work</p>
            <h2 className="display text-[clamp(2.5rem,6.4vw,5.5rem)]">
              Things I have{" "}
              <span className="serif-accent accent-ink">built</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted-foreground">
            Four of {projects.length}. Monitoring off real hardware, operations
            software, a product launch and a corporate site.
          </p>
        </Reveal>

        <StackCards className="pb-4">
          {featured.map((project, i) => {
            const hasLive = project.liveUrl !== "#";
            return (
              <li
                key={project.title}
                data-stack-card
                className="sticky mb-6 last:mb-0 [@media(max-height:700px)]:static"
                style={{ top: `calc(5.75rem + ${i * 0.875}rem)` }}
              >
                <article className="accent-card grid origin-top bg-card gap-6 rounded-[1.75rem] border p-4 will-change-transform sm:p-5 md:rounded-[2.25rem] lg:grid-cols-12 lg:gap-10 lg:p-6">
                  <div className="flex flex-col p-2 sm:p-3 lg:col-span-5 lg:p-4">
                    <div className="flex items-center justify-between">
                      <span className="eyebrow tint-text">{project.kind}</span>
                      <span className="tint-text font-serif text-2xl italic">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 text-[clamp(1.75rem,3vw,2.75rem)] font-medium leading-[1.02] tracking-[-0.04em] lg:mt-10">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-md text-muted-foreground">
                      {project.tagline}
                    </p>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <li
                          key={tech}
                          className="tabular rounded-full border border-foreground/10 px-2.5 py-1 text-[0.6875rem] text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 lg:mt-auto lg:pt-10">
                      {hasLive ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group inline-flex items-center gap-2 text-sm font-medium"
                        >
                          <span className="link-draw">Visit live site</span>
                          <ArrowUpRight
                            className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <Lock className="size-3.5" aria-hidden="true" />
                          Internal tool, not public
                        </span>
                      )}
                    </div>
                  </div>

                  <ProjectShot project={project} live={hasLive} />
                </article>
              </li>
            );
          })}
        </StackCards>

        <Reveal className="mt-12 flex justify-center">
          <PillLink href="/projects">All {projects.length} projects</PillLink>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- Toolkit */}
      <section className="mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 md:pt-44 lg:px-12">
        <Reveal className="mb-12 md:mb-16">
          <p className="eyebrow mb-5">03 / Toolkit</p>
          <h2 className="display text-[clamp(2.5rem,6.4vw,5.5rem)]">
            What I{" "}
            <span className="serif-accent accent-ink">reach</span>{" "}
            for
          </h2>
        </Reveal>

        {toolkit.map((group) => (
          <Reveal
            key={group.heading}
            className="grid gap-6 border-t border-foreground/10 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14"
          >
            <div className="lg:col-span-3">
              <h3 className="font-medium tracking-[-0.02em]">{group.heading}</h3>
              <p className="mt-2 max-w-[16rem] text-sm text-muted-foreground">
                {group.note}
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-[0.45em] gap-y-1 text-[clamp(1.5rem,3.2vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.04em] lg:col-span-9">
              {group.items.map((item, i) => (
                <li key={item} className="flex gap-x-[0.45em]">
                  {item}
                  {i < group.items.length - 1 && (
                    <span className="font-normal text-signal/60" aria-hidden="true">
                      /
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <dl className="grid grid-cols-1 border-t border-foreground/10 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 110}
              className="flex flex-col-reverse border-b border-foreground/10 py-8 sm:border-b-0 sm:py-12 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8 lg:[&:not(:first-child)]:pl-12"
            >
              <dt className="eyebrow mt-3">{stat.label}</dt>
              <dd className="accent-ink w-fit pr-[0.08em] font-serif text-[clamp(4rem,9vw,8rem)] italic leading-[0.95] tracking-[-0.03em]">
                <CountUp value={stat.value} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>
    </>
  );
}

/* The screenshot is the link when there is somewhere public to go, and the
   cursor picks up a "Visit" label over it. Internal tools stay a plain image. */
function ProjectShot({ project, live }: { project: Project; live: boolean }) {
  const frame =
    "group/shot relative block aspect-[16/10] overflow-hidden rounded-[1.25rem] bg-surface md:rounded-[1.75rem] lg:col-span-7";
  const image = (
    <Image
      src={project.image}
      alt={`${project.title} interface`}
      fill
      sizes="(min-width: 1024px) 56vw, 92vw"
      quality={70}
      className="object-cover object-center transition-transform duration-700 ease-out group-hover/shot:scale-[1.035]"
    />
  );

  if (!live) return <div className={frame}>{image}</div>;

  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Visit ${project.title}`}
      data-cursor="Visit"
      className={frame}
    >
      {image}
    </a>
  );
}
