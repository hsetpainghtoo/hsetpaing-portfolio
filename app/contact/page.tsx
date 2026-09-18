"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Github,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import Link from "next/link";
import { PageTransition } from "@/components/page-transition";
import { motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { springGentle } from "@/lib/motion";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters"),
  email: z.string().email("This does not look like a valid email address"),
  message: z.string().min(5, "Please write at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const socialLinks = [
  { icon: Github, href: "https://github.com/hsetpainghtoo", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/hset-paing-htoo-91b997314/",
    label: "LinkedIn",
  },
  { icon: MessageCircle, href: "https://m.me/hset.htoo.35", label: "Messenger" },
];

export default function ContactPage() {
  const reduced = useReducedMotion();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Message sent. I will get back to you shortly.");
        reset();
      } else {
        toast.error("The message could not be sent. Please try again.");
      }
    } catch {
      toast.error("Connection failed. Please check your network and retry.");
    }
  };

  /* Shared field styling keeps the error treatment identical across inputs. */
  const fieldClass =
    "bg-background border-input transition-colors focus-visible:border-primary aria-[invalid=true]:border-destructive";

  return (
    <PageTransition>
      <div className="relative z-10 bg-background px-6 py-20 text-foreground md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.header
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={springGentle}
            className="mb-16 max-w-2xl"
          >
            <h1 className="mb-5 text-4xl font-semibold md:text-5xl">
              Let&apos;s talk about your project
            </h1>
            <p className="measure text-lg text-muted-foreground">
              Tell me roughly what you need and when you need it. I answer every
              message, usually within a day or two.
            </p>
          </motion.header>

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-5 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: reduced ? 0 : 0.06 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-7">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    {...register("name")}
                    className={fieldClass}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    className={fieldClass}
                    placeholder="you@company.com"
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                    className={`${fieldClass} min-h-[150px] resize-y`}
                    placeholder="What are you building, and what do you need help with?"
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="text-sm text-destructive"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="xl"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" aria-hidden="true" />
                      Sending
                    </>
                  ) : (
                    <>
                      <Send aria-hidden="true" />
                      Send message
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground">
                  Your details go straight to my inbox and nowhere else. See the{" "}
                  <Link
                    href="/privacy"
                    className="underline underline-offset-4 hover:text-foreground"
                  >
                    privacy note
                  </Link>
                  .
                </p>
              </form>
            </motion.div>

            {/* Direct channels - plain list, no card stack */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springGentle, delay: reduced ? 0 : 0.12 }}
              className="lg:col-span-2"
            >
              <p className="mb-5 text-sm font-medium text-foreground">Or reach me directly</p>

              <a
                href="mailto:hsetpainghtoo218@gmail.com"
                className="press-feedback group mb-8 block bezel hover:bg-primary/[0.06]"
              >
                <span className="bezel-core flex items-start gap-3.5 p-5">
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-accent">
                    <Mail className="h-4 w-4 text-accent-foreground" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-foreground">
                      Email
                    </span>
                    <span className="block truncate text-sm text-muted-foreground group-hover:text-primary">
                      hsetpainghtoo218@gmail.com
                    </span>
                  </span>
                </span>
              </a>

              <p className="mb-4 text-sm font-medium text-foreground">Elsewhere</p>
              <ul className="space-y-1">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <social.icon
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-border pt-7">
                <p className="mb-2 font-medium tracking-tight text-foreground">
                  Response time
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I check messages on weekday evenings, Myanmar time. If
                  something is urgent, say so in the first line and I will
                  prioritise it.
                </p>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
