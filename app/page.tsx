"use client";

import "./globals.css";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  MessageCircle,
  Code2,
  FileCode2,
  Braces,
  FileType,
  Palette,
  Layout,
  Layers,
  GitBranch,
  Globe,
  Figma,
  Lightbulb,
  Users,
  Brain,
  RefreshCcw,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ProjectModal, type Project } from "@/components/ProjectModal";

const projects: Project[] = [
  {
    title: "Myanmar Express Hub",
    description:
      "Myanmar Express Hub is a multilingual shopping and shipping platform built with Next.js, TypeScript, Groq API, Shadcn UI and multilingual support with i18n.",
    image: "/myanmarexpresshub_3D.png",
    technologies: ["Next.js", "TypeScript", "Groq AI API", "i18n", "Shadcn UI"],
    liveUrl: "https://myanmarexpresshub.com/",
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
    image: "/placeholder.svg",
    technologies: ["Next.js", "TypeScript", "i18n", "Shadcn UI"],
    liveUrl: "#",
    githubUrl: "#",
  },
];

const technicalSkills = [
  { name: "HTML", icon: Code2 },
  { name: "CSS", icon: Palette },
  { name: "JavaScript", icon: Braces },
  { name: "TypeScript", icon: FileType },
  { name: "React.js", icon: Layers },
  { name: "Next.js", icon: Globe },
  { name: "Tailwind CSS", icon: Layout },
  { name: "Git", icon: GitBranch },
  { name: "Figma", icon: Figma },
  { name: "Redux", icon: FileCode2 },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const skillCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <PageTransition>
      <div className="bg-background text-foreground transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative min-h-[95vh] flex flex-col justify-center items-center overflow-hidden pt-10">
          {/* Background Elements */}
          <div className="absolute inset-0 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 z-0"></div>

          {/* Huge Background Text */}
          <div className="absolute top-10 md:top-20 left-0 w-full h-full flex justify-center z-0 pointer-events-none overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-[12vw] md:text-[14vw] font-bold text-gray-100 dark:text-white/5 tracking-normal leading-none whitespace-nowrap select-none"
            >
              Hset Paing
            </motion.h1>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column (Bio/Intro) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3 order-2 lg:order-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
              >
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Available for new projects
                  </span>
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-lg">
                  <span className="text-blue-500 font-semibold">
                    Passionate Frontend Developer
                  </span>{" "}
                  creating seamless, engaging digital experiences with modern
                  tools and frameworks.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto">
                  <Button
                    asChild
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-8 py-6 text-lg shadow-lg shadow-blue-500/25"
                  >
                    <Link href="/projects">
                      View My Work <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-8 py-6 text-lg bg-transparent"
                  >
                    <Link href="/contact">Let&apos;s Talk</Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Follow me:
                  </span>
                  <div className="flex gap-4">
                    {[
                      {
                        icon: Github,
                        href: "https://github.com/hsetpainghtoo",
                        label: "GitHub",
                      },
                      {
                        icon: Linkedin,
                        href: "https://www.linkedin.com/in/hset-paing-htoo-74a6542aa/",
                        label: "LinkedIn",
                      },
                      {
                        icon: MessageCircle,
                        href: "https://m.me/hset.htoo.35",
                        label: "Messenger",
                      },
                    ].map((social) => (
                      <Link
                        key={social.label}
                        href={social.href}
                        className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Center Column (Profile Image) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0 }}
                className="lg:col-span-6 order-1 lg:order-2 flex justify-center relative"
              >
                <div className="relative w-[300px] h-[400px] md:w-[450px] md:h-[550px] lg:w-[500px] lg:h-[600px] z-10">
                  <Image
                    src="/profile_me_transparent.png"
                    alt="Hset Paing"
                    fill
                    className="object-contain drop-shadow-2xl [-webkit-mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]"
                    priority
                    quality={100}
                  />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>
              </motion.div>

              {/* Right Column (Stats/Bio) */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="lg:col-span-3 order-3 flex flex-col gap-8 text-center lg:text-left items-center lg:items-start"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    The Next Step for <br />
                    Brands <span className="text-blue-500">Ready to Grow</span>
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    I help businesses craft{" "}
                    <span className="font-semibold text-navy-600 dark:text-blue-300">
                      data-driven digital strategies
                    </span>{" "}
                    to increase visibility, improve conversions, and scale
                    faster.
                  </p>
                </div>

                <div className="relative">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    100%
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Client Satisfaction
                  </p>
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-blue-400"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Carousel Section */}
        <section className="py-20 px-6 bg-muted/50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                My Projects
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                A showcase of my latest and most impactful work
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col md:flex-row gap-4 w-full h-[600px] mt-10">
                {projects.map((project, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <motion.div
                      key={index}
                      layout // Essential for fluid width animation
                      onClick={() => {
                        setCurrentSlide(index);
                      }}
                      initial={{ flex: index === 0 ? 4 : 1 }}
                      animate={{
                        flex: isActive ? 4 : 1,
                        opacity: isActive ? 1 : 0.8,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 25,
                      }}
                      className={`relative overflow-hidden rounded-[2rem] cursor-pointer group ${
                        isActive ? "md:max-w-none" : "hover:flex-[1.2]"
                      }`}
                    >
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${isActive ? "scale-100" : "scale-110 group-hover:scale-105"} bg-gray-100 dark:bg-gray-800`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Persistent Tag/Pill */}
                      <div className="absolute top-6 left-6 z-20">
                        <Badge className="bg-blue-600/90 hover:bg-blue-600 text-white border-0 shadow-lg px-3 py-1 text-xs tracking-wider uppercase backdrop-blur-md">
                          Project
                        </Badge>
                      </div>

                      {/* Gradient Overlay */}
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.4 }}
                        className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-950/40 to-transparent transition-opacity duration-300"
                      />

                      {/* Content (Visible only when active) */}
                      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                        {isActive ? (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="max-w-xl"
                          >
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                              {project.title}
                            </h3>

                            <p className="text-white/80 font-medium text-sm sm:text-base mb-6 line-clamp-2 md:line-clamp-none">
                              {project.technologies.join(" • ")}
                            </p>

                            <div
                              className="flex items-center text-white font-semibold w-max group/btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProject(project);
                              }}
                            >
                              <div className="w-10 h-10 rounded-full border border-white/50 flex flex-shrink-0 items-center justify-center mr-4 group-hover/btn:bg-white group-hover/btn:text-black transition-colors duration-300">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                              <span className="group-hover/btn:underline underline-offset-4">
                                Read more
                              </span>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 origin-bottom-left -rotate-90 hidden md:flex items-center whitespace-nowrap overflow-hidden"
                          >
                            <span className="text-white/90 font-bold text-xl tracking-wider select-none truncate max-w-[400px]">
                              {project.title}
                            </span>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* View All Projects Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button
                asChild
                variant="ghost"
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-base"
              >
                <Link href="/projects">
                  View All Projects <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Skills
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Technologies and tools I work with
              </p>
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <div className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-violet-50/80 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-violet-950/30 border border-blue-100/60 dark:border-blue-800/30 backdrop-blur-sm">
                {/* Decorative glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-[80px]" />

                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 relative z-10"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ staggerChildren: 0.08 }}
                >
                  {technicalSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={skillCardVariants}
                      whileHover={{ scale: 1.08, y: -4 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/80 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-400/5 transition-shadow duration-300 cursor-default"
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center">
                        <skill.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-20 px-6 bg-muted/50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            >
              {[
                { number: "50+", label: "Projects Completed" },
                { number: "3+", label: "Years Experience" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-4xl font-bold text-navy-600 dark:text-navy-400 mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </PageTransition>
  );
}
