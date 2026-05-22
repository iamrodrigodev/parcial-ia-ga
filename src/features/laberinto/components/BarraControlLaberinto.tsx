import { ChevronRight, FastForward } from "lucide-react";
import { Boton } from "@/components/ui/boton";
import { Insignia } from "@/components/ui/insignia";
import { IndividuoLaberinto } from "@/features/laberinto/lib/algoritmo";

interface Props {
  generacion: number;
  mejorIndividuoGeneracion: IndividuoLaberinto | null;
  reproduciendo: boolean;
  avanzarUnaGeneracion: () => void;
  avanzar50Generaciones: () => void;
}

export function BarraControlLaberinto({
  generacion,
  mejorIndividuoGeneracion,
  reproduciendo,
  avanzarUnaGeneracion,
  avanzar50Generaciones,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-zinc-50 dark:bg-zinc-900 border p-3.5 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div>
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">GeneraciÃ³n</span>
          <span className="text-2xl font-black tabular-nums text-zinc-950 dark:text-white">{generacion}</span>
        </div>
        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div>
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Mejor Fitness</span>
          <span className="text-2xl font-black tabular-nums text-zinc-950 dark:text-white">
            {mejorIndividuoGeneracion ? mejorIndividuoGeneracion.fitness.toFixed(1) : "-"}
          </span>
        </div>
        <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div>
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider block">Resuelto</span>
          <span className="flex items-center mt-1">
            {mejorIndividuoGeneracion?.alcanzoMeta ? (
              <Insignia className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold border-transparent px-2.5 py-0.5 text-xs">
                Â¡Ã‰xito!
              </Insignia>
            ) : (
              <Insignia className="bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-400 font-bold border-transparent px-2.5 py-0.5 text-xs animate-pulse">
                Resolviendo...
              </Insignia>
            )}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Boton
          variante="secundario"
          icono={ChevronRight}
          onClick={avanzarUnaGeneracion}
          disabled={reproduciendo}
          className="border h-9 text-xs"
          title="Avanzar exactamente 1 generaciÃ³n inmediatamente"
        >
          <span>+1 Gen</span>
        </Boton>
        <Boton
          variante="secundario"
          icono={FastForward}
          onClick={avanzar50Generaciones}
          disabled={reproduciendo}
          className="border h-9 text-xs"
          title="Avanzar 50 generaciones inmediatamente en segundo plano"
        >
          <span>+50 Gens</span>
        </Boton>
      </div>
    </div>
  );
}

