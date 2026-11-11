export interface Project {
  title: string;
  /** What kind of build it was, in two or three words. */
  kind: string;
  /** One line for cards; the full description lives on the projects page. */
  tagline: string;
  description: string;
  image: string;
  technologies: string[];
  /** "#" means there is nothing public to link to. */
  liveUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    title: "Terminal Monitoring System",
    kind: "Industrial monitoring",
    tagline:
      "Tank levels off Modbus hardware, turned into certified volumes, live dashboards and alerts for a fuel terminal.",
    description:
      "Industrial monitoring stack for a fuel terminal, polling Modbus registers off Rosemount tank hubs into InfluxDB and a white-labelled Grafana dashboard. A calibration service turns raw level readings into certified volume and weight figures against ASTM D1250 tables and SGS strapping certificates, and a reporter service pushes threshold alerts to engineers over Telegram and email. Ships as an offline Docker package for air-gapped sites.",
    image: "/terminal_monitoring_project.png",
    technologies: ["Docker", "Telegraf", "InfluxDB", "Grafana", "Modbus", "Python", "FastAPI", "Node.js"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Wholesale Management System",
    kind: "Operations platform",
    tagline:
      "WhatsApp order intake, an append-only stock ledger and optimised delivery routes for a Singapore distributor.",
    description:
      "Order intake, stock control, and delivery routing for a wholesale distributor in Singapore. Customers order over WhatsApp instead of logging in, stock is an append-only ledger so figures stay auditable, and multi-stop routes are waypoint-optimised before dispatch. Picking lists, delivery orders, and invoices print from what actually shipped rather than what was ordered.",
    image: "/wholesale_management_project.png",
    technologies: ["Next.js", "TypeScript", "Express", "Prisma", "PostgreSQL", "TanStack Query", "Zod", "Docker"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "ShouXingCare",
    kind: "Product marketing site",
    tagline:
      "The public face of a voice-first AI companion device built for elderly care.",
    description:
      "Marketing site for a voice-first AI companion device built for elderly care. The device holds a conversation on a wake word, keeps medicine reminders that mirror to family on Telegram, and sends one-tap emergency alerts to up to three contacts.",
    image: "/shouxingcare_project.png",
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Nodemailer"],
    liveUrl: "https://shouxingcare.com",
    githubUrl: "#",
  },
  {
    title: "Transtak Pte Ltd Website",
    kind: "Corporate site",
    tagline:
      "The corporate site for an engineering, logistics and e-commerce firm serving SMEs across Southeast Asia.",
    description: "Official corporate website for Transtak Pte Ltd, providing end-to-end engineering, logistics, and e-commerce solutions for SMEs across Southeast Asia.",
    image: "/transtak_project.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Nodemailer", "React Bits"],
    liveUrl: "https://transtak.com.sg",
    githubUrl: "#",
  },
  {
    title: "Mahar Engineering Website",
    kind: "Corporate site",
    tagline:
      "The corporate site for a Singapore M&E contractor working on large-scale infrastructure.",
    description: "Official corporate website for Mahar Engineering, a Singapore-registered Mechanical & Electrical (M&E) contractor specializing in large-scale infrastructure projects.",
    image: "/mahar_project.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Nodemailer"],
    liveUrl: "https://www.maharengr.com",
    githubUrl: "#",
  },
  {
    title: "DET Static Website",
    kind: "Corporate site",
    tagline: "My first static site, built for an IoT services company.",
    description: "My first static website for my company, Digital Engineering Tech Ltd., a company that provides IoT services. I built this website to showcase my company's services and products.",
    image: "/det_project_new.png",
    technologies: ["React.js", "i18n", "Tailwind CSS"],
    liveUrl: "https://det-static-website.vercel.app",
    githubUrl: "https://github.com/hsetpainghtoo/DET-Static-Website.git",
  },
  {
    title: "Myanmar Express Hub",
    kind: "Commerce platform",
    tagline:
      "A multilingual shopping and shipping platform with an AI assistant.",
    description:
      "Myanmar Express Hub is a multilingual shopping and shipping platform built with Next.js, TypeScript, Groq API, Shadcn UI and multilingual support with i18n.",
    image: "/express_hub_new.png",
    technologies: ["Next.js", "TypeScript", "Groq AI API", "i18n", "Shadcn UI"],
    liveUrl: "https://myanmar-express-hub.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "Fake Store API Practice Project",
    kind: "Practice build",
    tagline:
      "A practice e-commerce frontend with listings, product detail and a cart, on the Fake Store API.",
    description:
      "A practice eCommerce frontend built with React, TypeScript, and Tailwind CSS, fetching product data from the Fake Store API to display dynamic product listings, details, and cart functionality.",
    image: "/online-shop.gif",
    technologies: ["React", "Tailwind CSS", "Redux Toolkit"],
    liveUrl: "https://fake-store-flame.vercel.app/",
    githubUrl: "https://github.com/hsetpainghtoo/FakeStore",
  },
  {
    title: "Fuel Station Management System (Frontend)",
    kind: "Management system",
    tagline:
      "Inventory, sales tracking and customer management for fuel station operations.",
    description:
      "A comprehensive solution for managing fuel station operations, including inventory management, sales tracking, and customer management.",
    image: "/fuel_station_new.png",
    technologies: ["Next.js", "TypeScript", "i18n", "Shadcn UI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Roots to Rooms",
    kind: "Community platform",
    tagline:
      "Connecting rural farmers and artisans directly with educational institutions.",
    description:
      "Roots to Rooms (R2R) is a platform connecting rural farmers and artisans directly with educational institutions. We empower local communities by giving them a fair role in the supply chain, ensuring every child has access to quality resources fueled by local talent.",
    image: "/roots_rooms_new.png",
    technologies: ["React.js", "TypeScript", "i18n", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.r2r-mm.com/",
    githubUrl: "#",
  },
];

export const site = {
  name: "Hset Paing Htoo",
  email: "hsetpainghtoo218@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/hsetpainghtoo" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/hset-paing-htoo-91b997314/",
    },
    { label: "Messenger", href: "https://m.me/hset.htoo.35" },
  ],
} as const;
