import { Sparkles, Target } from "lucide-react";
import { Tarjeta } from "@/components/ui/tarjeta";

export function PanelNotasLaberinto() {
  return (
    <div className="flex flex-col gap-4">
      <Tarjeta className="border p-4 bg-muted/5">
        <h4 className="text-xs font-extrabold text-zinc-800 uppercase tracking-wide flex items-center gap-1">
          <Sparkles size={13} className="text-zinc-600" />
          Convergencia Evolutiva
        </h4>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          El algoritmo aplica <strong>Elitismo (2 progenitores top)</strong> preservándolos intactos. Esto garantiza que la aptitud máxima no decaiga entre generaciones.
        </p>
      </Tarjeta>

      <Tarjeta className="border p-4 bg-muted/5">
        <h4 className="text-xs font-extrabold text-zinc-800 uppercase tracking-wide flex items-center gap-1">
          <Target size={13} className="text-zinc-600" />
          Cómo Resolver Laberintos
        </h4>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Si la población tiene dificultades, aumenta el Torneo (K) para selección fuerte, o sube la Tasa de Mutación para mayor diversidad.
        </p>
      </Tarjeta>
    </div>
  );
}


