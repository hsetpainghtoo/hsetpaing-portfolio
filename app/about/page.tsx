"use client";

import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Palette,
  Layers,
  Gauge,
  Briefcase,
  Building2,
  BookOpen,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";
import { entryContainer, entryItem, springGentle } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { NestedArrow } from "@/components/nested-arrow";

export default function AboutPage() {
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

  /* Grouped by tenure rather than one node per project. A timeline answers
     "where has this person been"; the projects are evidence inside that, and
     the Projects page already lists each one in full. Adding a project is a
     bullet here, not another node, so the page stops growing with the work. */
  const journey = [
    {
      period: "May 2024 to Late 2024",
      org: "Self-taught",
      role: "Learning to build",
      summary:
        "HTML, CSS and JavaScript from scratch, then React about three months in. No employer and no brief, just building until the pieces held together well enough to be useful to someone.",
      icon: BookOpen,
    },
    {
      period: "Late 2024 to Mar 2026",
      org: "Digital Engineering Tech Ltd.",
      role: "Frontend developer",
      summary:
        "My first developer role, and the one that turned self-study into shipping. Most of it went into an internal management system that grew from a React app into a Next.js rewrite.",
      icon: Briefcase,
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
      icon: Building2,
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

  /* Newest first, so React and Node/Express lead. The foundational courses are
     honest to list but should not be the first thing read next to the work on
     the projects page. Each row links to its public Coursera verification. */
  const study = [
    {
      status: "In progress",
      issuer: "University of the People",
      title: "Bachelor's degree in Computer Science",
      note: "Studying part time while working. Currently on Programming 2, Digital Electronics and Computer Architecture, and College Algebra.",
      icon: GraduationCap,
    },
    {
      status: "In progress",
      issuer: "IBM on Coursera",
      title: "IBM Full Stack Software Developer Professional Certificate",
      note: "A 15-course track covering full stack development, containers and cloud. Six completed so far, each independently verifiable.",
      icon: BadgeCheck,
      courses: [
        {
          name: "Developing Back-End Apps with Node.js and Express",
          code: "SJ22O1OWL2QP",
          date: "Apr 2026",
        },
        {
          name: "Developing Front-End Apps with React",
          code: "YLN0G1NZYK3O",
          date: "Apr 2026",
        },
        {
          name: "JavaScript Programming Essentials",
          code: "98C33D17K09G",
          date: "Mar 2026",
        },
        {
          name: "Getting Started with Git and GitHub",
          code: "HUNNVRNVOD6V",
          date: "Mar 2026",
        },
        {
          name: "Introduction to HTML, CSS, and JavaScript",
          code: "QIWPOM4QWQBS",
          date: "Mar 2026",
        },
        {
          name: "Introduction to Software Engineering",
          code: "AOFL2SZT18CW",
          date: "Feb 2026",
        },
      ],
    },
  ];

  const whatIDo = [
    {
      title: "Frontend development",
      description:
        "Responsive, quick web applications in React, Next.js and TypeScript.",
      icon: Code2,
    },
    {
      title: "Interface implementation",
      description:
        "Turning designs into accessible interfaces, with motion that has a reason to be there.",
      icon: Palette,
    },
    {
      title: "Component architecture",
      description:
        "Reusable component systems and tokens that keep a growing app coherent.",
      icon: Layers,
    },
    {
      title: "Performance work",
      description:
        "Faster loads, fewer re-renders, and interactions that hold up on mid-range devices.",
      icon: Gauge,
    },
  ];

  const reduced = useReducedMotion();
  const containerVariants = entryContainer(reduced, 0.07);
  const itemVariants = entryItem(reduced, 20);

  return (
    <PageTransition>
      <div className="relative z-10 bg-background px-6 py-20 text-foreground md:py-32">
        <div className="mx-auto max-w-4xl">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springGentle}
            className="mb-16 max-w-2xl"
          >
            <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
              The person behind the code
            </h1>
            <p className="measure text-lg text-muted-foreground">
              Two and a half years in, still counting the things I want to get
              better at.
            </p>
          </motion.header>

          {/* Profile - offset portrait, asymmetric columns */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springGentle, delay: reduced ? 0 : 0.06 }}
            className="mb-24 grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-14"
          >
            <div className="lg:col-span-2">
              <div className="hover-lift relative mx-auto w-fit lg:mx-0">
                <Image
                  src="/hph_portrait.jpg"
                  alt="Portrait of Hset Paing Htoo"
                  width={300}
                  height={300}
                  className="rounded-2xl shadow-tinted-lg"
                />
                {/* Offset frame - depth without another drop shadow */}
                <div
                  className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border border-primary/30"
                  aria-hidden="true"
                />
              </div>
            </div>

            <motion.div
              className="lg:col-span-3"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: reduced ? 0 : 0.12 }}
            >
              <h2 className="mb-5 text-2xl font-semibold">
                Hello, I&apos;m Hset Paing Htoo.
              </h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  I came to frontend work in 2024 and have not slowed down
                  since. What pulled me in was how much an interface decides
                  whether people can actually use a product, and that turned into
                  a habit of building for responsiveness and accessibility from
                  the start rather than bolting them on later.
                </p>
                <p>
                  I am a frontend developer at Transtak Pte Ltd in Singapore,
                  working on the company&apos;s own sites alongside product builds
                  like ShouXingCare, a terminal monitoring stack, and a
                  wholesale management system. Before that, at Digital
                  Engineering Tech Ltd., I worked on the Fuel Station
                  Management System through its move to Next.js, building the
                  Cloud Reports module, CRUD operations and the responsive
                  layouts.
                </p>
                <p>
                  Outside of client work I spend time on industrial
                  monitoring: Grafana dashboards, InfluxDB, and Modbus data
                  coming off real hardware. It is a useful counterweight to
                  building marketing sites, and I am always up for a problem I
                  have not solved before.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* Journey */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={springGentle}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="mb-12 text-3xl font-semibold">How I got here</h2>

            <div className="relative">
              {/* Single-accent rail, fading out at the end */}
              <div
                /* Centred on the 48px marker: a 1px line needs its left edge at
                   23.5px, not 23px, or it sits half a pixel off the icons it
                   is meant to thread through. */
                className="absolute bottom-0 left-[23.5px] top-2 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent"
                aria-hidden="true"
              />

              <motion.ol
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-10"
              >
                {journey.map((item) => (
                  <motion.li
                    key={item.org}
                    variants={itemVariants}
                    className="relative flex gap-6"
                  >
                    <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-tinted-sm">
                      <item.icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </span>

                    <div className="pb-4 pt-1">
                      {/* When and what, separated by a hairline rather than a
                          gap: at this size two muted runs of text sitting side
                          by side read as one string. */}
                      <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span className="tabular text-xs font-semibold tracking-normal text-primary">
                          {item.period}
                        </span>
                        <span
                          className="h-3 w-px bg-border"
                          aria-hidden="true"
                        />
                        <span className="text-xs text-muted-foreground">
                          {item.role}
                        </span>
                      </div>
                      <h3 className="mb-2.5 text-lg font-semibold">
                        {item.org}
                      </h3>
                      <p className="measure mb-6 text-sm leading-relaxed text-muted-foreground">
                        {item.summary}
                      </p>

                      {/* The self-taught period has no shipped work to list,
                          so it carries its summary alone. */}
                      {item.work && item.work.length > 0 && (
                        <ul className="measure space-y-4 border-l border-border pl-5">
                          {item.work.map((w) => (
                            <li key={w.name}>
                              {/* Name and note were the same size, so the pair
                                  read flat. Hierarchy now comes from size,
                                  weight and leading together, which is what
                                  separates one entry from the next. */}
                              <span className="mb-0.5 block text-sm font-medium leading-snug text-foreground">
                                {w.name}
                              </span>
                              <span className="block text-[0.8125rem] leading-relaxed text-muted-foreground">
                                {w.note}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </motion.section>

          {/* Study running alongside the job. Framed as two tracks in progress
              rather than a pile of certificates: the completed courses are
              foundational and read as junior next to the shipped work, while
              the tracks themselves signal structured, ongoing study. */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={springGentle}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="mb-10 text-3xl font-semibold">
              Studying alongside the work
            </h2>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-10"
            >
              {study.map((track) => (
                <motion.li
                  key={track.title}
                  variants={itemVariants}
                  className="flex gap-6"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-tinted-sm">
                    <track.icon
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                  </span>

                  <div className="pt-1">
                    {/* Same header rhythm as the timeline above, so the two
                        sections read as one system rather than two. */}
                    <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                      <span className="text-xs font-semibold text-primary">
                        {track.status}
                      </span>
                      <span className="h-3 w-px bg-border" aria-hidden="true" />
                      <span className="text-xs text-muted-foreground">
                        {track.issuer}
                      </span>
                    </div>
                    <h3 className="mb-2.5 text-lg font-semibold">
                      {track.title}
                    </h3>
                    <p className="measure mb-6 text-sm leading-relaxed text-muted-foreground">
                      {track.note}
                    </p>

                    {track.courses && (
                      <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
                        {track.courses.map((c) => (
                          <li key={c.code}>
                            <a
                              href={`https://coursera.org/verify/${c.code}`}
                              target="_blank"
                              rel="noreferrer noopener"
                              /* A rule under every one of six rows is visual
                                 noise. The grid's own spacing separates them;
                                 the row earns a surface only on hover, which
                                 also makes it read as clickable. */
                              className="press-feedback group -mx-2 flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-sm hover:bg-accent"
                            >
                              <span className="text-muted-foreground group-hover:text-foreground">
                                {c.name}
                              </span>
                              <span className="tabular shrink-0 text-xs text-muted-foreground/70">
                                {c.date}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>

          {/* What I do */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={springGentle}
            viewport={{ once: true }}
            className="mb-24"
          >
            <h2 className="mb-10 text-3xl font-semibold">What I do</h2>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-x-10 gap-y-9 sm:grid-cols-2"
            >
              {whatIDo.map((item) => (
                <motion.li key={item.title} variants={itemVariants}>
                  <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent">
                    <item.icon
                      className="h-5 w-5 text-accent-foreground"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </motion.ul>
          </motion.section>

          {/* How I work - numbered list, no card chrome */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={springGentle}
            viewport={{ once: true }}
          >
            <h2 className="mb-10 text-3xl font-semibold">How I work</h2>

            <motion.ol
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="divide-y divide-border"
            >
              {values.map((value) => (
                <motion.li key={value.title} variants={itemVariants} className="py-7">
                  <h3 className="mb-2 text-lg font-semibold">{value.title}</h3>
                  <p className="measure text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </motion.li>
              ))}
            </motion.ol>

            <div className="mt-14">
              <Button asChild size="cta" className="group">
                <Link href="/contact">
                  Get in touch
                  <NestedArrow className="bg-primary-foreground/20" />
                </Link>
              </Button>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
}
