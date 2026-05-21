import * as React from "react";
import { concatenarClases } from "@/lib/utiles";

export type PropiedadesEntrada = React.InputHTMLAttributes<HTMLInputElement>;

export const Entrada = React.forwardRef<HTMLInputElement, PropiedadesEntrada>(({ className, ...propiedades }, ref) => {
  return (
    <input
      ref={ref}
      className={concatenarClases(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...propiedades}
    />
  );
});

Entrada.displayName = "Entrada";
