"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Mail, MessageCircle, Send } from "lucide-react"
import Link from "next/link"
import { PageTransition } from "@/components/page-transition"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      console.log(response, "Email Response")

      if (response.ok) {
        toast.success("Thank you for your message! I'll get back to you soon.")
        reset()
      } else {
        toast.error("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error("Failed to send message. Please try again.")
    }
  }

  const socialLinks = [
    { icon: Github, href: "https://github.com/hsetpainghtoogithub.com", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/hset-paing-htoo-74a6542aa/", label: "LinkedIn" },
    { icon: MessageCircle, href: "https://m.me/hset.htoo.35", label: "Messenger" },
  ]

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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Get In Touch</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Let's connect and discuss how we can
              work together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">Send me a message</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Fill out the form below and I'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                        Name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-navy-500 dark:focus:border-navy-400"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:border-navy-500 dark:focus:border-navy-400"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        className="bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 min-h-[120px] focus:border-navy-500 dark:focus:border-navy-400"
                        placeholder="Tell me about your project or just say hello..."
                      />
                      {errors.message && (
                        <p className="text-sm text-red-500">{errors.message.message}</p>
                      )}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary cursor-pointer text-white"
                      >
                        {isSubmitting ? (

                          <>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Contact Information</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Feel free to reach out through any of these channels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <Link
                        href="mailto:hsetpainghtoo218@gmail.com"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-navy-600 dark:hover:text-navy-400 transition-colors"
                      >
                        <Mail className="w-5 h-5" />
                        hsetpainghtoo218@gmail.com
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-white">Follow Me</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      Connect with me on social media and professional networks.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={social.label}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Link
                            target="_blank"
                            href={social.href}
                          >
                            <social.icon className="w-5 h-5" />
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-gradient-to-br from-navy-50 to-navy-100 dark:from-navy-900/20 dark:to-navy-800/20 border-navy-200 dark:border-navy-800">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Let's Build Something Amazing Together
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Whether you have a project in mind or just want to chat about technology, I'm always open to new
                      conversations and opportunities.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
