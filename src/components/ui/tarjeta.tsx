import type { HTMLAttributes } from "react";
import { concatenarClases } from "@/lib/utiles";

export function Tarjeta({ className, ...propiedades }: HTMLAttributes<HTMLDivElement>) {
  return <div className={concatenarClases("rounded-xl border bg-card text-card-foreground shadow", className)} {...propiedades} />;
}

export function EncabezadoTarjeta({ className, ...propiedades }: HTMLAttributes<HTMLDivElement>) {
  return <div className={concatenarClases("flex flex-col space-y-1.5 p-6", className)} {...propiedades} />;
}

export function TituloTarjeta({ className, ...propiedades }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={concatenarClases("font-semibold leading-none tracking-tight", className)} {...propiedades} />;
}

export function DescripcionTarjeta({ className, ...propiedades }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={concatenarClases("text-sm text-muted-foreground", className)} {...propiedades} />;
}

export function ContenidoTarjeta({ className, ...propiedades }: HTMLAttributes<HTMLDivElement>) {
  return <div className={concatenarClases("p-6 pt-0", className)} {...propiedades} />;
}
