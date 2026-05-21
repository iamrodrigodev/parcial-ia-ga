import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { concatenarClases as cn } from "@/lib/utiles";

export const MenuNavegacion = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Root ref={ref} className={cn("nav-menu", className)} {...props} />
));
MenuNavegacion.displayName = NavigationMenuPrimitive.Root.displayName;

export const ListaMenuNavegacion = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List ref={ref} className={cn("nav-menu-list", className)} {...props} />
));
ListaMenuNavegacion.displayName = NavigationMenuPrimitive.List.displayName;

export const ElementoMenuNavegacion = NavigationMenuPrimitive.Item;

export const EnlaceMenuNavegacion = React.forwardRef<
  React.ComponentRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link ref={ref} className={cn("nav-menu-link", className)} {...props} />
));
EnlaceMenuNavegacion.displayName = NavigationMenuPrimitive.Link.displayName;
