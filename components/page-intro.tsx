import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: ReactNode;
  lede: string;
}

/** Shared opening for the inner pages: label, large title, one-line lede. */
export function PageIntro({ eyebrow, title, lede }: PageIntroProps) {
  return (
    <header className="grid gap-8 pb-14 pt-36 md:pb-20 md:pt-44 lg:grid-cols-12 lg:items-end lg:gap-10">
      <div className="lg:col-span-8">
        <p className="eyebrow rise-in mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-foreground/30" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1 className="display text-[clamp(2.75rem,8.4vw,7rem)]">{title}</h1>
      </div>
      <p
        className="rise-in max-w-md text-lg text-muted-foreground lg:col-span-4 lg:pb-3"
        style={{ "--d": "380ms" } as React.CSSProperties}
      >
        {lede}
      </p>
    </header>
  );
}

/** One masked line of a display heading. `delay` is in milliseconds. */
export function Line({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <span className="line-mask">
      <span style={{ "--d": `${delay}ms` } as React.CSSProperties}>
        {children}
      </span>
    </span>
  );
}
