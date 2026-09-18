# Portfolio Project - Hset Paing

Personal portfolio site for Hset Paing Htoo, a frontend developer at Transtak Pte Ltd in Singapore. It presents the work, the stack behind each project, and a contact form that goes straight to my inbox.

Built with the Next.js App Router and Tailwind CSS v4, with the theme defined entirely in CSS.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Hero, selected work carousel, toolkit, and figures derived from the project list |
| `/projects` | Every project in an asymmetric grid, with the stack behind each one |
| `/about` | Career timeline, services, and working principles |
| `/contact` | Enquiry form with inline validation, plus direct channels |
| `/privacy` | What the site collects and what happens to a submitted message |
| `*` | Custom 404 with routes back into the site |

## Features

- Light and dark themes driven by CSS custom properties, following the system preference by default with a three-state toggle
- Floating glass navigation built on a `backdrop-filter` layer, with content passing underneath
- Project detail dialog that grows out of the card that opened it and can be flicked away, with dismissal decided by projected momentum rather than drag distance
- Spring-based motion throughout, critically damped by default, with overshoot reserved for gesture-driven movement
- Contact form validated with Zod and React Hook Form, reporting errors inline and delivering by email
- Accessibility: skip link, focus trapping in the dialog, `aria-invalid` and `role="alert"` on form errors, and honoured `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast`

## Tech Stack

| Package | Version | Role |
| --- | --- | --- |
| next | 16.1.6 | App Router, image and font optimisation |
| react | 19 | UI |
| typescript | 5 | Types |
| tailwindcss | 4 | Styling, theme defined in `app/globals.css` |
| framer-motion | 12 | Springs, gestures, scroll reveals |
| swiper | 12 | Coverflow carousel on the home page |
| lucide-react | 0.454 | Icons |
| next-themes | latest | Theme switching |
| react-hook-form + zod | 7 / 3 | Form state and validation |
| sonner | 1.7 | Toasts |
| nodemailer | 8 | Sends the enquiry form |

Radix UI primitives sit under `components/ui` by way of shadcn/ui.

> Tailwind v4 reads its theme from `app/globals.css`, not from a JS config. There is deliberately no `tailwind.config.ts`; adding one back will not take effect without an `@config` directive.

## Project Structure

```
app/            Routes, layouts, per-route metadata, and the contact API handler
components/     Navbar, footer, project dialog, glass surface, border glow
components/ui/  shadcn/ui primitives
lib/            Project data (lib/projects.ts) and the motion system (lib/motion.ts)
public/         Project screenshots, logos, and tech icons
```

Projects are data. Add an entry to `lib/projects.ts` and it appears on the home carousel, the projects grid, and the counts on the home page, which are derived rather than hardcoded.

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

`npm` works too, though `pnpm-lock.yaml` is the lockfile this repo is maintained against.

### Environment

The contact form needs SMTP credentials. Create `.env.local`:

```
EMAIL_USER=your@address
EMAIL_PASS=your-app-password
```

Without these the site builds and runs; only the form submission fails.

## Deployment

Deploys to Vercel, or anywhere that runs Next.js. Set the two environment variables above in the hosting provider. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## License

Personal portfolio, not licensed for reuse. For enquiries, get in touch.
