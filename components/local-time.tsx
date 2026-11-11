"use client";

import { useSyncExternalStore } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Asia/Bangkok",
});

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 15_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => formatter.format(new Date());
const getServerSnapshot = () => "--:--";

/** Thailand time (ICT, UTC+7), to the minute. Renders a placeholder until hydrated. */
export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return <span className="tabular">{time} ICT</span>;
}
