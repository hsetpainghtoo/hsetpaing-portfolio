"use client";

import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Line, PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { VideoStage } from "@/components/video-stage";
import { site } from "@/lib/projects";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters"),
  email: z.string().email("This does not look like a valid email address"),
  message: z.string().min(5, "Please write at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/* Fields are a single rule rather than a box: the form reads as a letter
   being filled in, and the error state only has one edge to recolour. */
const fieldClass =
  "h-auto rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 pb-3 pt-1 text-lg shadow-none ring-offset-0 transition-colors placeholder:text-muted-foreground/60 focus-visible:border-foreground focus-visible:ring-0 focus-visible:ring-offset-0 aria-[invalid=true]:border-destructive md:text-xl";

export default function ContactPage() {
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

  return (
    /* One dark sheet: the flower field opens it, and the form sits on the
       same dark directly underneath, so the two read as a single place. */
    <div className="theme-dark rounded-b-[2rem] bg-background pb-20 text-foreground md:rounded-b-[3rem] md:pb-28">
      <VideoStage
        video="/contact-flowers.mp4"
        videoHd="/contact-flowers-hd.mp4"
        poster="/contact-flowers-poster.webp"
        className="rounded-b-none md:rounded-b-none"
        mediaClassName="object-[50%_60%]"
      >
        <div className="mx-auto max-w-[1600px] px-5 pb-44 sm:px-8 md:pb-60 lg:px-12 lg:pb-80">
          <PageIntro
            eyebrow="Contact"
            title={
              <>
                <Line delay={120}>Let&apos;s talk about</Line>
                <Line delay={210}>
                  your{" "}
                  <span className="serif-accent accent-ink">project</span>
                </Line>
              </>
            }
            lede="Tell me roughly what you need and when you need it. I answer every message, usually within a day or two."
          />
        </div>
      </VideoStage>

    <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
      <div className="grid gap-16 pt-4 lg:grid-cols-12 lg:gap-10 lg:pt-6">
        <Reveal className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10">
            <div>
              <Label htmlFor="name" className="eyebrow">
                01 / Name
              </Label>
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
                <p id="name-error" role="alert" className="mt-2 text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="eyebrow">
                02 / Email
              </Label>
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
                <p id="email-error" role="alert" className="mt-2 text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="message" className="eyebrow">
                03 / Message
              </Label>
              <Textarea
                id="message"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                {...register("message")}
                className={`${fieldClass} min-h-[150px] resize-y pt-2`}
                placeholder="What are you building, and what do you need help with?"
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-2 text-sm text-destructive">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="press-feedback group inline-flex h-14 items-center justify-between gap-4 rounded-full bg-foreground pl-7 pr-2 text-base font-medium text-background disabled:opacity-60"
              >
                {isSubmitting ? "Sending" : "Send message"}
                <span
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-background text-foreground"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowUpRight className="size-4 transition-transform duration-300 ease-out group-hover:rotate-45" />
                  )}
                </span>
              </button>

              <p className="max-w-xs text-xs text-muted-foreground">
                Your details go straight to my inbox and nowhere else. See the{" "}
                <Link href="/privacy" className="underline underline-offset-4 hover:text-foreground">
                  privacy note
                </Link>
                .
              </p>
            </div>
          </form>
        </Reveal>

        <Reveal as="div" delay={120} className="lg:col-span-4 lg:col-start-9">
          <aside className="space-y-10">
            <div>
              <p className="eyebrow mb-3">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="link-draw break-all text-xl font-medium tracking-[-0.025em]"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="eyebrow mb-3">Elsewhere</p>
              <ul className="border-t border-foreground/10">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group flex items-center justify-between border-b border-foreground/10 py-3.5 transition-colors hover:bg-foreground/[0.03] sm:px-2"
                    >
                      {social.label}
                      <ArrowUpRight
                        className="size-4 text-muted-foreground transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-3">Response time</p>
              <p className="text-sm text-muted-foreground">
                I check messages on weekday evenings, Thailand time. If
                something is urgent, say so in the first line and I will
                prioritise it.
              </p>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
    </div>
  );
}
