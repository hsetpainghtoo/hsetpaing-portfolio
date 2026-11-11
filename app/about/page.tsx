import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { AboutHero } from "@/components/about-hero";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";

/* Grouped by tenure rather than one node per project. A timeline answers
   "where has this person been"; the projects are evidence inside that, and
   the Projects page already lists each one in full. */
const journey = [
  {
    period: "May 2024 to Late 2024",
    org: "Self-taught",
    role: "Learning to build",
    summary:
      "HTML, CSS and JavaScript from scratch, then React about three months in. No employer and no brief, just building until the pieces held together well enough to be useful to someone.",
    work: [],
  },
  {
    period: "Late 2024 to Mar 2026",
    org: "Digital Engineering Tech Ltd.",
    role: "Frontend developer",
    summary:
      "My first developer role, and the one that turned self-study into shipping. Most of it went into an internal management system that grew from a React app into a Next.js rewrite.",
    work: [
      {
        name: "Fuel Station Management System",
        note: "Bug fixes and new React features, then the Next.js rewrite. Picked up TypeScript and TanStack Query, built the Cloud Reports module and CRUD flows, and made the local UI responsive.",
      },
      {
        name: "DET corporate site",
        note: "The company's first static site, built in React with i18n.",
      },
      {
        name: "Roots to Rooms",
        note: "Reworked the frontend to smooth out the user experience and bring in new interface designs.",
      },
    ],
  },
  {
    period: "Apr 2026 to now",
    org: "Transtak Pte Ltd, Singapore",
    role: "Frontend developer",
    summary:
      "The company's own web presence, plus product work that reaches past the browser into hardware and operations.",
    work: [
      {
        name: "Terminal Monitoring System",
        note: "TIG stack monitoring for a fuel terminal, with certified volume and weight calculations and alerting over Telegram and email.",
      },
      {
        name: "Wholesale Management System",
        note: "WhatsApp order intake, an append-only stock ledger, and optimised multi-stop delivery routing.",
      },
      {
        name: "ShouXingCare",
        note: "Marketing site for the voice-first AI companion device built for elderly care.",
      },
      {
        name: "Transtak and Mahar Engineering sites",
        note: "Both corporate sites in Next.js and TypeScript, with the enquiry forms wired through Nodemailer.",
      },
      {
        name: "Myanmar Express Hub",
        note: "Multilingual shopping and shipping platform with an AI assistant wired through the Groq API and content managed in Sanity.",
      },
    ],
  },
];

/* Newest first. Each course links to its public Coursera verification. */
const study = [
  {
    status: "In progress",
    issuer: "University of the People",
    title: "Bachelor's degree in Computer Science",
    note: "Studying part time while working. Currently on Programming 2, Digital Electronics and Computer Architecture, and College Algebra.",
    courses: [],
  },
  {
    status: "In progress",
    issuer: "IBM on Coursera",
    title: "IBM Full Stack Software Developer Professional Certificate",
    note: "A 15-course track covering full stack development, containers and cloud. Six completed so far, each independently verifiable.",
    courses: [
      { name: "Developing Back-End Apps with Node.js and Express", code: "SJ22O1OWL2QP", date: "Apr 2026" },
      { name: "Developing Front-End Apps with React", code: "YLN0G1NZYK3O", date: "Apr 2026" },
      { name: "JavaScript Programming Essentials", code: "98C33D17K09G", date: "Mar 2026" },
      { name: "Getting Started with Git and GitHub", code: "HUNNVRNVOD6V", date: "Mar 2026" },
      { name: "Introduction to HTML, CSS, and JavaScript", code: "QIWPOM4QWQBS", date: "Mar 2026" },
      { name: "Introduction to Software Engineering", code: "AOFL2SZT18CW", date: "Feb 2026" },
    ],
  },
];

const whatIDo = [
  {
    title: "Frontend development",
    description:
      "Responsive, quick web applications in React, Next.js and TypeScript.",
  },
  {
    title: "Interface implementation",
    description:
      "Turning designs into accessible interfaces, with motion that has a reason to be there.",
  },
  {
    title: "Component architecture",
    description:
      "Reusable component systems and tokens that keep a growing app coherent.",
  },
  {
    title: "Performance work",
    description:
      "Faster loads, fewer re-renders, and interactions that hold up on mid-range devices.",
  },
];

const values = [
  {
    title: "Code that survives handover",
    description:
      "Readable naming, small components and no cleverness that needs a paragraph of explanation. The next person to open the file matters.",
  },
  {
    title: "Learn on the job, then keep the notes",
    description:
      "Every project here taught me something I could not do before it. TypeScript came from the fuel station rebuild; most of what I know about motion came from building this site.",
  },
  {
    title: "Design decisions, not defaults",
    description:
      "Spacing, contrast and motion are choices. I would rather ask why a section looks the way it does than accept whatever the template shipped with.",
  },
  {
    title: "Finish the unglamorous parts",
    description:
      "Loading states, empty states, keyboard focus, mobile breakpoints. The work is not done when the happy path renders.",
  },
];

/* Every section shares one frame: a label that stays pinned on wide screens
   while its content scrolls past. */
function Block({
  index,
  label,
  title,
  children,
}: {
  index: string;
  label: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-8 border-t border-foreground/10 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
      <div className="lg:col-span-4">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow mb-4">
            {index} / {label}
          </p>
          <h2 className="display text-[clamp(2rem,3.6vw,3.25rem)] leading-none">
            {title}
          </h2>
        </Reveal>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  );
}

