"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends CardProps {
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  hover?: boolean
  children: React.ReactNode
}

const directionVariants = {
  up: { y: 20, opacity: 0 },
  down: { y: -20, opacity: 0 },
  left: { x: 20, opacity: 0 },
  right: { x: -20, opacity: 0 },
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  direction = "up",
  hover = true,
  ...props
}: AnimatedCardProps) {
  const initial = directionVariants[direction]

  return (
    <motion.div
      initial={initial}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={hover ? {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      className="h-full"
    >
      <Card className={cn("h-full transition-shadow duration-200", className)} {...props}>
        {children}
      </Card>
    </motion.div>
  )
}