import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site collects, what happens to a message sent through the contact form, and how to have it removed.",
};

export default function PrivacyPage() {
  return (
    <div className="px-6 py-20">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>

        <p className="mb-4 text-sm text-muted-foreground">Last updated 19 September 2026</p>
        <h1 className="mb-8 text-4xl font-semibold tracking-tight md:text-5xl">
          Privacy
        </h1>

        <div className="measure space-y-8 leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              What this site collects
            </h2>
            <p>
              Nothing, until you send something. There is no analytics script, no
              advertising pixel and no third-party tracker on these pages. Your
              theme preference (light or dark) is kept in your own browser and
              never leaves it.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              The contact form
            </h2>
            <p>
              If you use the form on the contact page, the name, email address
              and message you type are sent to my personal inbox by email. They
              are not stored in a database and are not shared with anyone. I keep
              the email for as long as the conversation is useful.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Hosting and fonts
            </h2>
            <p>
              The site is served by a hosting provider that records standard
              request logs, including IP addresses, for security and diagnostics.
              Fonts are self-hosted and served from this domain, so no request is
              made to a font provider on your behalf.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-semibold text-foreground">
              Removing your data
            </h2>
            <p>
              Email me at{" "}
              <a
                href="mailto:hsetpainghtoo218@gmail.com"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                hsetpainghtoo218@gmail.com
              </a>{" "}
              and I will delete our correspondence.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}