const accent = "serif-accent text-muted-foreground";

export default function AboutPage() {
  return (
    <>
    <AboutHero />
    <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
      {/* Profile */}
      <section className="grid gap-10 py-14 lg:grid-cols-12 lg:py-24">
        <Reveal className="lg:col-span-4">
          <div className="relative aspect-[5/6] max-w-sm overflow-hidden rounded-[1.75rem] bg-surface md:rounded-[2.25rem]">
            <Image
              src="/hph_portrait.jpg"
              alt="Portrait of Hset Paing Htoo"
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 384px"
              quality={75}
              className="object-cover object-[50%_35%]"
            />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-8">
          <p className="text-[clamp(1.5rem,2.6vw,2.375rem)] font-medium leading-[1.16] tracking-[-0.035em]">
            Hello, I&apos;m Hset Paing Htoo. I came to frontend work in 2024
            and have not slowed down since.
          </p>
          <div className="mt-8 grid gap-6 text-muted-foreground md:grid-cols-2 md:gap-8">
            <p>
              What pulled me in was how much an interface decides whether
              people can actually use a product, and that turned into a habit
              of building for responsiveness and accessibility from the start
              rather than bolting them on later.
            </p>
            <p>
              I am a frontend developer at Transtak Pte Ltd in Singapore,
              working on the company&apos;s own sites alongside product builds
              like ShouXingCare, a terminal monitoring stack, and a wholesale
              management system. Before that, at Digital Engineering Tech
              Ltd., I worked on the Fuel Station Management System through its
              move to Next.js, building the Cloud Reports module, CRUD
              operations and the responsive layouts.
            </p>
            <p className="md:col-span-2 md:max-w-[62ch]">
              Outside of client work I spend time on industrial monitoring:
              Grafana dashboards, InfluxDB, and Modbus data coming off real
              hardware. It is a useful counterweight to building marketing
              sites, and I am always up for a problem I have not solved
              before.
            </p>
          </div>
        </Reveal>
      </section>

      <Block
        index="01"
        label="Journey"
        title={
          <>
            How I got <span className={accent}>here</span>
          </>
        }
      >
        <ol>
          {journey.map((item, i) => (
            <Reveal
              as="li"
              key={item.org}
              className={i > 0 ? "mt-12 border-t border-foreground/10 pt-12" : ""}
            >
              <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1">
                <span className="text-foreground">{item.period}</span>
                <span aria-hidden="true">/</span>
                <span>{item.role}</span>
              </p>
              <h3 className="mt-4 text-2xl font-medium md:text-3xl">{item.org}</h3>
              <p className="measure mt-3 text-muted-foreground">{item.summary}</p>

              {item.work.length > 0 && (
                <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  {item.work.map((w) => (
                    <li key={w.name} className="border-l border-foreground/15 pl-4">
                      <span className="block text-[0.9375rem] font-medium">
                        {w.name}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {w.note}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ol>
      </Block>

      <Block
        index="02"
        label="Study"
        title={
          <>
            Studying <span className={accent}>alongside</span> the work
          </>
        }
      >
        <ul>
          {study.map((track, i) => (
            <Reveal
              as="li"
              key={track.title}
              className={i > 0 ? "mt-12 border-t border-foreground/10 pt-12" : ""}
            >
              <p className="eyebrow flex flex-wrap gap-x-3 gap-y-1">
                <span className="text-foreground">{track.status}</span>
                <span aria-hidden="true">/</span>
                <span>{track.issuer}</span>
              </p>
              <h3 className="mt-4 text-2xl font-medium md:text-3xl">{track.title}</h3>
              <p className="measure mt-3 text-muted-foreground">{track.note}</p>

              {track.courses.length > 0 && (
                <ul className="mt-8 border-t border-foreground/10">
                  {track.courses.map((c) => (
                    <li key={c.code}>
                      <a
                        href={`https://coursera.org/verify/${c.code}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group flex items-center justify-between gap-4 border-b border-foreground/10 py-3.5 text-sm transition-colors hover:bg-foreground/[0.03] sm:px-2"
                      >
                        <span>{c.name}</span>
                        <span className="flex shrink-0 items-center gap-3 text-muted-foreground">
                          <span className="tabular text-xs">{c.date}</span>
                          <ArrowUpRight
                            className="size-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      </Block>

      <Block
        index="03"
        label="Practice"
        title={
          <>
            What I <span className={accent}>do</span>
          </>
        }
      >
        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {whatIDo.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 100}>
              <span className="font-serif text-3xl italic text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-3 text-xl font-medium">{item.title}</h3>
              <p className="mt-2 max-w-sm text-muted-foreground">
                {item.description}
              </p>
            </Reveal>
          ))}
        </ul>
      </Block>

      <Block
        index="04"
        label="Principles"
        title={
          <>
            How I <span className={accent}>work</span>
          </>
        }
      >
        <ol className="border-t border-foreground/10">
          {values.map((value) => (
            <Reveal
              as="li"
              key={value.title}
              className="grid gap-2 border-b border-foreground/10 py-7 md:grid-cols-5 md:gap-8"
            >
              <h3 className="text-xl font-medium md:col-span-2">{value.title}</h3>
              <p className="text-muted-foreground md:col-span-3">
                {value.description}
              </p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12">
          <PillLink href="/contact">Get in touch</PillLink>
        </Reveal>
      </Block>
    </div>
    </>
  );
}
