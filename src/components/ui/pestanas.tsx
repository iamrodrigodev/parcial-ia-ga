import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { concatenarClases as cn } from "@/lib/utiles";

export const Pestanas = TabsPrimitive.Root;

export const ListaPestanas = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={cn("tabs-list", className)} {...props} />);
ListaPestanas.displayName = TabsPrimitive.List.displayName;

export const DisparadorPestanas = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn("tabs-trigger", className)} {...props} />
));
DisparadorPestanas.displayName = TabsPrimitive.Trigger.displayName;

export const ContenidoPestanas = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("tabs-content", className)} {...props} />
));
ContenidoPestanas.displayName = TabsPrimitive.Content.displayName;
