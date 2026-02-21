"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import GlassSurface from "./GlassSurface";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
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
      className="sticky top-5 z-50 !w-[95%] md:!w-[80%] mx-auto"
      style={{ backgroundColor: "rgba(247, 250, 255, 0.6)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 w-full">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900 dark:text-white"
            >
              <Image
                src={`${theme == "dark" ? "/hset_paing_logo_white.png" : "/hsetpaing_logo.png"}`}
                alt="HPH"
                width={200}
                height={50}
                className="filter brightness-75 contrast-125 w-[130px] sm:w-[160px] md:w-[200px] h-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-xl font-medium transition-colors hover:text-navy-600 dark:hover:text-navy-400 relative",
                    pathname === item.href
                      ? "text-navy-600 dark:text-navy-400"
                      : "text-gray-700 dark:text-gray-300",
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-navy-600 dark:bg-navy-400"
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
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300 p-1"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu – animated dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-3 pt-4 pb-2 border-t border-gray-200/50 dark:border-gray-700/50 mt-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "block text-base font-medium transition-colors hover:text-navy-600 dark:hover:text-navy-400 px-2 py-1.5 rounded-lg",
                        pathname === item.href
                          ? "text-navy-600 dark:text-navy-400 bg-navy-50/50 dark:bg-navy-900/20"
                          : "text-gray-700 dark:text-gray-300",
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
    </GlassSurface>
  );
}
