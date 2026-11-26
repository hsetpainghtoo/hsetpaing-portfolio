/* The services page reads everything from this file. Flip a flag to switch
   a package or care plan on; no other code needs to change. */

export const servicesConfig = {
  packages: { starter: true, growth: false, pro: false },
  carePlans: { basic: true, growth: false, pro: false },
  showFoundingOffer: true,
  contact: {
    messenger: "https://m.me/hset.htoo.35",
    /* Viber has no web chat link: this opens a chat with the number in the
       Viber app (phone or desktop). Without the app installed it does nothing. */
    viber: "viber://chat?number=%2B959781999018",
    line: "https://line.me/ti/p/_uL1Om80qB",
  },
} as const;

export type PackageId = keyof typeof servicesConfig.packages;
export type CarePlanId = keyof typeof servicesConfig.carePlans;

export const packages: {
  id: PackageId;
  price: string;
  usd: string;
  title: string;
  /** Shown on the muted card while the package is switched off. */
  soon: string;
  items: string[];
}[] = [
  {
    id: "starter",
    price: "฿12,000",
    usd: "~$350",
    title: "Get found online",
    soon: "",
    items: [
      "5-page mobile website",
      "Google Business Profile setup",
      "Messenger/Viber/LINE chat button",
      "Basic SEO",
    ],
  },
  {
    id: "growth",
    price: "฿25,000",
    usd: "~$700",
    title: "Take orders & bookings automatically",
    soon: "Orders and bookings that log themselves.",
    // Hidden until enabled.
    items: [
      "Everything in Starter",
      "Order/booking form → Google Sheet/Calendar",
      "Automatic confirmation and reminder messages",
    ],
  },
  {
    id: "pro",
    price: "฿42,000",
    usd: "~$1,200",
    title: "An AI assistant that answers customers",
    soon: "An AI that replies to customers any time.",
    // Hidden until enabled.
    items: [
      "Everything in Growth",
      "AI chatbot that answers common questions on Messenger/LINE",
      "Monthly report",
    ],
  },
];

export const carePlans: {
  id: CarePlanId;
  name: string;
  price: string;
  usd: string;
  items: string;
}[] = [
  {
    id: "basic",
    name: "Basic",
    price: "฿1,400",
    usd: "~$40",
    items: "Uptime monitoring, backups, 1 hour of edits per month",
  },
  {
    // Hidden until enabled.
    id: "growth",
    name: "Growth",
    price: "฿3,500",
    usd: "~$100",
    items: "Basic + automation monitoring, content updates, monthly report",
  },
  {
    // Hidden until enabled.
    id: "pro",
    name: "Pro",
    price: "฿7,000",
    usd: "~$200",
    items: "Growth + 1 new automation per month, chatbot tuning",
  },
];

/* Every other string on the page. Section labels marked "label" are mine,
   not from the brief; the rest is the agreed copy, word for word. */
export const copy = {
  hero: {
    title: "Your shop, open 24/7 online.",
    sub: "I build websites for Myanmar businesses in Thailand, so customers can find you and message you easily.",
    messenger: "Message me on Messenger",
    viber: "Viber",
  },
  problems: {
    label: "Problems we solve",
    items: [
      "Only a Facebook page, so you're hard to find on Google.",
      "No website, so customers can't check your menu, prices or opening hours.",
      "Customers can't reach you easily, so they go elsewhere.",
    ],
  },
  packages: {
    label: "Packages",
    soon: "Coming soon",
    interested: "Interested? Message me",
    popular: "Most popular",
    terms: "50% to start, 50% at launch. You own your domain and all accounts.",
    founding: "Founding client offer: the first 2 businesses get about 40% off in exchange for a short video review.",
  },
  care: {
    title: "Keep it running",
    perMonth: "/mo",
  },
  steps: {
    label: "How it works",
    items: [
      "Free 15-minute chat",
      "Demo + proposal with 3 options",
      "Build, launch, and hand over",
    ],
  },
  proof: {
    label: "Recent work",
    see: "See the project",
    items: [
      {
        project: "Wholesale Management System",
        result: "Customers order on WhatsApp; stock, invoices and delivery routes update automatically.",
      },
      {
        project: "Myanmar Express Hub",
        result: "A simple website with an AI chat that answers customer questions any time.",
      },
    ],
  },
  contact: {
    label: "Contact",
    messenger: "Messenger",
    viber: "Viber",
    line: "LINE",
  },
} satisfies Record<string, Record<string, unknown>>;
