/* The services page reads everything from this file. Flip a flag to switch
   a package, care plan or section on; no other code needs to change.
   Anything in double curly braces is a fact the owner still has to fill in. */

export const servicesConfig = {
  packages: { starter: true, growth: false, pro: false },
  carePlans: { basic: true, growth: false, pro: false },
  showFoundingOffer: true,
  showSampleSite: false,
  sampleSite: {
    url: "{{SAMPLE_SITE_URL}}",
    /* A path in /public (e.g. "/sample-site.webp") or a full https URL. */
    image: "{{SAMPLE_SITE_IMAGE}}",
  },
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
  title: string;
  /** Shown on the muted card while the package is switched off. */
  soon: string;
  items: string[];
}[] = [
  {
    id: "starter",
    price: "฿12,000",
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
  items: string;
}[] = [
  {
    id: "basic",
    name: "Basic",
    price: "฿1,400",
    items: "Uptime monitoring, backups, 1 hour of edits per month",
  },
  {
    // Hidden until enabled.
    id: "growth",
    name: "Growth",
    price: "฿3,500",
    items: "Basic + automation monitoring, content updates, monthly report",
  },
  {
    // Hidden until enabled.
    id: "pro",
    name: "Pro",
    price: "฿7,000",
    items: "Growth + 1 new automation per month, chatbot tuning",
  },
];

/* Every other string on the page. In headings, *word* is set in the ember
   serif italic; in body text, **words** are bold. */
export const copy = {
  hero: {
    title: "Your shop, open 24/7 *online.*",
    sub: "I build websites for Myanmar businesses in Thailand, so customers can find you and message you easily.",
    messenger: "Message me on Messenger",
    viber: "Viber",
  },
  problems: {
    label: "Problems we *solve*",
    items: [
      "Only a Facebook page, so you're hard to find on Google.",
      "No website, so customers can't check your menu, prices or opening hours.",
      "Customers can't reach you easily, so they go elsewhere.",
    ],
  },
  audience: {
    label: "Built for *your* business",
    items: [
      {
        title: "Restaurants & tea shops",
        text: "Show your menu, prices and opening hours so nearby customers find you on Google Maps and message you.",
      },
      {
        title: "Groceries & mini-marts",
        text: "Let customers check what you stock, where you are and when you're open before they make the trip.",
      },
      {
        title: "Shops & local services",
        text: "Phone shops, salons, tailors: one clear page with what you offer, your prices and how to reach you.",
      },
      {
        title: "Agencies",
        text: "Travel, document and job agencies: explain your services clearly and give people a trusted place to contact you.",
      },
    ],
  },
  packages: {
    label: "Packages",
    soon: "Coming soon",
    interested: "Interested? Message me",
    popular: "Most popular",
    oneTime: "One-time payment",
    start: "Start with a free chat",
    /* Explains each Starter item on the featured card. */
    included: [
      {
        title: "5-page mobile website",
        text: "For example: home, menu or products, about, location and contact. Designed for phones first.",
      },
      {
        title: "Google Business Profile",
        text: "Your free listing on Google Search and Maps, with your address, hours, photos and phone number. It's how people nearby find you.",
      },
      {
        title: "Messenger, Viber & LINE buttons",
        text: "One tap opens a chat, so customers can ask questions or order in the app they already use.",
      },
      {
        title: "Basic SEO",
        text: "Set up so Google understands what you sell and where you are, which helps you appear in local searches.",
      },
    ],
    onTheWay: {
      text: "Also on the way: automatic order and booking handling, and an AI chat assistant. Interested?",
      link: "Message me",
    },
    terms: "50% to start, 50% at launch. Your domain and every account are registered in your name.",
    founding:
      "Founding offer: the first 2 businesses get the Starter website for **฿7,200** instead of ฿12,000, in exchange for a short video review after launch.",
  },
  sample: {
    label: "See a *sample*",
    text: "A demo restaurant website I built to show what you'd get. It's a sample, not a real client.",
    button: "Open the sample site",
  },
  timeline: {
    label: "From chat to *launch*",
    summary: "Plan on about 3–4 weeks from our first chat to launch.",
    steps: [
      { title: "Free 15-minute chat about your business", duration: "Day 1" },
      { title: "You send your content; I send a demo and a proposal", duration: "Up to 1 week" },
      {
        title: "I build the site; you review it, with 2 rounds of changes",
        duration: "About 2 weeks",
      },
      { title: "Launch, Google profile live, and handover of all accounts", duration: "1 day" },
    ],
  },
  needs: {
    label: "What I *need* from you",
    items: [
      "Your logo, if you have one",
      "Photos of your shop, food or products (phone photos are fine to start)",
      "Your menu or product list with prices",
      "Opening hours, address and Google Maps location",
      "The phone number and chat accounts customers should contact",
    ],
  },
  costs: {
    label: "Costs after *launch*",
    items: [
      "Domain name (your web address): ฿400–500 per year, registered in your name.",
      "Hosting: free for a small site like this, on an account in your name.",
      "The care plan is optional. Without it, your site stays online and stays yours.",
    ],
  },
  care: {
    title: "Keep it *running*",
    perMonth: "/mo",
  },
  whyMe: {
    label: "Why *me*",
    items: [
      {
        title: "I speak your language",
        text: "Burmese and English, explained plainly, without tech jargon.",
      },
      {
        title: "You own everything",
        text: "Your domain, website and accounts are registered in your name, not mine.",
      },
      {
        title: "Real projects behind it",
        text: "I've built a wholesale ordering system run through WhatsApp and a multilingual website with an AI chat assistant.",
        /** Links to the proof section further down. */
        href: "#proof",
      },
    ],
  },
  proof: {
    label: "Recent *work*",
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
  faq: {
    label: "Questions",
    items: [
      {
        q: "Do I need any technical skills?",
        a: "No. You send your content by chat, and I handle the setup. I'll also show you how to update your hours and photos on Google.",
      },
      {
        q: "I already have a Facebook page. Why do I need a website?",
        a: "Keep your Facebook page. A website and Google profile help people find you on Google and Maps, and give them one clear place for your menu, prices and hours. The site links to your Facebook page.",
      },
      {
        q: "Which languages can my website be in?",
        a: "English, Burmese, or both. Thai is possible if you provide the Thai text. I speak Burmese and English, so we can work together in Burmese.",
      },
      {
        q: "Can I change things myself later?",
        a: "Yes for your Google profile: I'll show you how to update hours, photos and contact details. For website changes, message me. The Basic care plan (฿1,400/month) includes 1 hour of edits each month; without it, I quote each change.",
      },
      { q: "How do I pay?", a: "50% to start and 50% at launch, by bank transfer or PromptPay." },
      {
        q: "How many changes are included?",
        a: "2 rounds of changes before launch. Small fixes after launch are covered by the Basic care plan.",
      },
      {
        q: "What isn't included?",
        a: "Online payments, professional photography and logo design. Ask me if you need them.",
      },
      {
        q: "Where are you based?",
        a: "I'm based in Bangkok and work online with businesses anywhere in Thailand, by chat and video call.",
      },
    ],
  },
  finalCta: {
    label: "Not sure what you *need*?",
    text: "Send me your Facebook page link. I'll tell you for free what's missing and what a website would add.",
    button: "Message me on Messenger",
  },
  contact: {
    label: "Let's talk",
    text: "Free 15-minute chat in Burmese or English. I usually reply the same day.",
    messenger: "Messenger",
    viber: "Viber",
    line: "LINE",
  },
} satisfies Record<string, Record<string, unknown>>;
