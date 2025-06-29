"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"

export default function AboutPage() {
  const technicalSkills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",    
    "Git",
    "Tailwind CSS"
  ]

  const softSkills = [
    "Problem Solving",
    "Communication",
    "Critical Thinking",
    "Adaptability",
    "Mentoring"
  ]

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
      description: "Every decision I make is guided by how it will impact the end user's experience and satisfaction.",
    },
    {
      title: "Collaboration",
      description: "The best solutions come from diverse perspectives working together towards a common goal.",
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">About Me</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Get to know the person behind the code</p>
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16"
          >
            <motion.div
              className="lg:col-span-1 text-center lg:text-left"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Image
                src="/profile_me.jpg"
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
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Hello, I'm Hset Paing Htoo.</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  I'm a passionate frontend developer with over 3 years of experience crafting intuitive and scalable digital products. My journey in tech started with a fascination for how interfaces shape user experiences, which quickly turned into a commitment to building responsive, accessible, and user-centered applications.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  I specialize in modern frontend technologies like React, Next.js, and Tailwind CSS, with a keen eye for clean UI and smooth user interactions. Recently, I had the opportunity to collaborate on the Frontend section of the Fuel Station Management System at Sixth Kendra, where I contributed to building real-time dashboards and reporting tools. I also completed the static website for "Myanmar Express Hub", integrating an AI assistant chatbot to enhance user engagement.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  When I'm not coding, I enjoy experimenting with emerging web tools, refining my design skills, and contributing to personal projects. I'm always eager to tackle new challenges and work with teams that value creativity, clean code, and impactful user experiences.
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">My Values & Mission</h2>
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
                      <CardTitle className="text-gray-900 dark:text-white text-lg">{value.title}</CardTitle>
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

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Technical Skills</h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {technicalSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-sm hover:bg-navy-50 dark:hover:bg-navy-900/20 hover:border-navy-300 dark:hover:border-navy-700 transition-colors border-navy-200 dark:border-navy-700 text-navy-700 dark:text-navy-300"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Soft Skills</h2>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {softSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Badge
                      variant="outline"
                      className="px-3 py-1 text-sm hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
