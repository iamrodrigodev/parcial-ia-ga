import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { concatenarClases } from "@/lib/utiles";

export interface PropiedadesAnimacionEntrada extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  retraso?: number;
}

export function AnimacionEntrada({ 
  children, 
  className, 
  retraso = 0, 
  ...propiedades 
}: PropiedadesAnimacionEntrada) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: retraso }}
      className={concatenarClases(className)}
      {...propiedades}
    >
      {children}
    </motion.div>
  );
}
