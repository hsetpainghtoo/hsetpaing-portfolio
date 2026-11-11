import type { Metadata } from "next";
import { Line, PageIntro } from "@/components/page-intro";
import { site } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site collects, what happens to a message sent through the contact form, and how to have it removed.",
};

const sections = [
  {
    title: "What this site collects",
    body: "Nothing, until you send something. There is no analytics script, no advertising pixel and no third-party tracker on these pages. Your theme preference (light or dark) is kept in your own browser and never leaves it.",
  },
  {
    title: "The contact form",
    body: "If you use the form on the contact page, the name, email address and message you type are sent to my personal inbox by email. They are not stored in a database and are not shared with anyone. I keep the email for as long as the conversation is useful.",
  },
  {
    title: "Hosting and fonts",
    body: "The site is served by a hosting provider that records standard request logs, including IP addresses, for security and diagnostics. Fonts are self-hosted and served from this domain, so no request is made to a font provider on your behalf.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
      <PageIntro
        eyebrow="Privacy / Updated 19 September 2026"
        title={
          <Line delay={120}>
            <span className="serif-accent text-muted-foreground">Privacy</span>
          </Line>
        }
        lede="What this site collects, what happens to a message you send, and how to have it removed."
      />

      <dl className="border-t border-foreground/10">
        {sections.map((section) => (
          <div
            key={section.title}
            className="grid gap-3 border-b border-foreground/10 py-9 lg:grid-cols-12 lg:gap-10"
          >
            <dt className="text-xl font-medium lg:col-span-4">{section.title}</dt>
            <dd className="measure text-muted-foreground lg:col-span-8">
              {section.body}
            </dd>
          </div>
        ))}
        <div className="grid gap-3 py-9 lg:grid-cols-12 lg:gap-10">
          <dt className="text-xl font-medium lg:col-span-4">Removing your data</dt>
          <dd className="measure text-muted-foreground lg:col-span-8">
            Email me at{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium text-foreground underline underline-offset-4"
            >
              {site.email}
            </a>{" "}
            and I will delete our correspondence.
          </dd>
        </div>
      </dl>
    </div>
  );
}
