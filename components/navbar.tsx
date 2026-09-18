"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import GlassSurface from "./GlassSurface";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { springDefault, springSheet, springSnappy } from "@/lib/motion";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Desktop Navbar (GlassSurface) */}
      <div className="hidden md:block fixed top-5 z-nav w-[95%] md:w-[80%] inset-x-0 mx-auto">
        <GlassSurface
          displace={4}
          distortionScale={-80}
          saturation={1}
          redOffset={12}
          greenOffset={15}
          blueOffset={20}
          brightness={20}
          opacity={10}
          borderRadius={50}
          borderWidth={0.07}
          blur={10}
          mixBlendMode="luminosity"
          className="!w-full"
          style={{ backgroundColor: "var(--nav-glass)" }}
        >
          <NavContent
            theme={theme}
            navItems={navItems}
            pathname={pathname}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            setTheme={setTheme}
          />
        </GlassSurface>
      </div>

      {/* Mobile Navbar - single unified container that expands for the menu */}
      <div className="glass-material backdrop-blur-xl backdrop-saturate-150 md:hidden fixed top-4 z-nav w-[95%] inset-x-0 mx-auto rounded-3xl overflow-hidden">
        <NavContent
          theme={theme}
          navItems={navItems}
          pathname={pathname}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          setTheme={setTheme}
        />
      </div>
    </>
  );
}

interface NavItem {
  name: string;
  href: string;
}

interface NavContentProps {
  theme?: string;
  navItems: NavItem[];
  pathname: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  setTheme: (theme: string) => void;
}

function NavContent({
  theme,
  navItems,
  pathname,
  mobileMenuOpen,
  setMobileMenuOpen,
  setTheme,
}: NavContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 w-full">
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-foreground"
          >
            <>
              <Image
                src="/hset_paing_logo_white.png"
                alt="Hset Paing Htoo, home"
                width={150}
                height={50}
                priority
                className="hidden dark:block filter brightness-75 contrast-125 h-auto"
              />
              <Image
                src="/hsetpaing_logo.png"
                alt="Hset Paing Htoo, home"
                width={150}
                height={50}
                priority
                className="block dark:hidden filter brightness-75 contrast-125 h-auto"
              />
            </>
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springDefault, delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "vibrant relative text-[0.95rem] transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          <ThemeToggle theme={theme || ""} setTheme={setTheme} />

          {/* Mobile menu toggle button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="press-feedback rounded-lg p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={springSnappy}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={springSnappy}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu - animated dropdown inside the pill */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSheet}
            className="md:hidden overflow-hidden"
          >
            <div className="mt-3 flex flex-col space-y-1 border-t border-border/60 pt-4 pb-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ ...springSnappy, delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "vibrant block rounded-lg px-2.5 py-2 text-base transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href
                        ? "bg-accent text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
