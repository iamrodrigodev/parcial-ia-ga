import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { concatenarClases } from "@/lib/utiles";

const variantesBoton = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variante: {
        primario: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        secundario: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        fantasma: "hover:bg-accent hover:text-accent-foreground",
        contorno: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      tamano: {
        pequeno: "h-8 rounded-md px-3 text-xs",
        mediano: "h-9 px-4 py-2",
        grande: "h-10 rounded-md px-8",
      },
    },
    defaultVariants: {
      variante: "primario",
      tamano: "mediano",
    },
  },
);

export interface PropiedadesBoton
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variantesBoton> {
  comoHijo?: boolean;
  icono?: React.ElementType;
}

export const Boton = React.forwardRef<HTMLButtonElement, PropiedadesBoton>(
  ({ className, variante, tamano, comoHijo = false, icono: Icono, children, onClick, ...propiedades }, ref) => {
    const Componente = comoHijo ? Slot : "button";

    const manejarClick = (e: any) => {
      if (propiedades.disabled) {
        e.preventDefault();
        return;
      }
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <Componente 
        className={concatenarClases(
          variantesBoton({ variante, tamano, className }),
          propiedades.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )} 
        ref={ref} 
        onClick={manejarClick}
        aria-disabled={propiedades.disabled}
        {...propiedades}
      >
        {Icono && <Icono />}
        <Slottable>{children}</Slottable>
      </Componente>
    );
  },
);
Boton.displayName = "Boton";
