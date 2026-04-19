import { type Project } from "@/components/ProjectModal";

export const projects: Project[] = [
  {
    title: "DET Static Website",
    description: "My first static website for my company, Ditital Engineering Tech Ltd., a company that provides IoT services. I built this website to showcase my company's services and products.",
    image: "/DET.png",
    technologies: ["React.js", "i18n", "Tailwind CSS"],
    liveUrl: "https://det-static-website.vercel.app",
    githubUrl: "https://github.com/hsetpainghtoo/DET-Static-Website.git",
  },
  {
    title: "Myanmar Express Hub",
    description:
      "Myanmar Express Hub is a multilingual shopping and shipping platform built with Next.js, TypeScript, Groq API, Shadcn UI and multilingual support with i18n.",
    image: "/myanmarexpresshub_3D.png",
    technologies: ["Next.js", "TypeScript", "Groq AI API", "i18n", "Shadcn UI"],
    liveUrl: "https://myanmar-express-hub.vercel.app/",
    githubUrl: "#",
  },
  {
    title: "Fake Store API Practice Project",
    description:
      "A practice eCommerce frontend built with React, TypeScript, and Tailwind CSS, fetching product data from the Fake Store API to display dynamic product listings, details, and cart functionality.",
    image: "/online-shop.gif",
    technologies: ["React", "Tailwind CSS", "Redux Toolkit"],
    liveUrl: "https://fake-store-flame.vercel.app/",
    githubUrl: "https://github.com/hsetpainghtoo/FakeStore",
  },
  {
    title: "Fuel Station Management System",
    description:
      "A comprehensive solution for managing fuel station operations, including inventory management, sales tracking, and customer management.",
    image: "/sk_logo.jpg",
    technologies: ["Next.js", "TypeScript", "i18n", "Shadcn UI"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Roots to Rooms",
    description:
      "Roots to Rooms (R2R) is a platform connecting rural farmers and artisans directly with educational institutions. We empower local communities by giving them a fair role in the supply chain, ensuring every child has access to quality resources fueled by local talent.",
    image: "/r2r-new-logo.png",
    technologies: ["React.js", "TypeScript", "i18n", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://www.r2r-mm.com/",
    githubUrl: "#",
  },
];
