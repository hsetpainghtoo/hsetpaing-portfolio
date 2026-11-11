import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { Line, PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { VideoStage } from "@/components/video-stage";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

/* Uneven on purpose: wide, narrow, narrow, wide, repeating. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export default function ProjectsPage() {
  return (
    <>
      {/* The page opens on a night garden. The first row of work is pulled up
          so the screenshots stand in it rather than below it. */}
      <VideoStage video="/work-plants.mp4" poster="/work-plants-poster.webp">
        <div className="mx-auto max-w-[1600px] px-5 pb-40 sm:px-8 md:pb-52 lg:px-12 lg:pb-72">
          <PageIntro
            eyebrow={`Work / ${projects.length} projects`}
            title={
              <>
                <Line delay={120}>Everything</Line>
                <Line delay={210}>
                  I have{" "}
                  <span className="serif-accent text-muted-foreground">shipped</span>
                </Line>
              </>
            }
            lede="Industrial monitoring, wholesale operations, corporate sites, and side builds where I got to try something new. Each one lists the stack it was actually built on."
          />
        </div>
      </VideoStage>

      <div className="relative z-10 mx-auto -mt-28 max-w-[1600px] px-5 sm:px-8 md:-mt-36 lg:-mt-52 lg:px-12">
      <ul className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-20">
        {projects.map((project, i) => {
          const hasLive = project.liveUrl !== "#";
          const hasCode = project.githubUrl !== "#";
          const animated = project.image.endsWith(".gif");

          return (
            <Reveal as="li" key={project.title} className={SPANS[i % SPANS.length]}>
              <article className="group flex h-full flex-col">
                <div
                  data-cursor={hasLive ? undefined : "Private"}
                  className="relative h-60 overflow-hidden rounded-[1.5rem] bg-surface sm:h-72 md:rounded-[2rem] lg:h-[26rem]"
                >
                  {hasLive && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`Visit ${project.title}`}
                      data-cursor="Visit"
                      className="absolute inset-0 z-10"
                    />
                  )}
                  <Image
                    src={project.image}
                    alt={`${project.title} interface`}
                    fill
                    sizes="(min-width: 1024px) 56vw, (min-width: 768px) 46vw, 92vw"
                    quality={70}
                    /* Animated GIFs cannot be re-encoded by the optimiser, so
                       the one that exists is passed through and lazy-loaded. */
                    unoptimized={animated}
                    className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />
                </div>

                <div className="flex flex-1 flex-col px-1 pt-6">
                  <div className="flex items-center justify-between">
                    <span className="eyebrow">{project.kind}</span>
                    <span className="eyebrow">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h2 className="mt-4 text-[clamp(1.5rem,2.4vw,2.25rem)] font-medium leading-[1.05] tracking-[-0.035em]">
                    {project.title}
                  </h2>
                  <p className="measure mt-3 text-muted-foreground">
                    {project.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="tabular rounded-full border border-foreground/10 px-2.5 py-1 text-[0.6875rem] text-muted-foreground"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6 text-sm">
                    {hasLive ? (
                      <ExternalLink href={project.liveUrl}>Visit site</ExternalLink>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <Lock className="size-3.5" aria-hidden="true" />
                        Internal tool
                      </span>
                    )}
                    {hasCode ? (
                      <ExternalLink href={project.githubUrl}>Source</ExternalLink>
                    ) : (
                      <span className="text-muted-foreground">Private repository</span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </ul>
      </div>
    </>
  );
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn("group/link inline-flex items-center gap-1.5 font-medium", className)}
    >
      <span className="link-draw">{children}</span>
      <ArrowUpRight
        className="size-4 transition-transform duration-300 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
        aria-hidden="true"
      />
    </a>
  );
}
