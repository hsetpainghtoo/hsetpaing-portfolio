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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="bg-background text-foreground transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative min-h-[95vh] flex flex-col justify-center items-center overflow-hidden pt-10">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 z-0"></div>

          {/* Huge Background Text */}
          <div className="absolute top-10 md:top-20 left-0 w-full flex justify-center z-0 pointer-events-none overflow-hidden">
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
              {/* Left Column (Bio/Intro) - Desktop Order 1 */}
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
                  <span className="text-blue-500 font-semibold">Passionate Frontend Developer</span> creating seamless, engaging
                  digital experiences with modern tools and frameworks.
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
                    <Link href="/contact">Let's Talk</Link>
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

              {/* Center Column (Profile Image) - Desktop Order 2 */}
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
                {/* Glow behind image */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-[100px] -z-10"></div>
              </motion.div>

              {/* Right Column (Stats/Bio) - Desktop Order 3 */}
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
                  {/* Decorative underline/scribble could go here */}
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

        {/* Featured Project Section */}
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
                Featured Project
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
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <motion.div
                    className="relative h-64 lg:h-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src="/myanmarexpresshub_3D.png"
                      alt="Myanmar Express Hub"
                      fill
                      className="object-contain mx-auto"
                    />
                  </motion.div>
                  <div className="p-8 lg:p-12">
                    <CardHeader className="p-0 mb-6">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                      >
                        <CardTitle className="text-2xl md:text-3xl text-gray-900 dark:text-white mb-3">
                          Myanmar Express Hub
                        </CardTitle>
                        <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                          Myanmar Express Hub is an international shopping and
                          shipping service platform built with Next.js,
                          TypeScript, and Groq API. It features dynamic content
                          management with Sanity CMS, multilingual support with
                          i18n, and a modern, responsive interface powered by
                          Shadcn UI and Tailwind CSS.
                        </CardDescription>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap gap-2 mb-6"
                      >
                        {[
                          "Next.js",
                          "TypeScript",
                          "Groq AI API",
                          "i18n",
                          "Shadcn UI",
                        ].map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.3,
                              delay: 0.5 + index * 0.1,
                            }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge
                              variant="secondary"
                              className="text-sm bg-navy-100 text-navy-800 dark:bg-navy-900/30 dark:text-navy-300"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-3"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Button
                            asChild
                            className="w-full bg-primary hover:bg-primary text-white"
                          >
                            <Link
                              href="https://myanmarexpresshub.com/"
                              target="_blank"
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Project
                            </Link>
                          </Button>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1"
                        >
                          <Button
                            variant="outline"
                            asChild
                            className="w-full bg-transparent border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900/20"
                          >
                            <Link href="#">
                              <Github className="mr-2 h-4 w-4" />
                              Source Code
                            </Link>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-20 px-6">
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
    </PageTransition>
  );
}
