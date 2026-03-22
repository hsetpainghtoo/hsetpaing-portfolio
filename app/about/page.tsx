"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Layers,
  Zap,
  Briefcase,
  GraduationCap,
  Rocket,
  Star,
  PenTool,
} from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Quality First",
      description:
        "I believe in writing clean, maintainable code that stands the test of time and scales with business needs.",
    },
    {
      title: "Continuous Learning",
      description:
        "Technology evolves rapidly, and I'm committed to staying current with the latest tools and best practices.",
    },
    {
      title: "User-Centered Design",
      description:
        "Every decision I make is guided by how it will impact the end user's experience and satisfaction.",
    },
    {
      title: "Collaboration",
      description:
        "The best solutions come from diverse perspectives working together towards a common goal.",
    },
  ];

  const journey = [
    {
      year: "May 2024",
      title: "Started Programming Journey",
      org: "Self-taught & Company Project",
      description:
        "Began learning HTML, CSS, and JavaScript. After 3 months, jumped into React.js and built my company's first static website over the course of a month.",
      icon: GraduationCap,
    },
    {
      year: "Late 2024",
      title: "Frontend Developer (React.js)",
      org: "Company Project",
      description:
        "Joined the Fuel Stations Management System (FMS) team. Fixed bugs, optimized code blocks, and added new features using React.js until mid-2025.",
      icon: Briefcase,
    },
    {
      year: "Mid 2025",
      title: "Next.js & FMS Upgrade",
      org: "Company Project",
      description:
        "Moved to the new Next.js version of FMS. Gained hands-on experience with TypeScript and TanStack Query. Developed Cloud Reports, CRUD request functions, and made the Local UI responsive.",
      icon: Rocket,
    },
    {
      year: "2025",
      title: "Myanmar Express Hub Launch",
      org: "Freelance Project",
      description:
        "Completed a multilingual shopping and shipping platform with AI chatbot integration, Groq API, and Sanity CMS.",
      icon: Star,
    },
    {
      year: "Mar 2026",
      title: "Roots to Rooms (Frontend Modified)",
      org: "Company Project",
      description:
        "Modified the frontend of Roots to Rooms to improve user experience and add new UI designs.",
      icon: PenTool,
    },
  ];

  const whatIDo = [
    {
      title: "Frontend Development",
      description:
        "Building responsive, performant web applications with React, Next.js, and TypeScript.",
      icon: Code2,
    },
    {
      title: "UI/UX Implementation",
      description:
        "Translating designs into pixel-perfect, accessible interfaces with smooth animations.",
      icon: Palette,
    },
    {
      title: "Component Architecture",
      description:
        "Creating reusable, well-structured component systems and design systems for scalable apps.",
      icon: Layers,
    },
    {
      title: "Performance Optimization",
      description:
        "Ensuring fast load times, efficient rendering, and smooth interactions across devices.",
      icon: Zap,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <PageTransition>
      <div className="bg-background text-foreground transition-colors duration-300 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get to know the person behind the code
            </p>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20"
          >
            <motion.div
              className="lg:col-span-1 text-center lg:text-left"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/hph_portrait.jpg"
                alt="Hset Paing"
                width={300}
                height={300}
                className="rounded-2xl mx-auto lg:mx-0 shadow-xl ring-4 ring-navy-100 dark:ring-navy-800"
              />
            </motion.div>
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Hello, I&apos;m Hset Paing Htoo.
              </h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  I&apos;m a passionate frontend developer who rapidly learned
                  and adapted to craft intuitive and scalable digital products.
                  My journey in tech started with a fascination for how
                  interfaces shape user experiences, which quickly turned into a
                  commitment to building responsive, accessible, and
                  user-centered applications.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  I specialize in modern frontend technologies like React,
                  Next.js, TypeScript, and Tailwind CSS, with a keen eye for
                  clean UI and smooth user interactions. I collaborated on the
                  Frontend of the Fuel Station Management System, helping
                  upgrade it to a Next.js architecture while building complex
                  Cloud Reports, CRUD operations, and responsive web features. I
                  also completed the website for &quot;Myanmar Express
                  Hub&quot;, integrating an AI assistant chatbot to enhance user
                  engagement.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  When I&apos;m not coding, I enjoy experimenting with emerging
                  web tools, refining my design skills, and contributing to
                  personal projects. I&apos;m always eager to tackle new
                  challenges and work with teams that value creativity, clean
                  code, and impactful user experiences.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* My Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              My Journey
            </h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-indigo-400 to-violet-400 dark:from-blue-600 dark:via-indigo-600 dark:to-violet-600" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-12"
              >
                {journey.map((item, index) => {
                  const isLeft = index % 2 === 0;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`relative flex items-start gap-6 md:gap-0 ${
                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Timeline Dot */}
                      <motion.div
                        className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/30 z-10"
                        whileHover={{ scale: 1.2 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <item.icon className="w-5 h-5 text-white" />
                      </motion.div>

                      {/* Content Card */}
                      <div
                        className={`ml-20 md:ml-0 ${isLeft ? "md:w-[calc(50%-40px)] md:pr-8" : "md:w-[calc(50%-40px)] md:pl-8"}`}
                      >
                        <motion.div
                          whileHover={{ y: -3 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300">
                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full">
                                  {item.year}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                  {item.org}
                                </span>
                              </div>
                              <CardTitle className="text-gray-900 dark:text-white text-lg">
                                {item.title}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <CardDescription className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {item.description}
                              </CardDescription>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* What I Do Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              What I Do
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {whatIDo.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center mb-3">
                        <item.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <CardTitle className="text-gray-900 dark:text-white text-lg">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              My Values & Mission
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-full">
                    <CardHeader>
                      <CardTitle className="text-gray-900 dark:text-white text-lg">
                        {value.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 dark:text-gray-400">
                        {value.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
