import type { HTMLAttributes } from "react";
import { concatenarClases as cn } from "@/lib/utiles";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ui-badge", className)} {...props} />;
}
