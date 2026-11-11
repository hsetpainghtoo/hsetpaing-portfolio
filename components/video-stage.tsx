import type { ReactNode } from "react";
import { BackgroundVideo } from "@/components/background-video";
import { cn } from "@/lib/utils";

interface VideoStageProps {
  children: ReactNode;
  video: string;
  videoHd?: string;
  poster: string;
  className?: string;
  /** Where the footage is anchored inside the stage. */
  mediaClassName?: string;
  /** Which side the copy sits on, and so which side is darkened for it. */
  scrim?: "top" | "left";
}

/**
 * A dark stage with footage behind the content. Always dark, in either theme,
 * because the footage is. Two scrims do the text protection: the upper part,
 * where the title sits, is pulled down to the stage colour, and the bottom
 * edge melts into it.
 */
export function VideoStage({
  children,
  video,
  videoHd,
  poster,
  className,
  mediaClassName = "object-[50%_72%]",
  scrim = "top",
}: VideoStageProps) {
  return (
    <section
      className={cn(
        "theme-dark relative overflow-hidden rounded-b-[2rem] bg-background text-foreground md:rounded-b-[3rem]",
        className
      )}
    >
      <BackgroundVideo
        video={video}
        videoHd={videoHd}
        poster={poster}
        priority
        seamFade
        mediaClassName={mediaClassName}
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {scrim === "top" ? (
          <div className="absolute inset-x-0 top-0 h-[84%] bg-gradient-to-b from-background via-background/85 to-transparent md:h-[70%]" />
        ) : (
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background/90 via-background/55 to-transparent md:w-[62%]" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10">{children}</div>
    </section>
  );
}
