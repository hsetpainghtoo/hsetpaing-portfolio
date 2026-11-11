"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/* Three states rather than a binary switch: following the system is a real
   choice, not the absence of one. */
const ORDER = ["system", "light", "dark"] as const;
type ThemeName = (typeof ORDER)[number];

const ICONS = { system: Monitor, light: Sun, dark: Moon } as const;

const LABELS = {
  system: "Theme: following system. Switch to light",
  light: "Theme: light. Switch to dark",
  dark: "Theme: dark. Switch to system",
} as const;

const noop = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  /* The stored theme is unknown on the server, so render the neutral icon
     until hydration instead of guessing and mismatching. */
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  const current: ThemeName =
    mounted && (ORDER as readonly string[]).includes(theme ?? "")
      ? (theme as ThemeName)
      : "system";
  const Icon = ICONS[current];
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={mounted ? LABELS[current] : "Toggle theme"}
      className="press-feedback flex size-10 items-center justify-center rounded-full text-foreground/70 hover:bg-foreground/[0.07] hover:text-foreground"
    >
      <Icon key={current} className="fade-in size-[1.05rem]" aria-hidden="true" />
    </button>
  );
}
