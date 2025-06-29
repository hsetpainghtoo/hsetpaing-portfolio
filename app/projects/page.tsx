"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"

export default function ProjectsPage() {
  const projects = [
    {
      title: "Myanmar Express Hub",
      description:
        "Full-stack e-commerce solution with React, Node.js, and PostgreSQL featuring real-time inventory management.",
      image: "/myanmarexpresshub_3D.png?height=250&width=400",
      technologies: ["Next.js", "TypeScript", "Groq API","i18n", "Shadcn UI"],
      liveUrl: "https://myanmarexpresshub.com/",
      githubUrl: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management tool with real-time updates, team collaboration, and project tracking.",
      image: "/placeholder.svg?height=250&width=400",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with data visualization, forecasts, and location-based services.",
      image: "/placeholder.svg?height=250&width=400",
      technologies: ["Vue.js", "D3.js", "Weather API", "Chart.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Social Media Analytics",
      description: "Analytics platform for social media performance tracking with comprehensive reporting features.",
      image: "/placeholder.svg?height=250&width=400",
      technologies: ["React", "Python", "Django", "PostgreSQL"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Mobile Banking App",
      description:
        "Secure mobile banking application with biometric authentication and real-time transaction processing.",
      image: "/placeholder.svg?height=250&width=400",
      technologies: ["React Native", "Firebase", "Stripe", "Node.js"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "AI Content Generator",
      description: "AI-powered content generation tool for marketing teams with customizable templates and workflows.",
      image: "/placeholder.svg?height=250&width=400",
      technologies: ["Next.js", "OpenAI API", "Tailwind", "Prisma"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Real Estate Platform",
      description:
        "Comprehensive real estate platform with property listings, virtual tours, and mortgage calculators.",
      image: "/placeholder.svg?height=250&width=400",
      technologies: ["React", "Node.js", "MongoDB", "Mapbox"],
      liveUrl: "#",
      githubUrl: "#",
    },
    {
      title: "Learning Management System",
      description: "Educational platform with course management, progress tracking, and interactive learning modules.",
      image: "/placeholder.svg?height=250&width=400",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "AWS"],
      liveUrl: "#",
      githubUrl: "#",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <PageTransition>
      <div className="bg-background text-foreground transition-colors duration-300 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A collection of projects that showcase my skills in full-stack development, UI/UX design, and
              problem-solving across various technologies and industries.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 h-full">
                  <motion.div
                    className="relative overflow-hidden rounded-t-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={project.image || "/placeholder.svg?height=250&width=400"}
                      alt={project.title}
                      width={400}
                      height={250}
                      className="w-fit mx-auto h-48 object-cover"
                    />
                  </motion.div>
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-wrap gap-2 mb-4"
                    >
                      {project.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge
                            variant="secondary"
                            className="text-xs bg-navy-100 text-navy-800 dark:bg-navy-900/30 dark:text-navy-300"
                          >
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </motion.div>
                    <div className="flex gap-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button size="sm" asChild className="w-full bg-primary hover:bg-primary text-white">
                          <Link href={project.liveUrl} target="_blank">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full bg-transparent border-navy-600 text-navy-600 hover:bg-navy-50 dark:border-navy-400 dark:text-navy-400 dark:hover:bg-navy-900/20"
                        >
                          <Link href={project.githubUrl}>
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </Link>
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
