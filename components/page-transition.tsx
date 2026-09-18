"use client"

import { motion, useReducedMotion } from "framer-motion"
import type React from "react"
import { pageEnter, pageExit } from "@/lib/motion"

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const reduced = useReducedMotion()

  /* Symmetric path: the page arrives from below and leaves upward along the
     same axis. Under reduced motion it cross-fades with no travel. */
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        reduced
          ? { opacity: 0, transition: pageExit }
          : { opacity: 0, y: -16, transition: pageExit }
      }
      transition={reduced ? { duration: 0.16 } : pageEnter}
    >
      {children}
    </motion.div>
  )
}
