import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Trailing arrow that sits in its own circular well rather than naked beside
 * the label, so the button reads as a machined object with a part inside it.
 *
 * On hover it translates diagonally and scales fractionally against a button
 * that is itself pressing down, which puts the two in tension instead of
 * moving them as one block.
 */
export function NestedArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        "[&_svg]:size-3.5",
        "transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
        className
      )}
    >
      <ArrowRight strokeWidth={1.5} />
    </span>
  );
}
