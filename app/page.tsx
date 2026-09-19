"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Linkedin, MessageCircle } from "lucide-react";
import { NestedArrow } from "@/components/nested-arrow";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import { ProjectModal, type Project } from "@/components/ProjectModal";
import { projects } from "@/lib/projects";
import { entryContainer, entryItem, springGentle } from "@/lib/motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * Split so the second group reads as situational rather than claiming equal
 * fluency across everything. Only tools that appear in shipped work on the
 * projects page are listed, so the evidence is always one click away.
 *
 * `adaptive` flips a near-black brand mark to white on the dark theme, which
 * is the variant those brands publish for dark backgrounds anyway.
 *
 * Only ever set it on a transparent, single-colour SVG. brightness(0) blackens
 * every opaque pixel and invert(1) then whitens them, so on an image with a
 * filled background the whole rectangle turns into a white block rather than
 * the glyph. That is exactly what happened to the old github.png, which was
 * 99% opaque.
 */
const toolkit = [
  {
    heading: "Every day",
    note: "The stack behind almost everything I build.",
    items: [
      { name: "TypeScript", icon: "/typescript.png" },
      { name: "React.js", icon: "/reactjs.png" },
      { name: "Next.js", icon: "/nextjs.svg" },
      { name: "Tailwind CSS", icon: "/tailwindcss.svg" },
      { name: "JavaScript", icon: "/js.png" },
      { name: "HTML", icon: "/html-5.png" },
      { name: "CSS", icon: "/css-3.png" },
      { name: "Git", icon: "/tech-git.svg" },
      { name: "TanStack Query", icon: "/tech-tanstack-query.svg" },
      { name: "Redux Toolkit", icon: "/redux-toolkit.svg" },
      { name: "Zod", icon: "/tech-zod.svg" },
      { name: "Framer Motion", icon: "/tech-framer-motion.svg" },
    ],
  },
  {
    heading: "When the work goes further",
    note: "Reached for when a project needs a backend, a service, or data off a device.",
    items: [
      { name: "Node.js", icon: "/tech-nodejs.svg" },
      { name: "Express", icon: "/tech-express.svg", adaptive: true },
      { name: "PostgreSQL", icon: "/tech-postgresql.svg" },
      { name: "Prisma", icon: "/tech-prisma.svg", adaptive: true },
      { name: "Docker", icon: "/tech-docker.svg" },
      { name: "Python", icon: "/tech-python.svg" },
      { name: "FastAPI", icon: "/tech-fastapi.svg" },
      { name: "InfluxDB", icon: "/influxdb-logo.png" },
      { name: "Grafana", icon: "/grafana-logo.png" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/hsetpainghtoo", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/hset-paing-htoo-91b997314/",
    label: "LinkedIn",
  },
  { icon: MessageCircle, href: "https://m.me/hset.htoo.35", label: "Messenger" },
];

/* Figures derived from the real project list rather than invented. */
const liveCount = projects.filter((p) => p.liveUrl !== "#").length;

const stats = [
  { value: String(projects.length), label: "Projects shipped" },
  { value: "2.4", label: "Years writing frontend" },
  { value: String(liveCount), label: "Live in production" },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  /* The panel emerges from whichever card was tapped, so keep its bounds. */
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const reduced = useReducedMotion();

  const openProject = useCallback(
    (proj: Project, event: React.MouseEvent<HTMLElement>) => {
      setOriginRect(event.currentTarget.getBoundingClientRect());
      setSelectedProject(proj);
    },
    []
  );

  const listVariants = entryContainer(reduced);
  const skillCardVariants = entryItem(reduced, 24);

  return (
    <PageTransition>
      <div className="relative z-10 overflow-x-hidden bg-background text-foreground">
        {/* Hero */}
        <section className="relative flex min-h-[95dvh] flex-col items-center justify-center overflow-hidden pt-10">
          {/* DESKTOP LAYOUT */}
          <div className="pointer-events-none relative z-10 mx-auto hidden min-h-[90dvh] w-full max-w-7xl items-center justify-center px-4 lg:flex">
            <div className="pointer-events-none relative flex flex-col">
              {/* Above the wordmark */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: reduced ? 0 : 0.08 }}
                className="pointer-events-auto absolute bottom-full left-0 mb-4 w-full max-w-2xl md:mb-8"
              >
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 shadow-tinted-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">
                    Available for new projects
                  </span>
                </div>
                <p className="max-w-[340px] text-left text-base font-medium leading-snug text-foreground xl:max-w-[460px] xl:text-lg">
                  <span className="mb-1 block text-xl font-semibold tracking-tight text-primary md:text-2xl">
                    Frontend developer
                  </span>
                  <span className="text-muted-foreground">
                    I build the interfaces for corporate sites, management
                    dashboards and industrial monitoring tools.
                  </span>
                </p>
              </motion.div>

              {/* Wordmark */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...springGentle, delay: reduced ? 0 : 0.04 }}
                className="select-none whitespace-nowrap font-display text-[15vw] uppercase leading-none tracking-[0.02em] text-foreground/[0.07] lg:text-[18vw] dark:text-foreground/[0.09]"
              >
                Hset Paing
              </motion.h1>

              {/* Below, left */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...springGentle, delay: reduced ? 0 : 0.16 }}
                className="pointer-events-auto absolute top-full left-0 mt-4 md:mt-8"
              >
                <div className="flex items-center gap-3">
                  <Button asChild size="cta" className="group">
                    <Link href="/projects">
                      View my work
                      <NestedArrow className="bg-primary-foreground/20" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="cta" className="px-8">
                    <Link href="/contact">Get in touch</Link>
                  </Button>
                </div>
              </motion.div>

            </div>
          </div>

          {/* DESKTOP portrait */}
          <div className="pointer-events-none absolute inset-0 z-30 hidden translate-x-4 items-center justify-center lg:flex lg:translate-x-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={springGentle}
              className="pointer-events-auto relative h-[550px] w-[450px] lg:h-[600px] lg:w-[500px]"
            >
              <Image
                src="/profile_me_transparent.png"
                alt="Hset Paing Htoo"
                fill
                className="object-contain drop-shadow-2xl [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                priority
                quality={100}
              />
              {/* Single-accent ambient light, off-centre so it doesn't read as a ring */}
              <div
                className="pointer-events-none absolute left-1/2 top-[45%] -z-10 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[110px]"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="pointer-events-none relative z-10 flex min-h-[90dvh] w-full flex-col items-center px-4 pt-3 lg:hidden">
            <div className="relative mb-4 flex w-full items-start justify-center">
              <div
                className="pointer-events-none absolute left-1/2 top-[46%] h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[90px]"
                aria-hidden="true"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={springGentle}
                className="pointer-events-auto relative z-20 h-[312px] w-[250px]"
              >
                <Image
                  src="/profile_me_transparent.png"
                  alt="Hset Paing Htoo"
                  fill
                  className="object-contain drop-shadow-2xl [-webkit-mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)]"
                  priority
                  quality={100}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: reduced ? 0 : 0.08 }}
              className="pointer-events-auto z-30 flex w-full flex-col items-center pb-10 text-center"
            >
              {/* Visible H1 for mobile - the wordmark above is decorative */}
              <h1 className="sr-only">
                Hset Paing Htoo, frontend developer
              </h1>

              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 shadow-tinted-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  Available for new projects
                </span>
              </div>

              <p className="mb-7 px-2 text-lg leading-snug">
                <span className="mb-1.5 block text-2xl font-semibold tracking-tight text-primary">
                  Frontend developer
                </span>
                <span className="text-muted-foreground">
                  I build the interfaces for corporate sites, management
                  dashboards and industrial monitoring tools.
                </span>
              </p>

              <div className="mb-7 flex w-full max-w-[320px] flex-col gap-3">
                <Button asChild size="cta" className="group w-full">
                  <Link href="/projects">
                    View my work
                    <NestedArrow className="bg-primary-foreground/20" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="cta" className="w-full px-8">
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1">
                <span className="mr-2 text-sm text-muted-foreground">
                  Find me on
                </span>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg press-feedback text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    <social.icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Selected work */}
        <section className="overflow-hidden bg-surface px-6 pt-20 pb-24 max-md:mt-10 md:pt-32 md:pb-36">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={springGentle}
              viewport={{ once: true }}
              className="mb-14 max-w-xl"
            >
              <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                Things I have built
              </h2>
              <p className="measure text-lg text-muted-foreground">
                Corporate sites, internal tools and a couple of side builds.
                Open one to see the stack behind it.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: reduced ? 0 : 0.06 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView="auto"
                loop={projects.length > 2}
                coverflowEffect={{
                  rotate: 16,
                  stretch: 0,
                  depth: 220,
                  modifier: 1,
                  slideShadows: false,
                }}
                pagination={{ clickable: true }}
                navigation={{
                  nextEl: ".projects-swiper-next",
                  prevEl: ".projects-swiper-prev",
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="projects-swiper !overflow-visible py-12"
              >
                {projects.map((project, index) => (
                  <SwiperSlide
                    key={project.title}
                    className="mb-12 aspect-[4/5] !w-[320px] sm:!w-[420px] lg:!w-[520px]"
                  >
                    {({ isActive }) => (
                      <button
                        type="button"
                        aria-label={`Open details for ${project.title}`}
                        tabIndex={isActive ? 0 : -1}
                        className={`relative block h-full w-full overflow-hidden rounded-2xl border bg-card text-left shadow-tinted-lg transition-[transform,opacity,border-color] duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] ${
                          isActive
                            ? "scale-100 border-primary/60 opacity-100"
                            : "scale-95 border-border opacity-60"
                        }`}
                        onClick={(e) => isActive && openProject(project, e)}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} screenshot`}
                          fill
                          className="scale-90 object-contain p-10"
                          sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 520px"
                          priority={index === 0}
                        />

                        {/* Legibility scrim, tinted with the page ink */}
                        <div
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent"
                          aria-hidden="true"
                        />

                        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
                          <h3 className="mb-2 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                            {project.title}
                          </h3>
                          <p className="mb-5 line-clamp-1 text-xs text-white/65 sm:text-sm">
                            {project.technologies.join(", ")}
                          </p>

                          {isActive && (
                            <span className="group/btn inline-flex w-max items-center font-medium text-white">
                              <span className="mr-3.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors duration-300 group-hover/btn:bg-white group-hover/btn:text-navy-950">
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <span className="underline-offset-4 group-hover/btn:underline">
                                Read more
                              </span>
                            </span>
                          )}
                        </div>
                      </button>
                    )}
                  </SwiperSlide>
                ))}

                <div className="projects-swiper-prev !hidden md:!flex" />
                <div className="projects-swiper-next !hidden md:!flex" />
              </Swiper>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ ...springGentle, delay: reduced ? 0 : 0.12 }}
              viewport={{ once: true }}
              className="mt-6 text-center"
            >
              <Button asChild variant="quiet" size="cta" className="group">
                <Link href="/projects">
                  View my work
                  <NestedArrow className="bg-foreground/10" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Toolkit */}
        <section className="px-6 pt-20 pb-24 md:pt-32 md:pb-36">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={springGentle}
              viewport={{ once: true }}
              className="mb-12 max-w-xl"
            >
              <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                What I reach for
              </h2>
              <p className="measure text-lg text-muted-foreground">
                What I use every day, and what I pick up when a project needs
                more than a frontend. Everything here appears in the work on the
                projects page.
              </p>
            </motion.div>

            <div className="space-y-12">
              {toolkit.map((group) => (
                <div key={group.heading}>
                  <div className="mb-5">
                    <h3 className="text-base font-semibold text-foreground">
                      {group.heading}
                    </h3>
                    <p className="measure text-sm text-muted-foreground">
                      {group.note}
                    </p>
                  </div>

                  <motion.ul
                    className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4"
                    variants={listVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                  >
                    {group.items.map((skill) => (
                      <motion.li
                        key={skill.name}
                        variants={skillCardVariants}
                        className="hover-lift [--lift:-3px] bezel"
                      >
                        <div className="bezel-core flex items-center gap-3.5 p-4">
                          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-surface">
                            <Image
                              src={skill.icon}
                              alt=""
                              width={26}
                              height={26}
                              aria-hidden="true"
                              className={
                                "adaptive" in skill && skill.adaptive
                                  ? "dark:brightness-0 dark:invert"
                                  : undefined
                              }
                            />
                          </span>
                          <span className="text-sm font-medium leading-tight text-foreground">
                            {skill.name}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* By the numbers - asymmetric, left-aligned, tabular figures */}
        <section className="border-t border-border bg-surface px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <motion.dl
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={springGentle}
              viewport={{ once: true }}
              className="flex flex-col gap-10 sm:flex-row sm:items-end sm:gap-16"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...springGentle, delay: reduced ? 0 : index * 0.08 }}
                  viewport={{ once: true }}
                  className={index === 0 ? "" : "sm:border-l sm:border-border sm:pl-16"}
                >
                  <dd className="tabular mb-1.5 text-5xl font-semibold leading-none text-foreground md:text-6xl">
                    {stat.value}
                  </dd>
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </section>
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        originRect={originRect}
        onClose={() => setSelectedProject(null)}
      />
    </PageTransition>
  );
}
