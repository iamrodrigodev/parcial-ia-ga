import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { concatenarClases as cn } from "@/lib/utiles";

export const Dialogo = DialogPrimitive.Root;
export const DisparadorDialogo = DialogPrimitive.Trigger;
export const PortalDialogo = DialogPrimitive.Portal;
export const CerrarDialogo = DialogPrimitive.Close;

export const CapaDialogo = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={cn("dialog-overlay", className)} {...props} />
));
CapaDialogo.displayName = DialogPrimitive.Overlay.displayName;

export const ContenidoDialogo = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <PortalDialogo>
    <CapaDialogo />
    <DialogPrimitive.Content ref={ref} className={cn("dialog-content", className)} {...props}>
      {children}
      <DialogPrimitive.Close className="dialog-close" aria-label="Cerrar diálogo">
        <X size={16} />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </PortalDialogo>
));
ContenidoDialogo.displayName = DialogPrimitive.Content.displayName;

export function EncabezadoDialogo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("dialog-header", className)} {...props} />;
}

export function TituloDialogo({ className, ...props }: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>) {
  return <DialogPrimitive.Title className={cn("dialog-title", className)} {...props} />;
}

export function DescripcionDialogo({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>) {
  return <DialogPrimitive.Description className={cn("dialog-description", className)} {...props} />;
}
