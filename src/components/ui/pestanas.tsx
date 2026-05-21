import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { concatenarClases as cn } from "@/lib/utiles";

export const Pestanas = TabsPrimitive.Root;

export const ListaPestanas = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => <TabsPrimitive.List ref={ref} className={cn("inline-flex items-center justify-start", className)} {...props} />);
ListaPestanas.displayName = TabsPrimitive.List.displayName;

export const DisparadorPestanas = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger ref={ref} className={cn("inline-flex items-center cursor-pointer justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow data-[state=active]:hover:bg-primary/90 data-[state=inactive]:hover:bg-accent data-[state=inactive]:hover:text-accent-foreground data-[state=inactive]:text-muted-foreground", className)} {...props} />
));
DisparadorPestanas.displayName = TabsPrimitive.Trigger.displayName;

export const ContenidoPestanas = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content ref={ref} className={cn("tabs-content", className)} {...props} />
));
ContenidoPestanas.displayName = TabsPrimitive.Content.displayName;
