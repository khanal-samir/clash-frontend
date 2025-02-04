"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";

type Ichildren = {
  children: ReactNode;
  className: string;
};
export default function MotionWrapper({ children, className }: Ichildren) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}
