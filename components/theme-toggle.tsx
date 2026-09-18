"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";

interface ThemeProps {
  theme: string;
  setTheme: (theme: string) => void;
}

/* Three states rather than a binary switch: the system preference is a real
   choice, not an absence of one. */
const ORDER = ["system", "light", "dark"] as const;

const ICONS = {
  system: Monitor,
  light: Sun,
  dark: Moon,
} as const;

const LABELS = {
  system: "Theme: following system. Switch to light",
  light: "Theme: light. Switch to dark",
  dark: "Theme: dark. Switch to system",
} as const;

type ThemeName = (typeof ORDER)[number];

export function ThemeToggle({ theme, setTheme }: ThemeProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent"
        aria-hidden="true"
        tabIndex={-1}
      >
        <Monitor className="h-[1.1rem] w-[1.1rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const current: ThemeName = (ORDER as readonly string[]).includes(theme)
    ? (theme as ThemeName)
    : "system";
  const Icon = ICONS[current];
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(next)}
      aria-label={LABELS[current]}
      className="border-border bg-transparent hover:border-primary/40 hover:bg-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ opacity: 0, scale: 0.7, rotate: -35 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.7, rotate: 35 }}
          transition={springSnappy}
          className="flex items-center justify-center"
        >
          <Icon
            className="h-[1.1rem] w-[1.1rem] text-foreground"
            aria-hidden="true"
          />
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
