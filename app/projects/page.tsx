"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/projects";
import BorderGlow from "@/components/BorderGlow";
import { NestedArrow } from "@/components/nested-arrow";
import { entryContainer, entryItem, springGentle } from "@/lib/motion";

/* A deliberately uneven grid: wide, narrow, narrow, wide - repeating.
   Beats three identical columns marching down the page. */
const SPAN_PATTERN = [4, 2, 2, 4];

export default function ProjectsPage() {
  const reduced = useReducedMotion();
  const containerVariants = entryContainer(reduced, 0.07);
  const itemVariants = entryItem(reduced, 28);

  return (
    <PageTransition>
      <div className="relative z-10 overflow-x-clip bg-background px-6 py-20 text-foreground md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springGentle}
            className="mb-16 max-w-2xl"
          >
            <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
              Everything I have shipped
            </h1>
            <p className="measure text-lg text-muted-foreground">
              Corporate sites, an internal management system, and side builds
              where I got to try something new. Each one lists the stack it was
              actually built on.
            </p>
          </motion.header>

          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 md:grid-cols-6"
          >
            {projects.map((project, index) => {
              const span = SPAN_PATTERN[index % SPAN_PATTERN.length];
              const isWide = span === 4;
              const hasLive = project.liveUrl !== "#";
              const hasCode = project.githubUrl !== "#";

              return (
                <motion.li
                  key={project.title}
                  variants={itemVariants}
                  className={`hover-lift [--lift:-6px] ${
                    isWide ? "md:col-span-4" : "md:col-span-2"
                  }`}
                >
                  <BorderGlow
                    className="h-full"
                    borderRadius={14}
                    backgroundColor="transparent"
                    glowColor="214 60 55"
                    colors={["#2a5fa8", "#1d4275", "#4b7fc4"]}
                  >
                    <article className="relative z-10 flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-card">
                      <div
                        className={`relative overflow-hidden bg-surface ${
                          isWide ? "aspect-[16/8]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={`${project.title} interface screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1152px) 50vw, 640px"
                          className="object-contain p-6 transition-transform duration-500 ease-out hover:scale-[1.04]"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h2
                          className={`mb-2.5 font-semibold text-foreground ${
                            isWide ? "text-2xl" : "text-lg"
                          }`}
                        >
                          {project.title}
                        </h2>
                        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>

                        <ul className="mb-6 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <li key={tech}>
                              <Badge variant="tag">{tech}</Badge>
                            </li>
                          ))}
                        </ul>

                        {/* Pinned to the bottom so CTAs line up across the row */}
                        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border/70 pt-5">
                          {hasLive ? (
                            <Button asChild size="sm">
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                <ExternalLink aria-hidden="true" />
                                Visit site
                              </a>
                            </Button>
                          ) : (
                            <span className="inline-flex h-9 items-center gap-2 rounded-md bg-muted px-3 text-sm font-medium text-muted-foreground/70">
                              <Lock className="h-4 w-4" aria-hidden="true" />
                              Internal tool
                            </span>
                          )}

                          {hasCode ? (
                            <Button asChild size="sm" variant="quiet">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                <Github aria-hidden="true" />
                                Source
                              </a>
                            </Button>
                          ) : (
                            <span className="inline-flex h-9 items-center px-2 text-sm text-muted-foreground/70">
                              Private repository
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  </BorderGlow>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={springGentle}
            className="mt-20 border-t border-border pt-10"
          >
            <p className="mb-4 text-xl font-medium tracking-tight">
              Something you want built next?
            </p>
            <Button asChild size="cta" className="group">
              <Link href="/contact">
                Get in touch
                <NestedArrow className="bg-primary-foreground/20" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
