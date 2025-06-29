"use client"

import "./globals.css"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ExternalLink, Github, Linkedin, MessageCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <PageTransition>
      <div className="bg-background text-foreground transition-colors duration-300">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-white to-blue-300/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20"></div>


          {/* Animated Background Shapes */}
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-navy-100/20 dark:bg-navy-900/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-100/20 dark:bg-blue-900/10 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-left"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-navy-100 dark:bg-navy-900/30 text-navy-700 dark:text-navy-300 text-sm font-medium mb-6"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                  Available for new projects
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                >
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-tl from-navy-600 to-blue-600 bg-clip-text text-transparent">
                    Hset Paing
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
                >
                  Passionate Frontend Developer creating seamless, engaging digital experiences with modern tools and frameworks.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="bg-primary hover:bg-primary text-white shadow-lg px-8 py-6 text-lg"
                    >
                      <Link href="/projects">
                        View My Work
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      asChild
                      className="border-2 border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-400 dark:hover:text-white px-8 py-6 text-lg bg-transparent"
                    >
                      <Link href="/contact">Let's Talk</Link>
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="flex items-center gap-6"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400">Follow me:</span>
                  {[
                    { icon: Github, href: "https://github.com/hsetpainghtoo", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/hset-paing-htoo-74a6542aa/", label: "LinkedIn" },
                    { icon: MessageCircle, href: "https://m.me/hset.htoo.35", label: "Messenger" },
                  ].map((social, index) => (
                    <motion.div
                      key={social.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Link
                        href={social.href}
                        className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-navy-600 dark:hover:text-navy-400 hover:bg-navy-50 dark:hover:bg-navy-900/20 transition-all duration-200"
                      >
                        <social.icon className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Profile Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative flex justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute -top-4 -left-4 w-24 h-24 bg-navy-200 dark:bg-navy-800 rounded-full opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />

                  {/* Main Profile Image */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative z-10"
                  >
                    <div className="w-80 h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white dark:ring-gray-800">
                      <Image
                        src="/profile_me.jpg"
                        alt="Hset Paing"
                        width={400}
                        height={400}
                        className="w-full h-full object-cover "
                      />
                    </div>
                  </motion.div>

                  {/* Floating Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="absolute -left-8 top-1/2 transform -translate-y-1/2"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
                      <div className="text-2xl font-bold text-navy-600 dark:text-navy-400">1+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="absolute -right-8 bottom-1/4"
                  >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-700">
                      <div className="text-2xl font-bold text-navy-600 dark:text-navy-400">2+</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="flex flex-col items-center text-gray-400 dark:text-gray-500"
              >
                <span className="text-sm mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center">
                  <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
                  />
                </div>
              </motion.div>
            </motion.div>
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Project</h2>
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
                          Myanmar Express Hub is an international shopping and shipping service platform built with Next.js, TypeScript, and Groq API. It features dynamic content management with Sanity CMS, multilingual support with i18n, and a modern, responsive interface powered by Shadcn UI and Tailwind CSS.
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
                        {["Next.js", "TypeScript", "Groq AI API", "i18n", "Shadcn UI"].map((tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
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
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                          <Button asChild className="w-full bg-primary hover:bg-primary text-white">
                            <Link href="https://myanmarexpresshub.com/" target="_blank">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View Project
                            </Link>
                          </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
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
                  <h3 className="text-4xl font-bold text-navy-600 dark:text-navy-400 mb-2">{stat.number}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
