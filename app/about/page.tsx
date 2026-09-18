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
  GraduationCap,
  Blocks,
  Milestone,
  PenTool,
} from "lucide-react";
import { entryContainer, entryItem, springGentle } from "@/lib/motion";

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

  const journey = [
    {
      year: "May 2024",
      title: "Started programming",
      org: "Self-taught, then company project",
      description:
        "HTML, CSS and JavaScript from scratch. Three months in I moved to React and built my company's first static site over the following month.",
      icon: GraduationCap,
    },
    {
      year: "Late 2024",
      title: "Frontend developer, React",
      org: "Company project",
      description:
        "Joined the Fuel Station Management System team. Fixed bugs, tightened up existing code and shipped new features in React through to mid-2025.",
      icon: Briefcase,
    },
    {
      year: "Mid 2025",
      title: "Next.js and the FMS rebuild",
      org: "Company project",
      description:
        "Moved onto the Next.js rewrite of FMS. Picked up TypeScript and TanStack Query, built the Cloud Reports module and CRUD flows, and made the local UI responsive.",
      icon: Blocks,
    },
    {
      year: "2025",
      title: "Myanmar Express Hub went live",
      org: "Freelance",
      description:
        "A multilingual shopping and shipping platform with an AI assistant wired through the Groq API and content managed in Sanity.",
      icon: Milestone,
    },
    {
      year: "Mar 2026",
      title: "Roots to Rooms frontend",
      org: "Company project",
      description:
        "Reworked the frontend to smooth out the user experience and bring in new interface designs.",
      icon: PenTool,
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
      <div className="relative z-10 bg-background px-6 py-20 text-foreground">
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
                  Most of my work is React, Next.js, TypeScript and Tailwind CSS.
                  I worked on the frontend of the Fuel Station Management System
                  through its move to Next.js, building the Cloud Reports module,
                  CRUD operations and the responsive layouts. I also delivered
                  Myanmar Express Hub, which included wiring up an AI assistant
                  for customer questions.
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
                className="absolute bottom-0 left-[1.4375rem] top-2 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent"
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
                    key={item.title}
                    variants={itemVariants}
                    className="relative flex gap-6"
                  >
                    <span className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-card shadow-tinted-sm">
                      <item.icon
                        className="h-5 w-5 text-primary"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>

                    <div className="pt-1">
                      <div className="mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="tabular text-xs font-semibold text-primary">
                          {item.year}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {item.org}
                        </span>
                      </div>
                      <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
                      <p className="measure text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
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
                      strokeWidth={1.75}
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
              <Link
                href="/contact"
                className="text-base font-medium text-primary underline-offset-4 transition-colors hover:underline"
              >
                Get in touch
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
}
